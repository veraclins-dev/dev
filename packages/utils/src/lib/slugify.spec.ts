import { describe, expect, it } from 'vitest';

import * as slugify from './slugify';

describe('slugify.createRandomString', () => {
  it('should generate a string of the specified length', () => {
    const result = slugify.createRandomString(10);
    expect(result.length).toBe(10);
  });

  it('should use default length of 5', () => {
    const result = slugify.createRandomString();
    expect(result.length).toBe(5);
  });

  it('should generate strings with alphanumeric characters', () => {
    const result = slugify.createRandomString(20);
    expect(result).toMatch(/^[0-9a-z]+$/);
  });

  it('should generate different strings on each call', () => {
    const result1 = slugify.createRandomString(10);
    const result2 = slugify.createRandomString(10);
    expect(result1).not.toBe(result2);
  });

  it('should handle zero length', () => {
    const result = slugify.createRandomString(0);
    expect(result.length).toBe(0);
  });
});

describe('slugify.createUriString', () => {
  it('should convert string to lowercase', () => {
    expect(slugify.createUriString('Hello World')).toBe('hello-world');
  });

  it('should replace spaces with dashes', () => {
    expect(slugify.createUriString('hello world')).toBe('hello-world');
  });

  it('should remove invalid characters', () => {
    expect(slugify.createUriString('hello@world#test')).toBe('helloworldtest');
  });

  it('should collapse multiple dashes', () => {
    const result = slugify.createUriString('hello---world');
    expect(result).toMatch(/^hello-?world$/);
  });

  it('should trim dashes from start and end', () => {
    const result = slugify.createUriString('-hello-world-');
    expect(result).toMatch(/^hello-?world$/);
  });

  it('should handle accented characters', () => {
    expect(slugify.createUriString('café')).toBe('cafe');
    expect(slugify.createUriString('naïve')).toBe('naive');
  });

  it('should handle special characters', () => {
    expect(slugify.createUriString('hello.world')).toBe('hello.world');
    expect(slugify.createUriString('hello world!')).toBe('hello-world');
  });

  it('should handle empty string', () => {
    expect(slugify.createUriString('')).toBe('');
  });

  it('should handle string with only special characters', () => {
    expect(slugify.createUriString('@#$%')).toBe('');
  });
});

describe('slugify.slugify', () => {
  it('should create a slug from a string', () => {
    expect(slugify.slugify('Hello World')).toBe('hello-world');
  });

  it('should truncate to default length of 30', () => {
    const longString = 'a'.repeat(50);
    const result = slugify.slugify(longString);
    expect(result.length).toBe(30);
  });

  it('should truncate to specified length', () => {
    const result = slugify.slugify('Hello World', 5);
    expect(result.length).toBe(5);
  });

  it('should handle strings shorter than length', () => {
    expect(slugify.slugify('hello', 10)).toBe('hello');
  });

  it('should trim the result', () => {
    expect(slugify.slugify('  hello world  ')).toBe('hello-world');
  });

  it('should handle special characters', () => {
    expect(slugify.slugify('hello@world#test')).toBe('helloworldtest');
  });
});

describe('slugify.createUniqueSlug', () => {
  it('should create a unique slug with random modifier', () => {
    const result = slugify.createUniqueSlug({ string: 'Hello World' });
    expect(result).toMatch(/^hello-world-[0-9a-z]{5}$/);
  });

  it('should use default length of 35', () => {
    const result = slugify.createUniqueSlug({ string: 'Hello World' });
    expect(result.length).toBeLessThanOrEqual(35);
  });

  it('should use specified length', () => {
    const result = slugify.createUniqueSlug({
      string: 'Hello World',
      length: 20,
    });
    expect(result.length).toBeLessThanOrEqual(20);
  });

  it('should use specified modifier length', () => {
    const result = slugify.createUniqueSlug({
      string: 'Hello World',
      modifierLength: 10,
    });
    const parts = result.split('-');
    expect(parts[parts.length - 1].length).toBe(10);
  });

  it('should generate different slugs for same input', () => {
    const result1 = slugify.createUniqueSlug({ string: 'Hello World' });
    const result2 = slugify.createUniqueSlug({ string: 'Hello World' });
    expect(result1).not.toBe(result2);
  });

  it('should handle long strings', () => {
    const longString = 'a'.repeat(100);
    const result = slugify.createUniqueSlug({ string: longString });
    expect(result.length).toBeLessThanOrEqual(36);
  });
});

describe('slugify.createUniqueString', () => {
  it('should create unique string with modifier appended by default', () => {
    const result = slugify.createUniqueString('Hello World');
    expect(result).toMatch(/^hello-world-[0-9a-z]{5}$/);
  });

  it('should create unique string with modifier prepended when specified', () => {
    const result = slugify.createUniqueString('Hello World', true);
    expect(result).toMatch(/^[0-9a-z]{5}-hello-world$/);
  });

  it('should generate different strings for same input', () => {
    const result1 = slugify.createUniqueString('Hello World');
    const result2 = slugify.createUniqueString('Hello World');
    expect(result1).not.toBe(result2);
  });

  it('should handle special characters', () => {
    const result = slugify.createUniqueString('Hello@World#Test');
    expect(result).toMatch(/^helloworldtest-[0-9a-z]{5}$/);
  });

  it('should handle empty string', () => {
    const result = slugify.createUniqueString('');
    expect(result).toMatch(/^-[0-9a-z]{5}$/);
  });
});
