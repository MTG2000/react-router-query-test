import { Link, useLoaderData } from 'react-router-dom';
import { charactersPageQuery, LoaderData } from './charactersPageQuery';
import { useQuery } from '@tanstack/react-query';
import CharactersList from './CharactersList';
import CharactersFilters from './CharactersFilters';
import { withProviders } from '@/utils/helpers';
import { CharactersFiltersProvider, useCharactersFilter } from './CharactersFiltersContext';

function CharactersPage() {
  const data = useLoaderData() as LoaderData;

  const { status, gender } = useCharactersFilter();

  const query = useQuery({
    ...charactersPageQuery({ filters: { gender, status } }),
    initialData: () => (!status && !gender ? data : undefined),
    keepPreviousData: true,
  });

  if (!query.data) return <></>;

  return (
    <main>
      <h1 className='text-h1 mb-32 font-bolder'>Explore Characters</h1>
      <div className='grid grid-cols-1 md:grid-cols-[1fr_min(25%,326px)] gap-24'>
        <CharactersList characters={query.data.results} />
        <aside>
          <div className='sticky top-24'>
            <CharactersFilters isLoading={query.isPreviousData} />
          </div>
        </aside>
      </div>
    </main>
  );
}

export default withProviders(CharactersFiltersProvider)(CharactersPage);
