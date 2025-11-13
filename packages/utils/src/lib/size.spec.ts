import { describe, expect, it } from 'vitest';

import * as size from './size';

describe('size.getSize', () => {
  it('should return dimensions for a square size', () => {
    const result = size.getSize(10);
    expect(result).toEqual({ width: 40, height: 40 });
  });

  it('should return dimensions for a rectangular size', () => {
    const result = size.getSize({ w: 10, h: 20 });
    expect(result).toEqual({ width: 40, height: 80 });
  });

  it('should return maximum dimensions for responsive sizes', () => {
    const result = size.getSize({
      xs: 4,
      sm: 10,
      md: 16,
      lg: 20,
    });
    expect(result).toEqual({ width: 80, height: 80 });
  });

  it('should return maximum dimensions for responsive rectangular sizes', () => {
    const result = size.getSize({
      xs: { w: 4, h: 10 },
      sm: { w: 10, h: 20 },
      md: { w: 16, h: 32 },
    });
    expect(result).toEqual({ width: 64, height: 128 });
  });

  it('should handle zero size', () => {
    const result = size.getSize(0);
    expect(result).toEqual({ width: 0, height: 0 });
  });
});

describe('size.getSizeClasses', () => {
  it('should generate classes for a square size', () => {
    const result = size.getSizeClasses(10);
    expect(result).toContain('size-10');
    expect(result).toContain('min-w-10');
    expect(result).toContain('min-h-10');
  });

  it('should generate classes for a rectangular size', () => {
    const result = size.getSizeClasses({ w: 10, h: 20 });
    expect(result).toContain('w-10');
    expect(result).toContain('h-20');
    expect(result).toContain('min-w-10');
    expect(result).toContain('min-h-20');
  });

  it('should generate responsive classes', () => {
    const result = size.getSizeClasses({
      xs: 4,
      sm: 10,
      md: 16,
    });
    expect(result).toContain('size-4');
    expect(result).toContain('sm:size-10');
    expect(result).toContain('md:size-16');
  });

  it('should generate responsive classes for rectangular sizes', () => {
    const result = size.getSizeClasses({
      xs: { w: 5, h: 10 },
      sm: { w: 10, h: 20 },
    });
    expect(result).toContain('w-5');
    expect(result).toContain('h-10');
    expect(result).toContain('sm:w-10');
    expect(result).toContain('sm:h-20');
  });

  it('should use max option when provided', () => {
    const result = size.getSizeClasses(10, 'max');
    expect(result).toContain('max-w-10');
    expect(result).toContain('max-h-10');
  });

  it('should use min option by default', () => {
    const result = size.getSizeClasses(10);
    expect(result).toContain('min-w-10');
    expect(result).toContain('min-h-10');
  });
});

describe('size.sizeScale', () => {
  it('should contain expected size values', () => {
    expect(size.sizeScale).toContain(0);
    expect(size.sizeScale).toContain(1);
    expect(size.sizeScale).toContain(10);
    expect(size.sizeScale).toContain(96);
  });

  it('should be a readonly array', () => {
    expect(Array.isArray(size.sizeScale)).toBe(true);
  });
});

describe('size.breakpoints', () => {
  it('should contain all expected breakpoints', () => {
    expect(size.breakpoints).toContain('xs');
    expect(size.breakpoints).toContain('sm');
    expect(size.breakpoints).toContain('md');
    expect(size.breakpoints).toContain('lg');
    expect(size.breakpoints).toContain('xl');
    expect(size.breakpoints).toContain('2xl');
  });

  it('should have breakpoints in correct order', () => {
    expect(size.breakpoints).toEqual(['xs', 'sm', 'md', 'lg', 'xl', '2xl']);
  });
});
