import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  useLocation,
  matchRoutes,
  Navigate,
} from "react-router-dom";
import React from "react";
import AppLayout from "../Common/AppLayout/AppLayout";
import { queryClient } from "@/utils/apiClient";
import { characterDetailsLoader } from "@/features/characters/CharacterDetailsPage/characterDetailsQuery";
import { charactersPageLoader } from "@/features/characters/CharactersPage/charactersPageQuery";
import { episodeDetailsLoader } from "@/features/episodes/episodeDetailsQuery";
import { episodesPageLoader } from "@/features/episodes/episodesPageQuery";
import ErrorOverlay from "@/Common/ErrorOverlay/ErrorOverlay";

const HomePage = React.lazy(() => import("../features/home/HomePage"));

const CharactersPage = React.lazy(
  () => import("../features/characters/CharactersPage/CharactersPage")
);
const CharacterDetailsPage = React.lazy(
  () =>
    import("../features/characters/CharacterDetailsPage/CharacterDetailsPage")
);

const EpisodesPage = React.lazy(
  () => import("../features/episodes/EpisodesPage")
);
const EpisodeDetailsPage = React.lazy(
  () => import("../features/episodes/EpisodeDetailsPage")
);

export const routes = createRoutesFromElements(
  <Route
    element={<AppLayout />}
    errorElement={
      <ErrorOverlay
        defaultTitle="Ooops..."
        defaultBody="An unexpected error happened, please try refreshing the page."
      />
    }
  >
    <Route index element={<Navigate to={"/characters"} />} />

    <Route
      path="/characters"
      errorElement={
        <ErrorOverlay defaultBody="An error happened while fetching characters" />
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
      errorElement={<ErrorOverlay />}
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
