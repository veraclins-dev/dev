import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useTruncated } from './use-truncated';

// @vitest-environment jsdom
describe('useTruncated', () => {
  beforeEach(() => {
    global.ResizeObserver = class ResizeObserver {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    } as typeof ResizeObserver;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return ref and isTruncated state', () => {
    const { result } = renderHook(() => useTruncated<HTMLDivElement>());
    expect(result.current).toHaveProperty('ref');
    expect(result.current).toHaveProperty('isTruncated');
    expect(result.current.isTruncated).toBe(false);
  });

  it('should return false when content fits', async () => {
    const { result } = renderHook(() => useTruncated<HTMLDivElement>());
    const element = document.createElement('div');
    element.style.width = '200px';
    element.style.overflow = 'hidden';
    element.innerHTML = '<div style="width: 100px;">Content</div>';
    document.body.appendChild(element);

    Object.defineProperty(element, 'scrollWidth', {
      value: 100,
      writable: false,
    });
    Object.defineProperty(element, 'clientWidth', {
      value: 200,
      writable: false,
    });

    act(() => {
      result.current.ref.current = element;
    });

    await waitFor(() => {
      expect(result.current.isTruncated).toBe(false);
    });

    document.body.removeChild(element);
  });

  it('should handle null element', () => {
    const { result } = renderHook(() => useTruncated<HTMLDivElement>());
    expect(() => {
      result.current.ref.current = null;
    }).not.toThrow();
    expect(result.current.isTruncated).toBe(false);
  });
});
