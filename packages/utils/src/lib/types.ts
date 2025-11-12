import type * as React from 'react';

type Maybe<T> = T | null;

type Nullable<T> = {
  [P in keyof T]: Maybe<T[P]>;
};

/**
 * A type representing a function that returns a promise.
 */
type AsyncUtilFunction<F extends (...args: unknown[]) => unknown> = (
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

/**
 * `T extends ConsistentWith<T, U>` means that where `T` has overlapping properties with
 * `U`, their value types do not conflict.
 *
 * @internal
 */
type ConsistentWith<DecorationTargetProps, InjectedProps> = {
  [P in keyof DecorationTargetProps]: P extends keyof InjectedProps
    ? InjectedProps[P] extends DecorationTargetProps[P]
      ? DecorationTargetProps[P]
      : InjectedProps[P]
    : DecorationTargetProps[P];
};

/**
 * a function that takes {component} and returns a component that passes along
 * all the props to {component} except the {InjectedProps} and will accept
 * additional {AdditionalProps}
 */
type PropInjector<InjectedProps, AdditionalProps = object> = <
  C extends React.JSXElementConstructor<
    ConsistentWith<React.ComponentProps<C>, InjectedProps>
  >,
>(
  component: C,
) => React.JSXElementConstructor<
  DistributiveOmit<
    React.JSX.LibraryManagedAttributes<C, React.ComponentProps<C>>,
    keyof InjectedProps
  > &
    AdditionalProps
>;

/**
 * Remove properties `K` from `T`.
 * Distributive for union types.
 *
 * @internal
 */
type DistributiveOmit<T, K extends keyof any> = T extends any // eslint-disable-line @typescript-eslint/no-explicit-any -- this is a valid use case
  ? Omit<T, K>
  : never;

// https://stackoverflow.com/questions/53807517/how-to-test-if-two-types-are-exactly-the-same
type IfEquals<T, U, Y = unknown, N = never> =
  (<G>() => G extends T ? 1 : 2) extends <G>() => G extends U ? 1 : 2 ? Y : N;

/**
 * Simplifies the display of a type (without modifying it).
 * Taken from https://effectivetypescript.com/2022/02/25/gentips-4-display/
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
type Simplify<T> = T extends Function ? T : { [K in keyof T]: T[K] };

/**
 * Changes the properties K from T to required
 */
type PartiallyRequired<T, K extends keyof T> = DistributiveOmit<T, K> & {
  [P in K]-?: T[P];
};

export type {
  AsyncUtilFunction,
  AtLeastN,
  AtLeastOne,
  Breakpoint,
  ConsistentWith,
  DistributiveOmit,
  EnsureArrayIncludesItem,
  IfEquals,
  Maybe,
  NonEmptyArray,
  Nullable,
  PartiallyRequired,
  PropInjector,
  Simplify,
  Sub,
};
