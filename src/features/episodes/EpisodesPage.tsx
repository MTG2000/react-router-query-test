import path from "path";
import { Suspense } from "react";
import {
  Await,
  Link,
  matchPath,
  matchRoutes,
  Outlet,
  useLoaderData,
  useLocation,
} from "react-router-dom";
import EpisodeDetailsModal from "./EpisodeDetailsModal";
import EpisodeDetailsPage from "./EpisodeDetailsPage";
import { LoaderData } from "./episodesPageQuery";

export default function EpisodesPageWrapper() {
  const { pathname, state } = useLocation();

  const onDetailsPage = isOnDetailsPage(pathname);
  const openAsModal = state?.openModal;

  const whatToShow = onDetailsPage
    ? openAsModal
      ? "list + modal"
      : "details_page"
    : "list_page";

  if (whatToShow === "list + modal")
    return (
      <>
        <EpisodesListPage />
        <EpisodeDetailsModal />
      </>
    );

  if (whatToShow === "details_page") return <EpisodeDetailsPage />;

  if (whatToShow === "list_page") return <EpisodesListPage />;

  throw Error("URL invalid. Please go back to the episodes page & try again.");
}

function EpisodesListPage() {
  const { data } = useLoaderData() as LoaderData;

  return (
    <div>
      <h1 className="text-h1 mb-32">Episodes</h1>
      <Suspense
        fallback={
          <p className="text-body2 text-white text-center py-36">
            Loading episodes (deferred)...
          </p>
        }
      >
        <Await resolve={data}>
          {(resolved: typeof data) => (
            <ul className="grid gap-16 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
              {resolved.results?.map((episode) => (
                <li
                  key={episode.id}
                  className="rounded-12 overflow-hidden bg-gray-900"
                >
                  <Link
                    to={episode.id.toString()}
                    state={{
                      loadingText: "Getting Episode Details...",
                      openModal: true,
                    }}
                    className="flex flex-col h-full"
                  >
                    <div className="p-12 text-white flex flex-col gap-4 grow">
                      <p className="font-medium text-body1">{episode.name}</p>
                      <p>{episode.episode}</p>
                      <p className="font-medium text-gray-400 text-body4 mb-4">
                        {episode.air_date}
                      </p>
                      <button className="bg-gray-100 text-gray-800 px-12 py-4 rounded-8 w-full  mt-auto">
                        Read more
                      </button>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Await>
      </Suspense>
    </div>
  );
}

function isOnDetailsPage(pathname: string) {
  return matchPath("/episodes/:episodeId", pathname);
}
