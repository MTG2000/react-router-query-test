import { removeUndefinedFromObject } from "@/utils/helpers";
import axios from "axios";
import { Info, Character } from "rickmortyapi/dist/interfaces";

const delay = (ms: number = 2000) => new Promise((res) => setTimeout(res, ms));

type Filters = {
  status: "alive" | "dead" | "unknown";
  gender: "male" | "female" | "genderless" | "unknown";
};

export const apiRoutes = {
  getCharacters: "https://rickandmortyapi.com/api/character",
  getCharacterById: (id: number) =>
    `https://rickandmortyapi.com/api/character/${id}`,
};

export async function getCharacters(_filters?: Partial<Filters>) {
  let url = apiRoutes.getCharacters;
  const filters = removeUndefinedFromObject(_filters);
  const hasFilters = filters && Object.keys(filters).length > 0;

  if (hasFilters) {
    Object.entries(filters).forEach(([key, value], idx) => {
      if (idx === 0) url += "?";
      else url += "&";

      url += `${key}=${value}`;
    });
  }

  const res = await axios.get(url);

  if (res.data.error) throw new Error(res.data.error);

  return res.data as Info<Character[]>;
}

export async function getCharacterById(id: number) {
  const res = await axios.get(apiRoutes.getCharacterById(id));

  if (res.data.error) throw new Error(res.data.error);

  return res.data as Character;
}
