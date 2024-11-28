import { parseWithZod } from '@conform-to/zod';
import { z, type ValidateReturnType, validateZodSchema } from '../zod';
import {
  type FormHandlerOptions,
  type SchemaType,
  type ValidatedFormData,
} from '../types';
import { checkHoneypot } from './honeypot';
import { REDIRECT_TO_FIELD } from '../constants';

export const processFormData = async <S extends SchemaType>(
  formData: FormData | URLSearchParams,
  schema?: S,
): Promise<ValidateReturnType<S> & { [REDIRECT_TO_FIELD]: string }> => {
  const data: Record<string, any> = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value || null;
  }
  const { redirectTo, ...values } = data;
  const result = await validateZodSchema(schema)(values);

  return { ...result, [REDIRECT_TO_FIELD]: redirectTo || '' };
};

export const Empty = z.object({});

export const processForm = async <S extends SchemaType>({
  request,
  schema: sch,
  body,
}: FormHandlerOptions<S>): Promise<ValidatedFormData<S>> => {
  if (!body) {
    body = await request.formData();
  }
  if (body instanceof FormData) {
    checkHoneypot(body);
  }

  const schema = sch ?? Empty;

  const redirectTo = body.get(REDIRECT_TO_FIELD) as string;

  const submission = await parseWithZod(body, { schema, async: true });

  return { ...submission, [REDIRECT_TO_FIELD]: redirectTo || '' };
};
