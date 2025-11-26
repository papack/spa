export function signal<T>(v: T) {
  const read = (): T => v;
  const write = (v: T) => {};

  return [read, write] as const;
}
