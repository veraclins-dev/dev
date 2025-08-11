import { z, type ZodError } from 'zod';

import { humanize } from './misc';

z.config({
  customError: (issue) => {
    if (issue.code === 'invalid_type') {
      if (issue.path && typeof issue.path === 'string')
        return humanize(`Please provide a value for ${issue.path}`);
      if (issue.path && typeof issue.path[0] === 'string')
        return humanize(`Please provide a value for ${issue.path[0]}`);
      return 'Please fill in this field';
    }
    return undefined; // Let Zod use default error
  },
});

const Empty = z.object({});

type SchemaType = z.ZodType<any, any>;
type SchemaTypeWithId = z.ZodType & { id: string | number };

type SchemaInfer<T extends SchemaType = SchemaType> = z.infer<T>;

type Values<S extends SchemaType> = z.TypeOf<S> & {
  [key: string]: string | string[];
};

export {
  Empty,
  type SchemaInfer,
  type SchemaType,
  type SchemaTypeWithId,
  type Values,
  z,
  type ZodError,
};
