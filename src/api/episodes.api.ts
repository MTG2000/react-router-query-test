import * as rickMortyApi from "rickmortyapi";
import { Episode, Info } from "rickmortyapi/dist/interfaces";

const delay = (ms: number = 2000) => new Promise((res) => setTimeout(res, ms));

export async function getAllEpisodes() {
  await delay();
  return fetch("https://rickandmortyapi.com/api/episode").then((res) =>
    res.json()
  ) as Promise<Info<Episode[]>>;
}

export async function getEpisodeById(id: number) {
  await delay();
  return fetch(`https://rickandmortyapi.com/api/episode/${id}`).then((res) =>
    res.json()
  ) as Promise<Episode>;
}
