type Nullish = null | undefined;
export type Nullable<T> = T | Nullish;
export const isNullish = (value: unknown): value is Nullish => value == null;
