import {
  QueryClient,
  QueryFunction,
  QueryFunctionContext,
} from "@tanstack/react-query";

type FF =
  | (() => { queryFn: QueryFunctionContext })
  | ((option?: any) => { queryFn: Function })
  | ((...options: any[]) => { queryFn: Function });

type queryCreatorFunction = (...params: any) => {
  queryKey: any;
  queryFn: QueryFunction;
};

export type LoaderReturnType<T extends queryCreatorFunction> = Awaited<
  ReturnType<ReturnType<T>["queryFn"]>
>;

export type DeferredLoaderReturnType<
  T extends (p: any) => { queryFn: QueryFunction }
> = { data: Awaited<ReturnType<ReturnType<T>["queryFn"]>> };
