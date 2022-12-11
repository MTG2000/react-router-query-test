import { removeUndefinedFromObject } from "@/utils/helpers";
import { Info, Character } from "rickmortyapi/dist/interfaces";

const delay = (ms: number = 2000) => new Promise((res) => setTimeout(res, ms));

type Filters = {
  status: "alive" | "dead" | "unknown";
  gender: "male" | "female" | "genderless" | "unknown";
};

export async function getCharacters(_filters?: Partial<Filters>) {
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

  const res = await fetch(url);
  const json = await res.json();

  if (json.error) throw new Error(json.error);

  return json as Info<Character[]>;
}

export async function getCharacterById(id: number) {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  const json = await res.json();

  if (json.error) throw new Error(json.error);

  return json as Character;
}
