import { type Submission } from '@conform-to/react';

import { type SchemaType, type z } from '@veraclins-dev/utils';

export type Options<S extends SchemaType> = {
  request: Request;
  schema?: S;
  body?: URLSearchParams | FormData;
  redirectToField?: string;
};

export type ValidatedFormData<
  S extends SchemaType,
  RedirectField extends string = 'redirectTo',
> = {
  [K in RedirectField]?: string;
} & Submission<z.output<S>>;

export type SuccessfulValidatedFormData<S extends SchemaType> = Extract<
  ValidatedFormData<S>,
  { status: 'success' }
>;
