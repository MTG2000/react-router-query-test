import { graphql, rest } from "msw";
import { Character } from "rickmortyapi/dist/interfaces";
import { wrapWithInfo } from "../helpers/utils";

// Mock Data
const characters: Partial<Character>[] = [
  {
    id: 1,
    name: "Character 1",
    gender: "Male",
    status: "Alive",
  },
  {
    id: 2,
    name: "Character 2",
    gender: "Female",
    status: "Dead",
  },
  {
    id: 3,
    name: "Character 3",
    gender: "Genderless",
    status: "unknown",
  },
  {
    id: 4,
    name: "Character 4",
    gender: "unknown",
    status: "Alive",
  },
  {
    id: 5,
    name: "Character 5",
    gender: "Male",
    status: "Dead",
  },
  {
    id: 6,
    name: "Character 6",
    gender: "Female",
    status: "unknown",
  },
  {
    id: 7,
    name: "Character 7",
    gender: "Genderless",
    status: "Alive",
  },
];

export const charactersApiHandlers = [
  rest.get("https://rickandmortyapi.com/api/character", (req, res, ctx) => {
    console.log(req.params);

    return res(ctx.status(200), ctx.json(wrapWithInfo(characters)));
  }),
];
