export type Label = string | React.ReactNode;

export interface ObjectOption<T extends Label = string> {
  label: T;
  value: string;
  [key: string]: unknown;
}

export type Option<T extends Label = string> = string | ObjectOption<T>;

export type OptionWithId<T extends Label = string> =
  | (ObjectOption<T> & { id?: string })
  | string;

export type Measurable = {
  getBoundingClientRect(): DOMRect;
};

export type Maybe<T> = T | null;

export type MaybeString = Maybe<string>;

export type WithTrigger<T extends object, S extends Element = Element> = {
  Trigger: React.ComponentType<T>;
  TriggerProps: T;
  triggerRef?: React.Ref<S>;
};

export type WithComponent<T extends object, S extends Element = Element> = {
  Component: React.ComponentType<T>;
  ComponentProps: T;
  componentRef?: React.Ref<S>;
};
