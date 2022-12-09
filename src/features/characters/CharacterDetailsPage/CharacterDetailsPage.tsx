import { Link, useLoaderData, useParams } from "react-router-dom";
import { characterDetailsQuery, LoaderData } from "./characterDetailsQuery";
import { useQuery } from "@tanstack/react-query";

export default function CharacterDetailsPage() {
  const data = useLoaderData() as LoaderData;
  const params = useParams();

  const query = useQuery({
    ...characterDetailsQuery(Number(params.characterId)),
    initialData: data,
  });

  return (
    <div>
      <Link
        to=".."
        relative="path"
        className="text-body3 text-white mb-42 block"
      >
        ⬅️ <span className="underline">Back</span>
      </Link>
      <h1 className="text-h1 font-bolder mb-24">{query.data.name}</h1>
      <img src={query.data.image} alt="" className="max-w-[240px]" />
      <div className="flex flex-col gap-12 mt-12">
        <p className="font-medium text-gray-200 text-body3">
          {query.data.species}
        </p>
        <p className="text-body4 text-gray-300">{query.data.status}</p>
        <p className="text-body4 text-gray-300">{query.data.gender}</p>
      </div>
    </div>
  );
}
