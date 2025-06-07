export type InputLabel = string | React.ReactNode;

export interface ObjectOption<T extends InputLabel = string> {
  label: T;
  value: string;
  [key: string]: unknown;
}

export type Option<T extends InputLabel = string> = string | ObjectOption<T>;

export type OptionWithId<T extends InputLabel = string> =
  | (ObjectOption<T> & { id?: string })
  | string;

export type Measurable = {
  getBoundingClientRect(): DOMRect;
};

export type Maybe<T> = T | null;

export type MaybeString = Maybe<string>;

export type WithTrigger<T extends object> = {
  Trigger: React.ComponentType<T>;
  TriggerProps: T;
};

export type WithComponent<T extends object> = {
  Component: React.ComponentType<T>;
  ComponentProps: T;
};

export type WithTooltip<T extends object> = T & {
  tooltip?: React.ReactNode;
};

export type ComponentWithTooltip<
  T extends
    | keyof React.JSX.IntrinsicElements
    | React.JSXElementConstructor<any>,
  S extends object = object,
> = React.ComponentProps<T> & { tooltip?: React.ReactNode } & S;

export type ComponentPropsWithoutColor<
  T extends
    | keyof React.JSX.IntrinsicElements
    | React.JSXElementConstructor<any>,
> = Omit<React.ComponentProps<T>, 'color'>;
