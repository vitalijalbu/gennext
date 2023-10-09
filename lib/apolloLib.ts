import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";
import { GetStaticPropsResult, GetServerSidePropsResult } from "next";
import { useMemo } from "react";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

type ClientType = ApolloClient<NormalizedCacheObject>;

interface UnknownProps {
  [key: string]: unknown;
  [APOLLO_STATE_PROP_NAME]?: NormalizedCacheObject;
}

let apolloClient: ClientType;

export function addApolloState<
  R extends GetStaticPropsResult<T> | GetServerSidePropsResult<T>,
  T extends UnknownProps
>(apolloClient: ClientType, dataFetchResult: R): R {
  const res = dataFetchResult as {
    props?: T;
    [key: string]: unknown;
  };
  if (res && res.props) {
    res.props[APOLLO_STATE_PROP_NAME] = apolloClient.cache.extract();
  }

  return dataFetchResult;
}

export const nextApollo = <CreateOptions>(
  createApolloClient: CreateApolloClient<CreateOptions>
): {
  initializeApollo: InitializeApollo<CreateOptions>;
  useApollo: UseApollo;
} => {
  const initializeApollo: InitializeApollo<CreateOptions> = (
    initialState = null,
    options
  ) => {
    const _apolloClient = apolloClient ?? createApolloClient(options);

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    if (initialState) {
      // Get existing cache, loaded during client side data fetching
      const existingCache = _apolloClient.extract();

      // Merge the existing cache into data passed from getStaticProps/getServerSideProps
      const data = merge(initialState, existingCache, {
        // combine arrays using object equality (like in sets)
        arrayMerge: (destinationArray, sourceArray) => [
          ...sourceArray,
          ...destinationArray.filter((d) =>
            sourceArray.every((s) => !isEqual(d, s))
          )
        ]
      });

      // Restore the cache with the merged data
      _apolloClient.cache.restore(data);
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === "undefined") return _apolloClient;
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
  };
  const useApollo: UseApollo = (pageProps) => {
    const state = pageProps[APOLLO_STATE_PROP_NAME];
    const store = useMemo(() => initializeApollo(state), [state]);
    return store;
  };

  return {
    initializeApollo,
    useApollo
  };
};

export type UseApollo = (pageProps: UnknownProps) => ClientType;
export type InitializeApollo<CreateOptions> = (
  initialState?: NormalizedCacheObject | undefined | null,
  options?: CreateOptions
) => ClientType;
export type CreateApolloClient<CreateOptions> = (
  options?: CreateOptions
) => ClientType;
