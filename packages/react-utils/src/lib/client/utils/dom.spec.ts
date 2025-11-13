import { createRef } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  checkOverflow,
  createMarkup,
  scrollIntoView,
  setInputValue,
} from './dom';

// @vitest-environment jsdom
describe('dom utilities', () => {
  describe('setInputValue', () => {
    it('should set value on input element', () => {
      const input = document.createElement('input');
      setInputValue(input, 'test value');
      expect(input.value).toBe('test value');
    });

    it('should set value on textarea element', () => {
      const textarea = document.createElement('textarea');
      setInputValue(textarea, 'test value');
      expect(textarea.value).toBe('test value');
    });

    it('should dispatch change event', () => {
      const input = document.createElement('input');
      const changeHandler = vi.fn();
      input.addEventListener('change', changeHandler);
      setInputValue(input, 'test value');
      expect(changeHandler).toHaveBeenCalledTimes(1);
    });

    it('should handle null element', () => {
      expect(() => setInputValue(null, 'test value')).not.toThrow();
    });
  });

  describe('scrollIntoView', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.restoreAllMocks();
      vi.useRealTimers();
    });

    it('should scroll element into view', () => {
      const element = document.createElement('div');
      element.scrollIntoView = vi.fn();
      document.body.appendChild(element);
      const ref = createRef<HTMLDivElement>();
      ref.current = element;

      scrollIntoView(ref);

      vi.advanceTimersByTime(2);
      expect(element.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
      });

      document.body.removeChild(element);
    });

    it('should handle null ref', () => {
      const ref = createRef<HTMLDivElement>();
      expect(() => scrollIntoView(ref)).not.toThrow();
    });
  });

  describe('checkOverflow', () => {
    it('should return false when element is null', () => {
      const ref = createRef<HTMLDivElement>();
      expect(checkOverflow(ref)).toBe(false);
    });

    it('should return false when content fits', () => {
      const element = document.createElement('div');
      element.style.height = '100px';
      element.style.overflow = 'auto';
      element.innerHTML = '<div style="height: 50px;">Content</div>';
      document.body.appendChild(element);

      Object.defineProperty(element, 'scrollHeight', {
        value: 50,
        writable: false,
      });
      Object.defineProperty(element, 'offsetHeight', {
        value: 100,
        writable: false,
      });
      element.scrollTop = 0;

      const ref = createRef<HTMLDivElement>();
      ref.current = element;

      expect(checkOverflow(ref)).toBe(false);

      document.body.removeChild(element);
    });

    it('should return true when content overflows', () => {
      const element = document.createElement('div');
      element.style.height = '100px';
      element.style.overflow = 'auto';
      element.innerHTML = '<div style="height: 200px;">Content</div>';
      document.body.appendChild(element);

      Object.defineProperty(element, 'scrollHeight', {
        value: 200,
        writable: false,
      });
      Object.defineProperty(element, 'offsetHeight', {
        value: 100,
        writable: false,
      });
      element.scrollTop = 0;

      const ref = createRef<HTMLDivElement>();
      ref.current = element;

      expect(checkOverflow(ref)).toBe(true);

      document.body.removeChild(element);
    });

    it('should return false when scrolled to bottom', () => {
      const element = document.createElement('div');
      element.style.height = '100px';
      element.style.overflow = 'auto';
      element.innerHTML = '<div style="height: 200px;">Content</div>';
      document.body.appendChild(element);

      Object.defineProperty(element, 'scrollHeight', {
        value: 200,
        writable: false,
      });
      Object.defineProperty(element, 'offsetHeight', {
        value: 100,
        writable: false,
      });
      element.scrollTop = 100;

      const ref = createRef<HTMLDivElement>();
      ref.current = element;

      expect(checkOverflow(ref)).toBe(false);

      document.body.removeChild(element);
    });
  });

  describe('createMarkup', () => {
    it('should create markup object with __html property', () => {
      const result = createMarkup('test content');
      expect(result).toEqual({ __html: 'test content' });
    });

    it('should handle empty string', () => {
      const result = createMarkup('');
      expect(result).toEqual({ __html: '' });
    });

    it('should handle undefined', () => {
      const result = createMarkup(undefined as unknown as string);
      expect(result).toEqual({ __html: '' });
    });

    it('should handle null', () => {
      const result = createMarkup(null as unknown as string);
      expect(result).toEqual({ __html: '' });
    });
  });
});
