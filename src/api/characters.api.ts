import * as rickMortyApi from "rickmortyapi";

const delay = (ms: number = 2000) => new Promise((res) => setTimeout(res, ms));

export async function getAllCharacters() {
  await delay();
  return rickMortyApi.getCharacters();
}

export async function getCharacterById(id: number) {
  await delay();
  return rickMortyApi.getCharacter(id);
}
