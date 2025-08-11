import { badRequest } from '@veraclins-dev/react-utils/server';
import { type SchemaType } from '@veraclins-dev/utils';

import { type ValidatedFormData } from '../../types';

const formSubmissionErrors = <S extends SchemaType>(
  submission: ValidatedFormData<S>,
  options: Parameters<ValidatedFormData<S>['reply']>[0] = {},
) =>
  badRequest({
    status: 'error',
    submission: submission.reply(options),
  } as const);

export { formSubmissionErrors };
