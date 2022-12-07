import { Link, useLoaderData } from "react-router-dom";
import { charactersPageQuery, LoaderData } from "./charactersPageQuery";
import { useQuery } from "@tanstack/react-query";

export default function CharactersPage() {
  const data = useLoaderData() as LoaderData;

  const query = useQuery({
    ...charactersPageQuery(),
    initialData: data,
  });

  return (
    <div>
      <h1 className="text-h1 mb-32">Characters</h1>
      {query.isLoading && <h2>Loading Characters...</h2>}
      <ul className="grid gap-16 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
        {query.data.data.results?.map((character) => (
          <li
            key={character.id}
            className="rounded-12 overflow-hidden bg-gray-900"
          >
            <Link to={character.id.toString()} className="flex flex-col h-full">
              <img src={character.image} alt="" className="w-full" />
              <div className="p-12 text-white flex flex-col gap-4 grow">
                <p className="font-medium text-body2">{character.name}</p>
                <p className="font-medium text-gray-200 text-body3 mb-4">
                  {character.species}
                </p>

                <button className="bg-gray-100 text-gray-800 px-12 py-4 rounded-8 w-full  mt-auto">
                  Read more
                </button>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
