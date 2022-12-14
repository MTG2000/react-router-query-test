import { API } from '@/api';
import { createLoader } from '@/router/createLoader';
import { LoaderReturnType } from '@/utils/types/typeUtils';

export const charactersPageQuery = (options?: {
  filters: Parameters<typeof API.characters.getCharacters>[0];
}) => ({
  queryKey: ['characters', 'list', { filters: options?.filters }],
  queryFn: () => API.characters.getCharacters(options?.filters),
});

export type LoaderData = LoaderReturnType<typeof charactersPageQuery>;

export const charactersPageLoader = createLoader(() => charactersPageQuery());
