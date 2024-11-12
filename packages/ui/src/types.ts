export interface ObjectOption {
  label: React.ReactNode;
  value: string;
  [key: string]: unknown;
}

export type Option = string | ObjectOption;
