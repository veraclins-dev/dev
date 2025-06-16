import { data as dataResponse } from 'react-router';

import { type SchemaType } from '@veraclins-dev/utils';

import { type ValidatedFormData } from './types';

const response = <T extends Record<string, any>>({
  data,
  statusText,
  status,
}: {
  data: T;
  statusText: string;
  status: number;
}) => dataResponse(data, { statusText, status });

export const badRequest = <T>(data: T) => dataResponse(data, { status: 400 });

export const serverError = <T>(data: T) => dataResponse(data, { status: 500 });

export const unAuthenticated = <T>(data: T) =>
  dataResponse(data, { status: 401 });

export const conflict = (name: string, message: string) =>
  response({ data: { message }, status: 409, statusText: `${name} exists` });

export const forbidden = (
  message = 'You may not have the right permissions for this',
) => response({ data: { message }, status: 403, statusText: `Not allowed` });

export const notFound = (name: string, data: { message?: string } = {}) =>
  response({ data, status: 404, statusText: `${name} not found` });

export const formSubmissionErrors = <S extends SchemaType>(
  submission: ValidatedFormData<S>,
  options: Parameters<ValidatedFormData<S>['reply']>[0] = {},
) =>
  badRequest({
    status: 'error',
    submission: submission.reply(options),
  } as const);
