import { QueryClient, QueryFunction } from "@tanstack/react-query";

export type LoaderReturnType<T extends (p: any) => { queryFn: QueryFunction }> =
  Awaited<ReturnType<ReturnType<T>["queryFn"]>>;

export type DeferredLoaderReturnType<
  T extends (p: any) => { queryFn: QueryFunction }
> = { data: Awaited<ReturnType<ReturnType<T>["queryFn"]>> };
