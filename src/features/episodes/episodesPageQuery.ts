import { API } from "@/api";
import { createDeferredLoader, createLoader } from "@/router/createLoader";
import { DeferredLoaderReturnType } from "@/utils/types/typeUtils";

export const episodesPageQuery = () => ({
  queryKey: ["episodes"],
  queryFn: API.episodes.getAllEpisodes,
});

export type LoaderData = DeferredLoaderReturnType<typeof episodesPageQuery>;

export const episodesPageLoader = createDeferredLoader(() =>
  episodesPageQuery()
);
