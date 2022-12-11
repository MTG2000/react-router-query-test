import * as rickMortyApi from "rickmortyapi";
import { Episode, Info } from "rickmortyapi/dist/interfaces";

const delay = (ms: number = 2000) => new Promise((res) => setTimeout(res, ms));

export async function getAllEpisodes() {
  return fetch("https://rickandmortyapi.com/api/episode").then((res) =>
    res.json()
  ) as Promise<Info<Episode[]>>;
}

export async function getEpisodeById(id: number) {
  const res = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
  const json = await res.json();

  if (!res.ok)
    throw new Response(json.error, {
      status: res.status,
      statusText: res.statusText,
    });

  return json as Episode;
}

export const apiRoutes = {
  getAllEpisodes: "https://rickandmortyapi.com/api/episode",
  getEpisodeById: (id: number) =>
    `https://rickandmortyapi.com/api/episode/${id}`,
};
