import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  useLocation,
  matchRoutes,
  Navigate,
  createMemoryRouter,
} from "react-router-dom";
import React from "react";
import AppLayout from "../Common/AppLayout/AppLayout";
import { getQueryClient, queryClient } from "@/utils/apiClient";
import { characterDetailsLoader } from "@/features/characters/CharacterDetailsPage/characterDetailsQuery";
import { charactersPageLoader } from "@/features/characters/CharactersPage/charactersPageQuery";
import { episodeDetailsLoader } from "@/features/episodes/episodeDetailsQuery";
import { episodesPageLoader } from "@/features/episodes/episodesPageQuery";
import ErrorOverlay from "@/Common/ErrorOverlay/ErrorOverlay";
import { CONSTS } from "@/utils/consts";

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

const createRoutes = () =>
  createRoutesFromElements(
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
          loader={characterDetailsLoader(getQueryClient())}
        />
        <Route
          index
          element={<CharactersPage />}
          loader={charactersPageLoader(getQueryClient())}
        />
      </Route>

      <Route
        path="/episodes"
        element={<EpisodesPage />}
        loader={episodesPageLoader(getQueryClient())}
        errorElement={<ErrorOverlay />}
      >
        <Route
          path=":episodeId"
          element={<EpisodeDetailsPage />}
          loader={episodeDetailsLoader(getQueryClient())}
        />
      </Route>
    </Route>
  );

export const routes = createRoutes();

export const createRouter = (
  options?: Parameters<typeof createMemoryRouter>[1]
) => {
  const routes = createRoutes();

  return CONSTS.isTestEnv
    ? createMemoryRouter(routes, options)
    : createBrowserRouter(routes, options);
};

// export const useCurrentPath = () => {
//   const location = useLocation();
//   const matches = matchRoutes(routes, location);
//   return matches;
// };

export const RootRouter = () => {
  return <RouterProvider router={createRouter()} />;
};
