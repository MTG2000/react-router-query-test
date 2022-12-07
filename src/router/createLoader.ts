import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { defer, LoaderFunctionArgs } from "react-router-dom";

export function createLoader(
  createQueryFn: (args: LoaderFunctionArgs) => {
    queryKey: unknown[];
    queryFn: QueryFunction;
  }
) {
  return (queryClient: QueryClient) => async (args: LoaderFunctionArgs) => {
    const query = createQueryFn(args);
    // ⬇️ return data or fetch it
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
}

export function createDeferredLoader(
  createQueryFn: (args: LoaderFunctionArgs) => {
    queryKey: unknown[];
    queryFn: QueryFunction;
  }
) {
  return (queryClient: QueryClient) => async (args: LoaderFunctionArgs) => {
    const query = createQueryFn(args);
    // ⬇️ return data or fetch it
    return defer({
      data:
        queryClient.getQueryData(query.queryKey) ??
        queryClient.fetchQuery(query),
    });
  };
}
