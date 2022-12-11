import * as charactersApi from "./characters.api";
import * as episodesApi from "./episodes.api";

const { apiRoutes: charactersRoutes, ...characters } = charactersApi;
const { apiRoutes: episodesRoutes, ...episodes } = episodesApi;

export const API_ROUTES = {
  ...charactersRoutes,
  ...episodesRoutes,
};

export const API = {
  characters,
  episodes,
};
