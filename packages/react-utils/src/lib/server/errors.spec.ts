import { describe, expect, it } from 'vitest';

import {
  badRequest,
  conflict,
  forbidden,
  notFound,
  serverError,
  unAuthenticated,
} from './errors';

describe('badRequest', () => {
  it('should create 400 response', () => {
    const response = badRequest({ error: 'Bad request' });
    expect(response.init?.status).toBe(400);
    expect(response.data).toEqual({ error: 'Bad request' });
  });
});

describe('serverError', () => {
  it('should create 500 response', () => {
    const response = serverError({ error: 'Server error' });
    expect(response.init?.status).toBe(500);
    expect(response.data).toEqual({ error: 'Server error' });
  });
});

describe('unAuthenticated', () => {
  it('should create 401 response', () => {
    const response = unAuthenticated({ error: 'Unauthorized' });
    expect(response.init?.status).toBe(401);
    expect(response.data).toEqual({ error: 'Unauthorized' });
  });
});

describe('conflict', () => {
  it('should create 409 response with message', () => {
    const response = conflict('User', 'User already exists');
    expect(response.init?.status).toBe(409);
    expect(response.init?.statusText).toBe('User exists');
    expect(response.data).toEqual({ message: 'User already exists' });
  });
});

describe('forbidden', () => {
  it('should create 403 response with default message', () => {
    const response = forbidden();
    expect(response.init?.status).toBe(403);
    expect(response.init?.statusText).toBe('Not allowed');
    expect(response.data).toEqual({
      message: 'You may not have the right permissions for this',
    });
  });

  it('should create 403 response with custom message', () => {
    const response = forbidden('Custom forbidden message');
    expect(response.init?.status).toBe(403);
    expect(response.data).toEqual({ message: 'Custom forbidden message' });
  });
});

describe('notFound', () => {
  it('should create 404 response with name', () => {
    const response = notFound('User');
    expect(response.init?.status).toBe(404);
    expect(response.init?.statusText).toBe('User not found');
    expect(response.data).toEqual({});
  });

  it('should create 404 response with name and data', () => {
    const response = notFound('User', { message: 'User does not exist' });
    expect(response.init?.status).toBe(404);
    expect(response.init?.statusText).toBe('User not found');
    expect(response.data).toEqual({ message: 'User does not exist' });
  });
});
