import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useDoubleCheck } from './use-double-check';

describe('useDoubleCheck', () => {
  it('should return initial doubleCheck state as false', () => {
    const { result } = renderHook(() => useDoubleCheck());
    expect(result.current.doubleCheck).toBe(false);
  });

  it('should return getButtonProps function', () => {
    const { result } = renderHook(() => useDoubleCheck());
    expect(typeof result.current.getButtonProps).toBe('function');
  });

  it('should set doubleCheck to true on first click', () => {
    const { result } = renderHook(() => useDoubleCheck());
    const props = result.current.getButtonProps();

    act(() => {
      props.onClick?.({ preventDefault: vi.fn() } as any);
    });

    expect(result.current.doubleCheck).toBe(true);
  });

  it('should prevent default on first click', () => {
    const { result } = renderHook(() => useDoubleCheck());
    const props = result.current.getButtonProps();
    const preventDefault = vi.fn();

    act(() => {
      props.onClick?.({ preventDefault } as any);
    });

    expect(preventDefault).toHaveBeenCalledTimes(1);
  });

  it('should reset doubleCheck on blur', () => {
    const { result } = renderHook(() => useDoubleCheck());
    const props = result.current.getButtonProps();

    act(() => {
      props.onClick?.({ preventDefault: vi.fn() } as any);
    });
    expect(result.current.doubleCheck).toBe(true);

    act(() => {
      props.onBlur?.({} as any);
    });
    expect(result.current.doubleCheck).toBe(false);
  });

  it('should reset doubleCheck on Escape key', () => {
    const { result } = renderHook(() => useDoubleCheck());
    const props = result.current.getButtonProps();

    act(() => {
      props.onClick?.({ preventDefault: vi.fn() } as any);
    });
    expect(result.current.doubleCheck).toBe(true);

    act(() => {
      props.onKeyUp?.({ key: 'Escape' } as any);
    });
    expect(result.current.doubleCheck).toBe(false);
  });

  it('should not reset doubleCheck on other keys', () => {
    const { result } = renderHook(() => useDoubleCheck());
    const props = result.current.getButtonProps();

    act(() => {
      props.onClick?.({ preventDefault: vi.fn() } as any);
    });
    expect(result.current.doubleCheck).toBe(true);

    act(() => {
      props.onKeyUp?.({ key: 'Enter' } as any);
    });
    expect(result.current.doubleCheck).toBe(true);
  });

  it('should merge with existing props', () => {
    const { result } = renderHook(() => useDoubleCheck());
    const existingOnClick = vi.fn();
    const existingOnBlur = vi.fn();
    const props = result.current.getButtonProps({
      onClick: existingOnClick,
      onBlur: existingOnBlur,
    });

    act(() => {
      props.onClick?.({ preventDefault: vi.fn() } as any);
    });

    expect(existingOnClick).toHaveBeenCalledTimes(1);
    expect(result.current.doubleCheck).toBe(true);

    act(() => {
      props.onBlur?.({} as any);
    });

    expect(existingOnBlur).toHaveBeenCalledTimes(1);
    expect(result.current.doubleCheck).toBe(false);
  });
});
