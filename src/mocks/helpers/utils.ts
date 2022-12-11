import { rest } from "msw";

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

export const createOverrideHandler =
  <T extends string | Array<any> | object>(
    request: keyof typeof rest,
    url: string,
    options?: { wrapResponse?: (res: any) => any }
  ) =>
  (mockFn: () => T) =>
    rest[request](url, (req, res, ctx) => {
      try {
        const result = mockFn();
        return res(
          ctx.status(200),
          ctx.json(
            options?.wrapResponse ? options?.wrapResponse(result) : result
          )
        );
      } catch (error) {
        const status = (error as any).status ?? 500;
        const data = (error as any).data ?? "";

        return res(
          ctx.status(status),
          ctx.json({
            error: data,
          })
        );
      }
    });
