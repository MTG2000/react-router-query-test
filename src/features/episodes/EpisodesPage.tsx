import { Await, Link, useLoaderData } from "react-router-dom";
import { LoaderData } from "./episodesPageQuery";

export default function EpisodesPage() {
  const { data } = useLoaderData() as LoaderData;

  return (
    <div>
      <h1 className="text-h1 mb-32">Episodes</h1>
      {/* {query.isLoading && <h2>Loading episodes...</h2>} */}
      <Await resolve={data}>
        {(resolved: typeof data) => (
          <ul className="grid gap-16 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
            {resolved.data.results?.map((episode) => (
              <li
                key={episode.id}
                className="rounded-12 overflow-hidden bg-gray-900"
              >
                <Link
                  to={episode.id.toString()}
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
    </div>
  );
}
