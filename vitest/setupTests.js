import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import { server } from './mocks/server';
import { fetch } from 'cross-fetch';

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

global.fetch = fetch;

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterAll(() => server.close());

afterEach(() => {
  server.resetHandlers();
  cleanup();
});
