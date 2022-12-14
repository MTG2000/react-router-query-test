/* eslint-disable no-undef */
import { expect, afterEach } from 'vitest';
import matchers from '@testing-library/jest-dom/matchers';
import { server } from '../src/mocks/server';
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
});
