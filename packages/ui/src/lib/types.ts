export interface ObjectOption {
  label: React.ReactNode;
  value: string;
  [key: string]: unknown;
}

export type Option = string | ObjectOption;

export type OptionWithId = (ObjectOption & { id?: string }) | string;

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
