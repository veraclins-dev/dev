export interface ObjectOption {
  label: React.ReactNode;
  value: string;
  [key: string]: unknown;
}

export type Option = string | ObjectOption;

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
