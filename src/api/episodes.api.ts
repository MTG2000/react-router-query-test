import * as rickMortyApi from "rickmortyapi";

const delay = (ms: number = 2000) => new Promise((res) => setTimeout(res, ms));

export async function getAllEpisodes() {
  await delay();
  return rickMortyApi.getEpisodes();
}

export async function getEpisodeById(id: number) {
  await delay();
  return rickMortyApi.getEpisode(id);
}
