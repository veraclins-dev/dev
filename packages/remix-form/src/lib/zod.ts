import { humanize } from '@veraclins-dev/utils';
import { z, type ZodError } from 'zod';

export type ZodReturnType<S extends z.ZodType> =
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

export type ValidateReturnType<S extends z.ZodType> = ZodReturnType<S>;

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
  <S extends z.ZodType>(schema?: S) =>
  (values: z.TypeOf<S>): ZodReturnType<S> => {
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
  <S extends z.ZodType>(schema?: S) =>
  async (values: z.TypeOf<S>): Promise<ZodReturnType<S>> => {
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

export type Values<S extends z.ZodType> = z.TypeOf<S> & {
  [key: string]: string;
};

export function validateZodSchema<S extends z.ZodType>(
  schema: S,
  parserType?: 'sync',
): (values: Values<S>) => ZodReturnType<S>;
export function validateZodSchema<S extends z.ZodType>(
  schema?: S,
  parserType?: 'async',
): (values: Values<S>) => Promise<ZodReturnType<S>>;
export function validateZodSchema<S extends z.ZodType>(
  schema?: S,
): (values: Values<S>) => Promise<ZodReturnType<S>>;
export function validateZodSchema<S extends z.ZodType>(
  schema?: S,
  parserType: ParserType = 'async',
) {
  if (parserType === 'sync') {
    return validateZodSchemaSync(schema);
  } else {
    return validateZodSchemaAsync(schema);
  }
}

export const deleteErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_literal) {
    if (issue.expected === 'permanently delete') {
      return { message: "Must be exactly 'permanently delete'" };
    }
  }
  return { message: ctx.defaultError };
};

export { z };
