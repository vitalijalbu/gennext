import {
  DocumentNode,
  OperationVariables,
  QueryHookOptions,
  QueryResult,
  TypedDocumentNode,
  useQuery
} from "@apollo/client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const delay = 100;

const useOffsetLimitPagination = <T extends any, V extends OperationVariables>(
  query: DocumentNode | TypedDocumentNode<T, V>,
  getQueryProps: (data?: T) => QueryHookOptions<T, V>,
  afterFetch?: (data?: T) => void
): [
  inViewRef: (node?: Element | null | undefined) => void,
  queryResult: QueryResult<T, V>,
  fetching: boolean
] => {
  const propsPreData = getQueryProps();
  const inViewHookReturn = useInView();
  const { ref, inView } = inViewHookReturn;
  const useQueryHookReturn = useQuery<T, V>(query, propsPreData);
  const { fetchMore, data } = useQueryHookReturn;
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (inView && !fetching) {
      const { skip, ...props } = getQueryProps(data);

      if (!skip) {
        setFetching(true);
        fetchMore(props).then((res) => {
          setTimeout(() => {
            setFetching(false);
            if (afterFetch) {
              afterFetch(res.data);
            }
          }, delay);
        });
      }
    }
    // we only want to call the getQueryProps function whenever inView changes
    // we only need to check for an update when fetching changes after the delay of 100ms
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, fetching]);

  return [ref, useQueryHookReturn, fetching];
};

export default useOffsetLimitPagination;
