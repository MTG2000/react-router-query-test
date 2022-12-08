import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  useLocation,
  matchRoutes,
} from "react-router-dom";
import React from "react";
import AppLayout from "../Common/AppLayout/AppLayout";
import { queryClient } from "@/utils/apiClient";
import { characterDetailsLoader } from "@/features/characters/characterDetailsQuery";
import { charactersPageLoader } from "@/features/characters/charactersPageQuery";
import { episodeDetailsLoader } from "@/features/episodes/episodeDetailsQuery";
import { episodesPageLoader } from "@/features/episodes/episodesPageQuery";
import ErrorOverlay from "@/Common/ErrorOverlay/ErrorOverlay";

const HomePage = React.lazy(() => import("../features/home/HomePage"));

const CharactersPage = React.lazy(
  () => import("../features/characters/CharactersPage")
);
const CharacterDetailsPage = React.lazy(
  () => import("../features/characters/CharacterDetailsPage")
);

const EpisodesPage = React.lazy(
  () => import("../features/episodes/EpisodesPage")
);
const EpisodeDetailsPage = React.lazy(
  () => import("../features/episodes/EpisodeDetailsPage")
);

const routes = createRoutesFromElements(
  <Route
    element={<AppLayout />}
    errorElement={<ErrorOverlay>An Error happened somewhere!</ErrorOverlay>}
  >
    <Route index element={<HomePage />} />

    <Route
      path="/characters"
      errorElement={
        <ErrorOverlay>An Error happened fetching characters!</ErrorOverlay>
      }
    >
      <Route
        path=":characterId"
        element={<CharacterDetailsPage />}
        loader={characterDetailsLoader(queryClient)}
      />
      <Route
        index
        element={<CharactersPage />}
        loader={charactersPageLoader(queryClient)}
      />
    </Route>

    <Route
      path="/episodes"
      element={<EpisodesPage />}
      loader={episodesPageLoader(queryClient)}
    >
      <Route
        path=":episodeId"
        element={<EpisodeDetailsPage />}
        loader={episodeDetailsLoader(queryClient)}
      />
    </Route>
  </Route>
);

const router = createBrowserRouter(routes);

export const useCurrentPath = () => {
  const location = useLocation();
  const matches = matchRoutes(routes, location);
  return matches;
};

export const RootRouter = () => {
  return <RouterProvider router={router} />;
};
