import { QueryClient } from '@tanstack/react-query';

export let queryClient = new QueryClient();

export const getQueryClient = () => {
  return queryClient;
};

export const createQueryClient = () => (queryClient = new QueryClient());
