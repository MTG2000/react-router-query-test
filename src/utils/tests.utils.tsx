import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Wrapper } from "./wrapper";

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => {
  return render(ui, { wrapper: AllTheProviders, ...options });
};

export * from "@testing-library/react";
export { customRender as render };
