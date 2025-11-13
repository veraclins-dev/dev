import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useHover } from './use-hover';

describe('useHover', () => {
  it('should return initial hover state as false', () => {
    const { result } = renderHook(() => useHover());
    expect(result.current.isHovered).toBe(false);
  });

  it('should return hover props with event handlers', () => {
    const { result } = renderHook(() => useHover());
    expect(result.current.hoverProps).toHaveProperty('onMouseEnter');
    expect(result.current.hoverProps).toHaveProperty('onMouseLeave');
  });

  it('should set hover state to true on mouse enter', () => {
    const { result } = renderHook(() => useHover());

    act(() => {
      result.current.hoverProps.onMouseEnter();
    });

    expect(result.current.isHovered).toBe(true);
  });

  it('should set hover state to false on mouse leave', () => {
    const { result } = renderHook(() => useHover());

    act(() => {
      result.current.hoverProps.onMouseEnter();
    });
    expect(result.current.isHovered).toBe(true);

    act(() => {
      result.current.hoverProps.onMouseLeave();
    });
    expect(result.current.isHovered).toBe(false);
  });

  it('should handle multiple enter/leave cycles', () => {
    const { result } = renderHook(() => useHover());

    act(() => {
      result.current.hoverProps.onMouseEnter();
    });
    expect(result.current.isHovered).toBe(true);

    act(() => {
      result.current.hoverProps.onMouseLeave();
    });
    expect(result.current.isHovered).toBe(false);

    act(() => {
      result.current.hoverProps.onMouseEnter();
    });
    expect(result.current.isHovered).toBe(true);
  });
});
