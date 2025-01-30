import { z, type ZodError } from 'zod';

import { humanize } from '@veraclins-dev/utils';

const customErrorMap: z.ZodErrorMap = (error, ctx) => {
  if (error.code === z.ZodIssueCode.invalid_type) {
    if (typeof error.path === 'string')
      return { message: humanize(`${error.path} is required`) };
    if (typeof error.path[0] === 'string')
      return { message: humanize(`${error.path[0]} is required`) };
    return { message: `This field is required` };
  }

  return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);

export type ParserType = 'sync' | 'async';

export function formatZodError(error: ZodError) {
  if (!error || typeof error.format !== 'function') {
    throw new Error(
      'The argument to formatZodError must be a zod error with error.format()',
    );
  }

  const errors = error.format();
  return recursiveFormatZodErrors(errors);
}

export function recursiveFormatZodErrors(errors: any): {
  errors: Record<string | number, any>;
  success: false;
} {
  let formattedErrors: Record<string | number, any> = {};

  for (const key in errors) {
    if (key === '_errors') {
      continue;
    }

    if (errors[key]?._errors?.[0]) {
      if (!isNaN(key as any) && !Array.isArray(formattedErrors)) {
        formattedErrors = [];
      }
      formattedErrors[key as unknown as number] = errors[key]._errors[0];
    } else {
      if (!isNaN(key as any) && !Array.isArray(formattedErrors)) {
        formattedErrors = [];
      }
      formattedErrors[key as unknown as number] = recursiveFormatZodErrors(
        errors[key],
      );
    }
  }

  return { errors: formattedErrors, success: false };
}

const validateZodSchemaSync =
  <S extends z.ZodType<any, any>>(schema?: S) =>
  (values: z.TypeOf<S>): ReturnType<S> => {
    if (!schema) return { values, success: true };
    try {
      schema.parse(values);
      return { values, success: true };
    } catch (error: any) {
      return error.format
        ? formatZodError(error)
        : { errors: error.toString(), success: false };
    }
  };

const validateZodSchemaAsync =
  <S extends z.ZodType<any, any>>(schema?: S) =>
  async (values: z.TypeOf<S>): Promise<ReturnType<S>> => {
    if (!schema) return { values, success: true };
    try {
      await schema.parseAsync(values);
      return { values, success: true };
    } catch (error: any) {
      return error.format
        ? formatZodError(error)
        : { errors: error.toString(), success: false };
    }
  };

export type Values<S extends z.ZodType<any, any>> = z.TypeOf<S> & {
  [key: string]: string | string[];
};

export type ReturnType<S extends z.ZodType<any, any>> =
  | {
      values: Values<S>;
      errors?: undefined;
      success: true;
    }
  | {
      errors: any;
      values?: undefined;
      success: false;
    };

export type ValidateReturnType<S extends z.ZodType<any, any>> = ReturnType<S>;

export function validateZodSchema<S extends z.ZodType<any, any>>(
  schema?: S,
  parserType?: 'sync',
): (values: Values<S>) => ReturnType<S>;
export function validateZodSchema<S extends z.ZodType<any, any>>(
  schema?: S,
  parserType?: 'async',
): (values: Values<S>) => Promise<ReturnType<S>>;
export function validateZodSchema<S extends z.ZodType<any, any>>(
  schema?: S,
): (values: Values<S>) => Promise<ReturnType<S>>;
export function validateZodSchema<S extends z.ZodType<any, any>>(
  schema?: S,
  parserType: ParserType = 'async',
) {
  if (parserType === 'sync') {
    return validateZodSchemaSync(schema);
  } else {
    return validateZodSchemaAsync(schema);
  }
}

const errorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_literal) {
    if (issue.expected === 'permanently delete') {
      return { message: "Must be exactly 'permanently delete'" };
    }
  }
  return { message: ctx.defaultError };
};

export const Delete = z.object({
  confirm: z.literal('permanently delete', {
    errorMap,
  }),
});

export const GroupSearch = z.object({
  searchQuery: z.string().min(1),
  groupId: z.string().min(1),
});

export const ThemeSchema = z.object({
  theme: z.enum(['system', 'light', 'dark']),
});

export { z };
