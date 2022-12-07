import { API } from "@/api";
import { createLoader } from "@/router/createLoader";
import { LoaderReturnType } from "@/utils/types/typeUtils";

export const charactersPageQuery = () => ({
  queryKey: ["characters"],
  queryFn: API.characters.getAllCharacters,
});

export type LoaderData = LoaderReturnType<typeof charactersPageQuery>;

export const charactersPageLoader = createLoader(() => charactersPageQuery());
