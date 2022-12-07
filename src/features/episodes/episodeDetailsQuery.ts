import { API } from "@/api";
import { createLoader } from "@/router/createLoader";
import { LoaderReturnType } from "@/utils/types/typeUtils";

export const episodeDetailsQuery = (id: number) => ({
  queryKey: ["episode", id],
  queryFn: () => API.episodes.getEpisodeById(id),
});

export type LoaderData = LoaderReturnType<typeof episodeDetailsQuery>;

export const episodeDetailsLoader = createLoader(({ params }) =>
  episodeDetailsQuery(Number(params.episodeId))
);
