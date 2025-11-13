import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { throttle } from './throttle';

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should throttle function calls', () => {
    const func = vi.fn();
    const throttled = throttle(func, 100);

    throttled();
    throttled();
    throttled();

    expect(func).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(100);
    expect(func).toHaveBeenCalledTimes(2);
  });

  it('should call function immediately on leading edge (default)', () => {
    const func = vi.fn();
    const throttled = throttle(func, 100);

    throttled('first');
    expect(func).toHaveBeenCalledWith('first');
    expect(func).toHaveBeenCalledTimes(1);

    throttled('second');
    vi.advanceTimersByTime(100);
    expect(func).toHaveBeenCalledWith('second');
    expect(func).toHaveBeenCalledTimes(2);
  });

  it('should call function on trailing edge when leading is false', () => {
    const func = vi.fn();
    const throttled = throttle(func, 100, { leading: false });

    throttled('first');
    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(func).toHaveBeenCalledWith('first');
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should not call function on trailing edge when trailing is false', () => {
    const func = vi.fn();
    const throttled = throttle(func, 100, { trailing: false });

    throttled('first');
    expect(func).toHaveBeenCalledWith('first');
    expect(func).toHaveBeenCalledTimes(1);

    throttled('second');
    vi.advanceTimersByTime(100);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should use last arguments when called multiple times', () => {
    const func = vi.fn();
    const throttled = throttle(func, 100);

    throttled('first');
    throttled('second');
    throttled('third');

    expect(func).toHaveBeenCalledWith('first');

    vi.advanceTimersByTime(100);
    expect(func).toHaveBeenLastCalledWith('third');
  });

  it('should support cancel method', () => {
    const func = vi.fn();
    const throttled = throttle(func, 100);

    throttled();
    throttled.cancel();
    vi.advanceTimersByTime(100);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should support flush method', () => {
    const func = vi.fn((x: string) => x.toUpperCase());
    const throttled = throttle(func, 100);

    throttled('hello');
    const result = throttled.flush();

    expect(func).toHaveBeenCalledTimes(1);
    expect(result).toBe('HELLO');
  });

  it('should throttle multiple rapid calls', () => {
    const func = vi.fn();
    const throttled = throttle(func, 100);

    for (let i = 0; i < 10; i++) {
      throttled();
      vi.advanceTimersByTime(10);
    }

    expect(func).toHaveBeenCalledTimes(2);
  });

  it('should handle zero wait time', () => {
    const func = vi.fn();
    const throttled = throttle(func, 0);

    throttled();
    expect(func).toHaveBeenCalled();
  });

  it('should throw error for non-function input', () => {
    expect(() => {
      // @ts-expect-error - testing invalid input
      throttle('not a function', 100);
    }).toThrow('Expected a function');
  });

  it('should maintain this context', () => {
    const obj = {
      value: 42,
      method: function (this: { value: number }) {
        return this.value;
      },
    };

    const throttled = throttle(obj.method.bind(obj), 100);
    const result = throttled();
    vi.advanceTimersByTime(100);

    expect(result).toBe(42);
  });

  it('should handle both leading and trailing edges', () => {
    const func = vi.fn();
    const throttled = throttle(func, 100, { leading: true, trailing: true });

    throttled('first');
    expect(func).toHaveBeenCalledWith('first');
    expect(func).toHaveBeenCalledTimes(1);

    throttled('second');
    vi.advanceTimersByTime(100);
    expect(func).toHaveBeenCalledWith('second');
    expect(func).toHaveBeenCalledTimes(2);
  });
});
