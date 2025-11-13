import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { debounce } from './debounce';

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should debounce function calls', () => {
    const func = vi.fn();
    const debounced = debounce(func, 100);

    debounced();
    debounced();
    debounced();

    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should call function after wait time', () => {
    const func = vi.fn();
    const debounced = debounce(func, 100);

    debounced();
    vi.advanceTimersByTime(50);
    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should reset timer on subsequent calls', () => {
    const func = vi.fn();
    const debounced = debounce(func, 100);

    debounced();
    vi.advanceTimersByTime(50);
    debounced();
    vi.advanceTimersByTime(50);
    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should pass arguments to debounced function', () => {
    const func = vi.fn();
    const debounced = debounce(func, 100);

    debounced('arg1', 'arg2');
    vi.advanceTimersByTime(100);

    expect(func).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('should use last arguments when called multiple times', () => {
    const func = vi.fn();
    const debounced = debounce(func, 100);

    debounced('first');
    debounced('second');
    debounced('third');
    vi.advanceTimersByTime(100);

    expect(func).toHaveBeenCalledWith('third');
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should support leading edge invocation', () => {
    const func = vi.fn();
    const debounced = debounce(func, 100, { leading: true });

    debounced('first');
    expect(func).toHaveBeenCalledWith('first');
    expect(func).toHaveBeenCalledTimes(1);

    debounced('second');
    vi.advanceTimersByTime(100);
    expect(func).toHaveBeenCalledTimes(2);
    expect(func).toHaveBeenLastCalledWith('second');
  });

  it('should support trailing edge invocation (default)', () => {
    const func = vi.fn();
    const debounced = debounce(func, 100, { trailing: true });

    debounced('first');
    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(func).toHaveBeenCalledWith('first');
  });

  it('should support maxWait option', () => {
    const func = vi.fn();
    const debounced = debounce(func, 100, { maxWait: 200 });

    debounced();
    vi.advanceTimersByTime(50);
    debounced();
    vi.advanceTimersByTime(50);
    debounced();
    vi.advanceTimersByTime(50);
    debounced();
    vi.advanceTimersByTime(50);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should support cancel method', () => {
    const func = vi.fn();
    const debounced = debounce(func, 100);

    debounced();
    debounced.cancel();
    vi.advanceTimersByTime(100);

    expect(func).not.toHaveBeenCalled();
  });

  it('should support flush method', () => {
    const func = vi.fn((x: string) => x.toUpperCase());
    const debounced = debounce(func, 100);

    debounced('hello');
    const result = debounced.flush();

    expect(func).toHaveBeenCalledWith('hello');
    expect(result).toBe('HELLO');
  });

  it('should return last result when flushed without pending call', () => {
    const func = vi.fn((x: string) => x.toUpperCase());
    const debounced = debounce(func, 100);

    debounced('hello');
    vi.advanceTimersByTime(100);
    const result = debounced.flush();

    expect(result).toBe('HELLO');
  });

  it('should throw error for non-function input', () => {
    expect(() => {
      // @ts-expect-error - testing invalid input
      debounce('not a function', 100);
    }).toThrow('Expected a function');
  });

  it('should handle zero wait time', () => {
    const func = vi.fn();
    const debounced = debounce(func, 0);

    debounced();
    vi.advanceTimersByTime(0);

    expect(func).toHaveBeenCalled();
  });

  it('should maintain this context', () => {
    const obj = {
      value: 42,
      method: function (this: { value: number }) {
        return this.value;
      },
    };

    const debounced = debounce(obj.method.bind(obj), 100);
    debounced();
    vi.advanceTimersByTime(100);

    const result = debounced();
    vi.advanceTimersByTime(100);

    expect(result).toBe(42);
  });
});
