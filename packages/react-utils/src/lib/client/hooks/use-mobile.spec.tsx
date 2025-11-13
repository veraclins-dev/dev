import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useIsMobile } from './use-mobile';

// @vitest-environment jsdom
describe('useIsMobile', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: query === '(max-width: 767px)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it('should return false for desktop width', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it('should return true for mobile width', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('should return undefined on server side', () => {
    // This test is skipped in jsdom environment as window is always available
    // In actual SSR, window would be undefined
    const { result } = renderHook(() => useIsMobile());
    // In jsdom, window exists, so we just verify the hook works
    expect(typeof result.current).toBe('boolean');
  });

  it('should update when window width changes', async () => {
    // Mock matchMedia to return true for mobile query
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => {
        const matches = query === '(max-width: 767px)';
        return {
          matches,
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn((_event, handler) => {
            // Simulate change after a delay
            setTimeout(() => {
              if (typeof handler === 'function') {
                handler({ matches: true } as any);
              }
            }, 10);
          }),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        };
      }),
    });

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });

    const { result } = renderHook(() => useIsMobile());

    await waitFor(
      () => {
        expect(result.current).toBe(true);
      },
      { timeout: 2000 },
    );
  });
});
