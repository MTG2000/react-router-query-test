import { QueryClient, QueryClientConfig } from '@tanstack/react-query';
import { CONSTS } from './consts';

export let queryClient: QueryClient;

export const getQueryClient = () => {
  return queryClient;
};

const testingConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
  logger: {
    log: console.log,
    warn: console.warn,
    // ✅ no more errors on the console
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    error: () => {},
  },
};

export const createQueryClient = () =>
  (queryClient = new QueryClient(CONSTS.isTestEnv ? testingConfig : {}));
createQueryClient();
