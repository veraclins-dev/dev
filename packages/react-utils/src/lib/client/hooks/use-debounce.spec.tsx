import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useDebounce } from './use-debounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should debounce function calls', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebounce(callback, 100));

    result.current('arg1');
    result.current('arg2');
    result.current('arg3');

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('arg3');
  });

  it('should use default delay of 400ms', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebounce(callback));

    result.current('test');
    vi.advanceTimersByTime(399);
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should update callback when it changes', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();
    const { result, rerender } = renderHook(
      ({ callback }) => useDebounce(callback, 100),
      { initialProps: { callback: callback1 } },
    );

    result.current('test1');
    rerender({ callback: callback2 });
    result.current('test2');

    vi.advanceTimersByTime(100);

    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).toHaveBeenCalledWith('test2');
  });

  it('should update delay when it changes', () => {
    const callback = vi.fn();
    const { result, rerender } = renderHook(
      ({ delay }) => useDebounce(callback, delay),
      { initialProps: { delay: 100 } },
    );

    result.current('test');
    rerender({ delay: 200 });
    result.current('test2');

    vi.advanceTimersByTime(100);
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(callback).toHaveBeenCalledWith('test2');
  });

  it('should support cancel method', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebounce(callback, 100));

    result.current('test');
    result.current.cancel();
    vi.advanceTimersByTime(100);

    expect(callback).not.toHaveBeenCalled();
  });

  it('should cancel previous calls when delay changes', () => {
    const callback = vi.fn();
    const { result, rerender } = renderHook(
      ({ delay }) => useDebounce(callback, delay),
      { initialProps: { delay: 100 } },
    );

    result.current('test1');
    rerender({ delay: 200 });
    result.current('test2');

    vi.advanceTimersByTime(100);
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(callback).toHaveBeenCalledWith('test2');
  });
});
