import React from "react";
import { Link } from "react-router-dom";
import { Character } from "rickmortyapi/dist/interfaces";

interface Props {
  characters?: Character[];
  isLoading?: boolean;
}

export default function CharactersList({ characters }: Props) {
  return (
    <ul className="grid gap-16 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
      {characters?.map((character) => (
        <li
          key={character.id}
          className="rounded-12 overflow-hidden bg-gray-900"
        >
          <Link
            to={character.id.toString()}
            className="flex flex-col h-full"
            state={{ loadingText: "Getting character details..." }}
          >
            <img src={character.image} alt="" className="w-full" />
            <div className="p-16 text-white flex flex-col gap-4 grow">
              <p className="font-bold text-body2">{character.name}</p>
              <p className="font-medium text-gray-200 text-body3">
                {character.species}
              </p>
              <p className="text-body4 text-gray-300">{character.status}</p>
              <p className="text-body4 text-gray-300">{character.gender}</p>

              <div className="mt-auto"></div>
              <button className="bg-gray-100 text-gray-800 px-12 py-4 rounded-8 w-full">
                Read more
              </button>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
