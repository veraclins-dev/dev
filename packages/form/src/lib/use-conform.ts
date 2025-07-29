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

type Options = Parameters<typeof useForm>[0];

export interface ConformOptions<S extends SchemaType> extends Options {
  schema?: S;
  id: string;
  defaultValue?: DefaultValue<Values<S>>;
  fetcher?: UseCustomFetcherReturn<S>;
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
}: ConformOptions<S>): {
  form: ReturnType<typeof useForm<z.infer<S>>>[0];
  fields: ReturnType<typeof useForm<z.infer<S>>>[1];
  success: boolean;
} => {
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
