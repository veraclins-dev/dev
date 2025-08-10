import { data as dataResponse } from 'react-router';

const response = <T extends Record<string, any>>({
  data,
  statusText,
  status,
}: {
  data: T;
  statusText: string;
  status: number;
}) => dataResponse(data, { statusText, status });

const badRequest = <T>(data: T) => dataResponse(data, { status: 400 });

const serverError = <T>(data: T) => dataResponse(data, { status: 500 });

const unAuthenticated = <T>(data: T) => dataResponse(data, { status: 401 });

const conflict = (name: string, message: string) =>
  response({ data: { message }, status: 409, statusText: `${name} exists` });

const forbidden = (
  message = 'You may not have the right permissions for this',
) => response({ data: { message }, status: 403, statusText: `Not allowed` });

const notFound = (name: string, data: { message?: string } = {}) =>
  response({ data, status: 404, statusText: `${name} not found` });

export {
  badRequest,
  conflict,
  response as dataResponse,
  forbidden,
  notFound,
  serverError,
  unAuthenticated,
};
