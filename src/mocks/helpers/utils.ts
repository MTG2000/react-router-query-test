export function wrapWithInfo<T>(data: T[]) {
  return {
    info: {
      count: data.length,
      pages: 1,
      next: null,
      prev: null,
    },
    results: data,
  };
}
