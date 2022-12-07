import { Link, useLoaderData, useParams } from "react-router-dom";
import { episodeDetailsQuery, LoaderData } from "./episodeDetailsQuery";
import { useQuery } from "@tanstack/react-query";

export default function EpisodeDetailsPage() {
  const data = useLoaderData() as LoaderData;
  const params = useParams();

  const query = useQuery({
    ...episodeDetailsQuery(Number(params.episodeId)),
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
      <h1 className="text-h1">{query.data.data.name}</h1>
      <p>{query.data.data.episode}</p>
      <p className="font-medium text-gray-400 text-body4 mb-4">
        {query.data.data.air_date}
      </p>
    </div>
  );
}
