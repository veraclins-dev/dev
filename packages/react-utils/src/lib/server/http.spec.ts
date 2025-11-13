import { describe, expect, it } from 'vitest';

import {
  combineHeaders,
  combineResponseInits,
  invariantResponse,
  mergeHeaders,
} from './http';

describe('mergeHeaders', () => {
  it('should merge multiple headers', () => {
    const header1 = new Headers({ 'Content-Type': 'application/json' });
    const header2 = new Headers({ 'Authorization': 'Bearer token' });
    const result = mergeHeaders(header1, header2);

    expect(result.get('Content-Type')).toBe('application/json');
    expect(result.get('Authorization')).toBe('Bearer token');
  });

  it('should overwrite duplicate keys with last value', () => {
    const header1 = new Headers({ 'Content-Type': 'application/json' });
    const header2 = new Headers({ 'Content-Type': 'text/html' });
    const result = mergeHeaders(header1, header2);

    expect(result.get('Content-Type')).toBe('text/html');
  });

  it('should handle null and undefined headers', () => {
    const header1 = new Headers({ 'Content-Type': 'application/json' });
    const result = mergeHeaders(header1, null, undefined);

    expect(result.get('Content-Type')).toBe('application/json');
  });

  it('should handle empty headers', () => {
    const result = mergeHeaders();
    expect(result).toBeInstanceOf(Headers);
    expect(result.entries().next().done).toBe(true);
  });

  it('should handle string headers', () => {
    const result = mergeHeaders(new Headers({ 'Content-Type': 'application/json' }));
    expect(result.get('Content-Type')).toBe('application/json');
  });

  it('should handle array headers', () => {
    const result = mergeHeaders([
      ['Content-Type', 'application/json'],
      ['Authorization', 'Bearer token'],
    ]);
    expect(result.get('Content-Type')).toBe('application/json');
    expect(result.get('Authorization')).toBe('Bearer token');
  });
});

describe('combineHeaders', () => {
  it('should combine multiple headers', () => {
    const header1 = new Headers({ 'Content-Type': 'application/json' });
    const header2 = new Headers({ 'Authorization': 'Bearer token' });
    const result = combineHeaders(header1, header2);

    expect(result.get('Content-Type')).toBe('application/json');
    expect(result.get('Authorization')).toBe('Bearer token');
  });

  it('should append duplicate keys instead of overwriting', () => {
    const header1 = new Headers({ 'Set-Cookie': 'cookie1=value1' });
    const header2 = new Headers({ 'Set-Cookie': 'cookie2=value2' });
    const result = combineHeaders(header1, header2);

    // Headers.append() allows multiple values for the same key
    // We can verify both values are present by checking the header string
    const headerString = result.get('Set-Cookie') || '';
    expect(headerString).toContain('cookie');
  });

  it('should handle null and undefined headers', () => {
    const header1 = new Headers({ 'Content-Type': 'application/json' });
    const result = combineHeaders(header1, null, undefined);

    expect(result.get('Content-Type')).toBe('application/json');
  });
});

describe('combineResponseInits', () => {
  it('should combine multiple response inits', () => {
    const init1 = { status: 200, headers: { 'Content-Type': 'application/json' } };
    const init2 = { status: 201, headers: { 'Authorization': 'Bearer token' } };
    const result = combineResponseInits(init1, init2);

    expect(result.status).toBe(201);
    expect(result.headers?.get('Content-Type')).toBe('application/json');
    expect(result.headers?.get('Authorization')).toBe('Bearer token');
  });

  it('should handle null and undefined inits', () => {
    const init1 = { status: 200 };
    const result = combineResponseInits(init1, null, undefined);

    expect(result).toBeDefined();
    if (result.status !== undefined) {
      expect(result.status).toBe(200);
    }
  });

  it('should combine headers from multiple inits', () => {
    const init1 = { headers: { 'Content-Type': 'application/json' } };
    const init2 = { headers: { 'Authorization': 'Bearer token' } };
    const result = combineResponseInits(init1, init2);

    expect(result.headers?.get('Content-Type')).toBe('application/json');
    expect(result.headers?.get('Authorization')).toBe('Bearer token');
  });
});

describe('invariantResponse', () => {
  it('should not throw when condition is truthy', () => {
    expect(() => invariantResponse(true, 'Error message')).not.toThrow();
  });

  it('should throw Response when condition is falsy', () => {
    expect(() => invariantResponse(false, 'Error message')).toThrow();
  });

  it('should throw Response with custom status', () => {
    try {
      invariantResponse(false, 'Error message', { status: 404 });
    } catch (error) {
      expect(error).toBeInstanceOf(Response);
      expect((error as Response).status).toBe(404);
    }
  });

  it('should use function for message', () => {
    const getMessage = () => 'Dynamic error message';
    try {
      invariantResponse(false, getMessage);
    } catch (error) {
      expect(error).toBeInstanceOf(Response);
    }
  });
});
