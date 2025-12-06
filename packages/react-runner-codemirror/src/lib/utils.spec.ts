import { describe, expect, it } from 'vitest';

import { getFilenameFromLanguage } from './utils';

describe('getFilenameFromLanguage', () => {
  it('should return correct filename for tsx', () => {
    expect(getFilenameFromLanguage('tsx')).toBe('file.tsx');
  });

  it('should return correct filename for ts', () => {
    expect(getFilenameFromLanguage('ts')).toBe('file.ts');
  });

  it('should return correct filename for jsx', () => {
    expect(getFilenameFromLanguage('jsx')).toBe('file.jsx');
  });

  it('should return correct filename for js', () => {
    expect(getFilenameFromLanguage('js')).toBe('file.js');
  });

  it('should return correct filename for css', () => {
    expect(getFilenameFromLanguage('css')).toBe('file.css');
  });

  it('should return correct filename for json', () => {
    expect(getFilenameFromLanguage('json')).toBe('file.json');
  });

  it('should return correct filename for html', () => {
    expect(getFilenameFromLanguage('html')).toBe('file.html');
  });

  it('should return correct filename for md', () => {
    expect(getFilenameFromLanguage('md')).toBe('file.md');
  });

  it('should return correct filename for markdown', () => {
    expect(getFilenameFromLanguage('markdown')).toBe('file.md');
  });

  it('should handle case-insensitive language names', () => {
    expect(getFilenameFromLanguage('TSX')).toBe('file.tsx');
    expect(getFilenameFromLanguage('TypeScript')).toBe('file.typescript');
    expect(getFilenameFromLanguage('JavaScript')).toBe('file.javascript');
  });

  it('should return fallback filename for unknown languages', () => {
    expect(getFilenameFromLanguage('python')).toBe('file.python');
    expect(getFilenameFromLanguage('rust')).toBe('file.rust');
    expect(getFilenameFromLanguage('go')).toBe('file.go');
  });

  it('should handle empty string', () => {
    expect(getFilenameFromLanguage('')).toBe('file.');
  });

  it('should handle special characters in language names', () => {
    expect(getFilenameFromLanguage('c++')).toBe('file.c++');
    expect(getFilenameFromLanguage('c#')).toBe('file.c#');
  });
});
