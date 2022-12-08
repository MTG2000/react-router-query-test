import * as rickMortyApi from "rickmortyapi";
import { ApiResponse, Info, Character } from "rickmortyapi/dist/interfaces";

const delay = (ms: number = 2000) => new Promise((res) => setTimeout(res, ms));

export async function getAllCharacters() {
  await delay();
  return fetch("https://rickandmortyapi.com/api/character").then((res) =>
    res.json()
  ) as Promise<Info<Character[]>>;
}

export async function getCharacterById(id: number) {
  await delay();
  return fetch(`https://rickandmortyapi.com/api/character/${id}`).then((res) =>
    res.json()
  ) as Promise<Character>;
}
