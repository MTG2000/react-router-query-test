import { API } from '@/api';
import { createLoader } from '@/router/createLoader';
import { LoaderReturnType } from '@/utils/types/typeUtils';

export const characterDetailsQuery = (id: number) => ({
  queryKey: ['character', id],
  queryFn: () => API.characters.getCharacterById(id),
});

export type LoaderData = LoaderReturnType<typeof characterDetailsQuery>;

export const characterDetailsLoader = createLoader(({ params }) =>
  characterDetailsQuery(Number(params.characterId)),
);
