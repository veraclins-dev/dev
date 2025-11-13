import { renderHook } from '@testing-library/react';
import { createElement } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { describe, expect, it } from 'vitest';

import {
  getPathWithRedirect,
  usePathWithRedirect,
} from './use-path-with-redirect';

describe('getPathWithRedirect', () => {
  it('should add redirectTo query parameter to string path', () => {
    const result = getPathWithRedirect('/target', '/current');
    expect(result).toBe('/target?redirectTo=%2Fcurrent');
  });

  it('should preserve existing query parameters', () => {
    const result = getPathWithRedirect('/target?foo=bar', '/current');
    expect(result).toBe('/target?foo=bar&redirectTo=%2Fcurrent');
  });

  it('should preserve hash', () => {
    const result = getPathWithRedirect('/target#section', '/current');
    expect(result).toBe('/target?redirectTo=%2Fcurrent#section');
  });

  it('should preserve both query and hash', () => {
    const result = getPathWithRedirect('/target?foo=bar#section', '/current');
    expect(result).toBe('/target?foo=bar&redirectTo=%2Fcurrent#section');
  });

  it('should handle object path with search', () => {
    const result = getPathWithRedirect(
      { pathname: '/target', search: '?foo=bar' },
      '/current',
    );
    expect(result.search).toContain('redirectTo=%2Fcurrent');
  });

  it('should handle object path without search', () => {
    const result = getPathWithRedirect({ pathname: '/target' }, '/current');
    expect(result.search).toBe('?redirectTo=%2Fcurrent');
  });

  it('should return number as-is', () => {
    const result = getPathWithRedirect(-1, '/current');
    expect(result).toBe(-1);
  });

  it('should use custom redirect field name', () => {
    const result = getPathWithRedirect('/target', '/current', 'customField');
    expect(result).toBe('/target?customField=%2Fcurrent');
  });
});

function createWrapper(initialEntries = ['/current']) {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: createElement('div', null, 'Root'),
        children: [
          {
            path: 'current',
            element: createElement('div', null, 'Current'),
          },
          {
            path: 'new-current',
            element: createElement('div', null, 'New Current'),
          },
        ],
      },
    ],
    { initialEntries },
  );
  return ({ children }: { children: React.ReactNode }) => (
    <RouterProvider router={router}>{children}</RouterProvider>
  );
}

describe('usePathWithRedirect', () => {
  it('should return path with redirect query parameter', () => {
    const { result } = renderHook(() => usePathWithRedirect('/target'), {
      wrapper: createWrapper(['/current']),
    });

    expect(result.current).toBeDefined();
    if (typeof result.current === 'string') {
      expect(result.current).toContain('/target');
      expect(result.current).toContain('redirectTo');
    }
  });

  it('should update when location changes', () => {
    const wrapper = createWrapper(['/new-current']);
    const { result, rerender } = renderHook(
      ({ to }) => usePathWithRedirect(to),
      {
        wrapper,
        initialProps: { to: '/target' },
      },
    );

    expect(result.current).toBeDefined();
    if (typeof result.current === 'string') {
      expect(result.current).toContain('/target');
      expect(result.current).toContain('redirectTo');

      rerender({ to: '/other-target' });
      expect(result.current).toContain('/other-target');
      expect(result.current).toContain('redirectTo');
    }
  });
});
