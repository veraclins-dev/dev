import {
  type SubmissionResult,
  useForm,
  type DefaultValue,
} from '@conform-to/react';
import { useActionData } from '@remix-run/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { type useCustomFetcher } from './useCustomFetcher';
import { Empty, type SchemaType } from '../types';
import { type z, type Values } from '../zod';

export interface FormErrors<S extends SchemaType> {
  errors: Values<S>;
  formError: string;
}

type Options = Parameters<typeof useForm>[0];

interface ConformOptions<S extends SchemaType> extends Options {
  schema?: S;
  id: string;
  defaultValue?: DefaultValue<Values<S>>;
  fetcher?: ReturnType<typeof useCustomFetcher>;
}

export const useConForm = <
  S extends SchemaType,
  L extends { submission: SubmissionResult<S> },
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
