export function removeUndefinedFromObject<T extends Record<any, any>>(obj?: T) {
  if (!obj) return undefined;
  const result: Partial<T> = { ...obj };
  Object.keys(result).forEach((key) =>
    result[key] === undefined ? delete result[key] : {}
  );
  return result;
}
