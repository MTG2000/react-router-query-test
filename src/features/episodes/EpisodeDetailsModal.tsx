import ReactModal from 'react-modal';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { episodeDetailsQuery, LoaderData } from './episodeDetailsQuery';
import { useQuery } from '@tanstack/react-query';

export default function EpisodeDetailsModal() {
  const data = useLoaderData() as LoaderData;
  const params = useParams();
  const navigate = useNavigate();

  const query = useQuery({
    ...episodeDetailsQuery(Number(params.episodeId)),
    initialData: data,
  });

  return (
    <ReactModal
      isOpen
      onRequestClose={() => navigate('..', { relative: 'path' })}
      overlayClassName='bg-gray-500 bg-opacity-70 fixed inset-0'
      className='bg-gray-800 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-24 rounded'
    >
      <h1 className='text-h1'>{query.data.name}</h1>
      <p>{query.data.episode}</p>
      <p className='font-medium text-gray-400 text-body4 mb-4'>{query.data.air_date}</p>
    </ReactModal>
  );
}
