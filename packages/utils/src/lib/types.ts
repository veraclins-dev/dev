type Maybe<T> = T | null;

type Nullable<T> = {
  [P in keyof T]: Maybe<T[P]>;
};

/**
 * A type representing a function that returns a promise.
 */
type AsyncUtilFunction<F extends (...args: any[]) => any> = (
  ...args: Parameters<F>
) => Promise<Awaited<ReturnType<F>>>;

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * A type representing an object that has at least one key.
 */
type AtLeastOne<
  T,
  U = { [K in keyof Required<T>]: Pick<Required<T>, K> },
> = Partial<T> & U[keyof U];

/**
 * A type representing a number that is one less than the given number.
 */
type Sub<N extends number> = N extends 1
  ? 0
  : N extends 2
    ? 1
    : N extends 3
      ? 2
      : N extends 4
        ? 3
        : N extends 5
          ? 4
          : N extends 6
            ? 5
            : N extends 7
              ? 6
              : N extends 8
                ? 7
                : N extends 9
                  ? 8
                  : N extends 10
                    ? 9
                    : never;

/**
 * A type representing an object that has at least N keys.
 */
type AtLeastN<T, N extends number> = N extends 0
  ? Partial<T>
  : { [K in keyof T]: Pick<T, K> & AtLeastN<Omit<T, K>, Sub<N>> }[keyof T];

/**
 * A type representing an array that is guaranteed to have at least one element.
 */
type NonEmptyArray<T> = [T, ...T[]];

/**
 * A type representing an array that is guaranteed to include a specific item.
 */
type EnsureArrayIncludesItem<T, K extends T> = [K, ...T[]];

export type {
  AsyncUtilFunction,
  AtLeastN,
  AtLeastOne,
  Breakpoint,
  EnsureArrayIncludesItem,
  Maybe,
  NonEmptyArray,
  Nullable,
  Sub,
};
