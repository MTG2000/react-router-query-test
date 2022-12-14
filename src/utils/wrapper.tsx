import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from './apiClient';

export const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = createQueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
