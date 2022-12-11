import {
  charactersApiHandlers,
  charactersOverrides,
} from "./characters.mockHandlers";

export const handlers = [...charactersApiHandlers];

export const MOCKS_OVERRIDES = {
  characters: charactersOverrides,
};
