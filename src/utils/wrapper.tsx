import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./apiClient";

export const Wrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
