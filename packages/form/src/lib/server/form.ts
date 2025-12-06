import { parseWithZod } from '@conform-to/zod/v4';

import { Empty, type SchemaType } from '@veraclins-dev/utils';

import { type Options, type ValidatedFormData } from '../../types';

import { checkHoneypot } from './honeypot';

const processForm = async <S extends SchemaType>({
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

  const submission = await parseWithZod(body, {
    schema: schema as S,
    async: true,
  });

  return { ...submission, [REDIRECT_TO_FIELD]: redirectTo || undefined };
};

export { processForm };
