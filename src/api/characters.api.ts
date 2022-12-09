import { removeUndefinedFromObject } from "@/utils/helpers";
import * as rickMortyApi from "rickmortyapi";
import { ApiResponse, Info, Character } from "rickmortyapi/dist/interfaces";

const delay = (ms: number = 2000) => new Promise((res) => setTimeout(res, ms));

type Filters = {
  status: "alive" | "dead" | "unknown";
  gender: "male" | "female" | "genderless" | "unknown";
};

export async function getCharacters(_filters?: Partial<Filters>) {
  // await delay();
  let url = "https://rickandmortyapi.com/api/character";
  const filters = removeUndefinedFromObject(_filters);
  const hasFilters = filters && Object.keys(filters).length > 0;

  if (hasFilters) {
    Object.entries(filters).forEach(([key, value], idx) => {
      if (idx === 0) url += "?";
      else url += "&";

      url += `${key}=${value}`;
    });
  }
  return fetch(url).then((res) => res.json()) as Promise<Info<Character[]>>;
}

export async function getCharacterById(id: number) {
  // await delay();
  return fetch(`https://rickandmortyapi.com/api/character/${id}`).then((res) =>
    res.json()
  ) as Promise<Character>;
}
