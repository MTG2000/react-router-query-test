import { delay } from '@/utils/helpers';
import { Episode, Info } from 'rickmortyapi/dist/interfaces';

export async function getAllEpisodes() {
  await delay();
  return fetch(apiRoutes.getAllEpisodes).then((res) => res.json()) as Promise<Info<Episode[]>>;
}

export async function getEpisodeById(id: number) {
  await delay();
  const res = await fetch(apiRoutes.getEpisodeById(id));
  const json = await res.json();

  if (!res.ok)
    throw new Response(json.error, {
      status: res.status,
      statusText: res.statusText,
    });

  return json as Episode;
}

export const apiRoutes = {
  getAllEpisodes: 'https://rickandmortyapi.com/api/episode',
  getEpisodeById: (id: number) => `https://rickandmortyapi.com/api/episode/${id}`,
};
