'use server';

import { parseWithZod } from '@conform-to/zod';

import {
  type ValidateReturnType,
  validateZodSchema,
} from '@veraclins-dev/utils';

import { checkHoneypot } from './honeypot';
import {
  Empty,
  type Options,
  type SchemaType,
  type ValidatedFormData,
} from './types';

export const processFormData = async <
  S extends SchemaType,
  RedirectField extends string = 'redirectTo',
>(
  formData: FormData | URLSearchParams,
  schema?: S,
  REDIRECT_TO_FIELD: RedirectField = 'redirectTo' as RedirectField,
): Promise<
  ValidateReturnType<S> & {
    [K in RedirectField]: string;
  }
> => {
  const data: Record<string, FormDataEntryValue | null> = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value || null;
  }
  const { redirectTo, ...values } = data;
  const result = await validateZodSchema(schema)(values);

  return { ...result, [REDIRECT_TO_FIELD]: redirectTo || '' };
};

export const processForm = async <S extends SchemaType>({
  request,
  schema: sch,
  body,
  redirectToField: REDIRECT_TO_FIELD = 'redirectTo',
}: Options<S>): Promise<ValidatedFormData<S>> => {
  if (!body) {
    body = await request.formData();
  }
  if (body instanceof FormData) {
    await checkHoneypot(body);
  }

  const schema = sch ?? Empty;

  const redirectTo = body.get(REDIRECT_TO_FIELD) as string;

  const submission = await parseWithZod(body, { schema, async: true });

  return { ...submission, [REDIRECT_TO_FIELD]: redirectTo || undefined };
};
