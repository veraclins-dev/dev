import { type Submission } from '@conform-to/react';

import { type SchemaType, type z } from '@veraclins-dev/utils';

type Options<S extends SchemaType> = {
  request: Request;
  schema?: S;
  body?: URLSearchParams | FormData;
  redirectToField?: string;
};

type ValidatedFormData<
  S extends SchemaType,
  RedirectField extends string = 'redirectTo',
> = {
  [K in RedirectField]?: string;
} & Submission<z.output<S>>;

// type SuccessfulValidatedFormData<S extends SchemaType> = Extract<
//   ValidatedFormData<S>,
//   { status: 'success' }
// >;

export type {
  Options,
  //  SuccessfulValidatedFormData,
  ValidatedFormData,
};
