import type { ReadFn } from "./signal";

export type EffectFn<T> = {
  type: "effect";
  readFn: ReadFn<T>;
  repeat: () => Promise<unknown>;
  result: unknown;
};

export async function effect<T>(
  readFn: ReadFn<T>,
  fn: (value: T) => Promise<unknown>
): Promise<{
  type: "effect";
  readFn: ReadFn<T>;
  repeat: () => Promise<unknown>;
  result: unknown;
}> {
  let result: unknown;

  //first call, run fn AND register (register == provide clbk)
  await readFn(async (v) => {
    result = await fn(v as T);
  });

  //repeat read, without register again
  async function repeat() {
    const result = await readFn();
    return await fn(result);
  }

  //return to use in h fn
  return { type: "effect", readFn, repeat, result } as EffectFn<T>;
}
