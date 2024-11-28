import { type Submission } from '@conform-to/react';
import { z } from './zod';
import { REDIRECT_TO_FIELD } from './constants';

export type SchemaType = z.ZodTypeAny;

export const Empty = z.object({});

export type FormHandlerOptions<S extends SchemaType> = {
  request: Request;
  schema?: S;
  body?: URLSearchParams | FormData;
};

export type ValidatedFormData<S extends SchemaType> = {
  [REDIRECT_TO_FIELD]?: string;
} & Submission<z.output<S>>;

export type SuccessfulValidatedFormData<S extends SchemaType> = Extract<
  ValidatedFormData<S>,
  { status: 'success' }
>;

type StringOrNumber = string | number;

export interface ObjectOption<S extends StringOrNumber = string> {
  label: React.ReactNode;
  value: S;
  [key: string]: unknown;
}

export type SelectOption<S extends StringOrNumber = string> =
  | string
  | ObjectOption<S>;
