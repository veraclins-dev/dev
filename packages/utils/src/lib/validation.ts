import { z, type ZodError } from 'zod';

import { humanize } from './misc';

const customErrorMap: z.ZodErrorMap = (error, ctx) => {
  if (error.code === z.ZodIssueCode.invalid_type) {
    if (typeof error.path === 'string')
      return { message: humanize(`Please provide a value for ${error.path}`) };
    if (typeof error.path[0] === 'string')
      return {
        message: humanize(`Please provide a value for ${error.path[0]}`),
      };
    return { message: 'Please fill in this field' };
  }

  return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);

type ParserType = 'sync' | 'async';

function formatZodError(error: ZodError) {
  if (!error || typeof error.format !== 'function') {
    throw new Error(
      'The argument to formatZodError must be a zod error with error.format()',
    );
  }

  const errors = error.format();
  return recursiveFormatZodErrors(errors);
}

type WithError = {
  _errors?: string[];
  [key: string]: any;
};

function recursiveFormatZodErrors(errors: Record<string, WithError>): {
  errors: Record<string | number, any>;
  success: false;
} {
  let formattedErrors: Record<string | number, any> = {};

  for (const key in errors) {
    if (key === '_errors') {
      continue;
    }

    if (errors[key]?.['_errors']?.[0]) {
      if (!isNaN(Number(key)) && !Array.isArray(formattedErrors)) {
        formattedErrors = [];
      }
      formattedErrors[Number(key)] = errors[key]['_errors'][0];
    } else {
      if (!isNaN(Number(key)) && !Array.isArray(formattedErrors)) {
        formattedErrors = [];
      }
      formattedErrors[Number(key)] = recursiveFormatZodErrors(errors[key]);
    }
  }

  return { errors: formattedErrors, success: false };
}

const validateZodSchemaSync =
  <S extends z.ZodType>(schema?: S) =>
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
  <S extends z.ZodType>(schema?: S) =>
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

type Values<S extends z.ZodType> = z.TypeOf<S> & {
  [key: string]: string | string[];
};

type ReturnType<S extends z.ZodType> =
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

type ValidateReturnType<S extends z.ZodType<unknown>> = ReturnType<S>;

function validateZodSchema<S extends z.ZodType<unknown>>(
  schema?: S,
  parserType: ParserType = 'async',
) {
  if (parserType === 'sync') {
    return validateZodSchemaSync(schema);
  } else {
    return validateZodSchemaAsync(schema);
  }
}

type SchemaType = z.ZodTypeAny;
type SchemaTypeWithId = z.ZodType & { id: string | number };

type SchemaInfer<T extends SchemaTypeWithId = SchemaTypeWithId> = z.infer<T>;

export {
  formatZodError,
  type ParserType,
  type ReturnType,
  type SchemaInfer,
  type SchemaType,
  type SchemaTypeWithId,
  type ValidateReturnType,
  validateZodSchema,
  type Values,
  z,
  type ZodError,
};
