import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getResponsiveValues, useBreakpoint } from './use-breakpoint';

// @vitest-environment jsdom
describe('useBreakpoint', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
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

  it('should return default breakpoint when no matches', () => {
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current).toBe('xl');
  });

  it('should return xs breakpoint when xs query matches', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: query === '(max-width: 639px)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    const { result } = renderHook(() => useBreakpoint());
    expect(result.current).toBe('xs');
  });

  it('should return sm breakpoint when sm query matches', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: query === '(min-width: 640px) and (max-width: 767px)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    const { result } = renderHook(() => useBreakpoint());
    expect(result.current).toBe('sm');
  });
});

describe('getResponsiveValues', () => {
  it('should calculate responsive values for all breakpoints', () => {
    const baseValue = 10;
    const ratios = {
      xs: 0.5,
      sm: 0.75,
      md: 1,
      lg: 1.25,
      xl: 1.5,
      '2xl': 2,
    };

    const result = getResponsiveValues(baseValue, ratios);

    expect(result).toEqual({
      xs: 5,
      sm: 7.5,
      md: 10,
      lg: 12.5,
      xl: 15,
      '2xl': 20,
    });
  });

  it('should handle zero base value', () => {
    const baseValue = 0;
    const ratios = {
      xs: 1,
      sm: 1,
      md: 1,
      lg: 1,
      xl: 1,
      '2xl': 1,
    };

    const result = getResponsiveValues(baseValue, ratios);

    expect(result).toEqual({
      xs: 0,
      sm: 0,
      md: 0,
      lg: 0,
      xl: 0,
      '2xl': 0,
    });
  });

  it('should handle negative ratios', () => {
    const baseValue = 10;
    const ratios = {
      xs: -0.5,
      sm: -0.75,
      md: -1,
      lg: -1.25,
      xl: -1.5,
      '2xl': -2,
    };

    const result = getResponsiveValues(baseValue, ratios);

    expect(result).toEqual({
      xs: -5,
      sm: -7.5,
      md: -10,
      lg: -12.5,
      xl: -15,
      '2xl': -20,
    });
  });
});
