import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache
} from "@apollo/client";
import { nextApollo } from "lib/apolloLib";
import { getNextCacheUrl, getNextUrl } from "lib/url";
import getConfig from "next/config";
import qs from "querystring";
// import typePolicies from "./typePolicies";

const { serverRuntimeConfig } = getConfig();
const { isBuildTime } = serverRuntimeConfig;

let apiUrl = process.env.NEXT_PUBLIC_API_URL;
const nextCacheUrl = getNextCacheUrl();
const headers: Record<string, string> = {};
const proxyApiUrl = process.env.NEXT_PUBLIC_API_URL;

if (isBuildTime) {
  console.log("api URL");
  apiUrl = process.env.API_CI_BUILD_URL as string;
  /*if (process.env.CRAFT_GRAPHQL_AUTH_TOKEN) {
    headers.Authorization = `Bearer ${process.env.CRAFT_GRAPHQL_AUTH_TOKEN}`;
  }*/
}

export const { initializeApollo, useApollo } = nextApollo<{ token?: string }>(
  (options) => {
    const { token } = options || {};
    const defaultLink = new HttpLink({
      uri: apiUrl + tokenQueryStr(token),
      headers
    });
    const cacheableLink = new HttpLink({
      useGETForQueries: true,
      uri: proxyApiUrl,
      headers,
      fetch: (url, options) => {
        if (typeof url === "string") {
          const compressedUrl = url.replace(/(%20)+/g, "%20");
          if (compressedUrl.length >= 4096) {
            console.error(
              `the url length is ${compressedUrl.length} which is over 4096 characters and may not work for nginx`
            );
          }
          return fetch(compressedUrl, options);
        }
        return fetch(url, options);
      }
    });

    return new ApolloClient({
      ssrMode: typeof window === "undefined",
      link: ApolloLink.split(
        (op) => {
          return op.getContext().clientName === "cacheable" && !isBuildTime;
        },
        cacheableLink,
        defaultLink
      ),
      cache: new InMemoryCache()
    });
  }
);

function tokenQueryStr(token: string | undefined): string {
  if (token) {
    return "?" + qs.stringify({ token });
  }
  return "";
}
