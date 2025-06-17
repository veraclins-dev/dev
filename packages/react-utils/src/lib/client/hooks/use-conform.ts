import {
  type DefaultValue,
  type SubmissionResult,
  useForm,
} from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { useActionData } from 'react-router';

import {
  Empty,
  type SchemaType,
  type Values,
  type z,
} from '@veraclins-dev/utils';

import { type UseCustomFetcherReturn } from './use-custom-fetcher';

// import { type useCustomFetcher } from '#app/hooks/use-custom-fetcher';
// import { Empty, type SchemaType } from '#app/utils/form/types.ts';
// import { type Values, type z } from '#app/validations/index.ts';

type Options = Parameters<typeof useForm>[0];

export interface ConformOptions<S extends SchemaType> extends Options {
  schema?: S;
  id: string;
  defaultValue?: DefaultValue<Values<S>>;
  fetcher?: UseCustomFetcherReturn<Values<S>>;
}

export const useConform = <
  S extends SchemaType,
  L extends { submission: SubmissionResult<S> } = {
    submission: SubmissionResult<S>;
  },
>({
  schema: sch,
  id,
  defaultValue,
  fetcher,
}: ConformOptions<S>) => {
  const actionData = useActionData<L>();
  const schema = sch ?? Empty;

  const submission = actionData?.submission ?? fetcher?.data?.submission;
  const [form, fields] = useForm<z.infer<S>>({
    id,
    constraint: getZodConstraint(schema),
    lastResult: submission,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
    shouldRevalidate: 'onBlur',
    defaultValue: defaultValue ?? undefined,
  });

  return {
    form,
    fields,
    success: Boolean(form.status !== 'error' && form.valid && submission),
  };
};

export type FormFields<T extends SchemaType> = ReturnType<
  typeof useConform<T>
>['fields'];
