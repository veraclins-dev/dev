import { describe, expect, it } from 'vitest';

import * as scroll from './scroll';

// @vitest-environment jsdom
describe('scroll.getScrollPosition', () => {
  it('should return correct vertical scroll position at top', () => {
    const element = document.createElement('div');
    element.style.height = '100px';
    element.style.width = '100px';
    element.style.overflow = 'auto';
    element.style.position = 'absolute';
    element.style.top = '-1000px';
    const content = document.createElement('div');
    content.style.height = '200px';
    content.style.width = '100px';
    element.appendChild(content);
    document.body.appendChild(element);

    Object.defineProperty(element, 'scrollHeight', {
      value: 200,
      writable: false,
    });
    Object.defineProperty(element, 'clientHeight', {
      value: 100,
      writable: false,
    });
    element.scrollTop = 0;

    const position = scroll.getScrollPosition(element, {
      direction: 'vertical',
    });

    expect(position.top).toBe(false);
    expect(position.bottom).toBe(true);
    expect(position.left).toBe(false);
    expect(position.right).toBe(false);

    document.body.removeChild(element);
  });

  it('should return correct vertical scroll position in middle', () => {
    const element = document.createElement('div');
    element.style.height = '100px';
    element.style.width = '100px';
    element.style.overflow = 'auto';
    element.style.position = 'absolute';
    element.style.top = '-1000px';
    const content = document.createElement('div');
    content.style.height = '200px';
    content.style.width = '100px';
    element.appendChild(content);
    document.body.appendChild(element);

    Object.defineProperty(element, 'scrollHeight', {
      value: 200,
      writable: false,
    });
    Object.defineProperty(element, 'clientHeight', {
      value: 100,
      writable: false,
    });
    element.scrollTop = 50;

    const position = scroll.getScrollPosition(element, {
      direction: 'vertical',
    });

    expect(position.top).toBe(true);
    expect(position.bottom).toBe(true);
    expect(position.left).toBe(false);
    expect(position.right).toBe(false);

    document.body.removeChild(element);
  });

  it('should return correct vertical scroll position at bottom', () => {
    const element = document.createElement('div');
    element.style.height = '100px';
    element.style.overflow = 'auto';
    element.innerHTML = '<div style="height: 200px;">Content</div>';
    document.body.appendChild(element);

    element.scrollTop = 100;

    const position = scroll.getScrollPosition(element, {
      direction: 'vertical',
    });

    expect(position.top).toBe(true);
    expect(position.bottom).toBe(false);
    expect(position.left).toBe(false);
    expect(position.right).toBe(false);

    document.body.removeChild(element);
  });

  it('should return correct horizontal scroll position at left', () => {
    const element = document.createElement('div');
    element.style.width = '100px';
    element.style.height = '100px';
    element.style.overflow = 'auto';
    element.style.position = 'absolute';
    element.style.top = '-1000px';
    const content = document.createElement('div');
    content.style.width = '200px';
    content.style.height = '100px';
    element.appendChild(content);
    document.body.appendChild(element);

    Object.defineProperty(element, 'scrollWidth', {
      value: 200,
      writable: false,
    });
    Object.defineProperty(element, 'clientWidth', {
      value: 100,
      writable: false,
    });
    element.scrollLeft = 0;

    const position = scroll.getScrollPosition(element, {
      direction: 'horizontal',
    });

    expect(position.top).toBe(false);
    expect(position.bottom).toBe(false);
    expect(position.left).toBe(false);
    expect(position.right).toBe(true);

    document.body.removeChild(element);
  });

  it('should return correct horizontal scroll position in middle', () => {
    const element = document.createElement('div');
    element.style.width = '100px';
    element.style.height = '100px';
    element.style.overflow = 'auto';
    element.style.position = 'absolute';
    element.style.top = '-1000px';
    const content = document.createElement('div');
    content.style.width = '200px';
    content.style.height = '100px';
    element.appendChild(content);
    document.body.appendChild(element);

    Object.defineProperty(element, 'scrollWidth', {
      value: 200,
      writable: false,
    });
    Object.defineProperty(element, 'clientWidth', {
      value: 100,
      writable: false,
    });
    element.scrollLeft = 50;

    const position = scroll.getScrollPosition(element, {
      direction: 'horizontal',
    });

    expect(position.top).toBe(false);
    expect(position.bottom).toBe(false);
    expect(position.left).toBe(true);
    expect(position.right).toBe(true);

    document.body.removeChild(element);
  });

  it('should return correct horizontal scroll position at right', () => {
    const element = document.createElement('div');
    element.style.width = '100px';
    element.style.overflow = 'auto';
    element.innerHTML = '<div style="width: 200px;">Content</div>';
    document.body.appendChild(element);

    element.scrollLeft = 100;

    const position = scroll.getScrollPosition(element, {
      direction: 'horizontal',
    });

    expect(position.top).toBe(false);
    expect(position.bottom).toBe(false);
    expect(position.left).toBe(true);
    expect(position.right).toBe(false);

    document.body.removeChild(element);
  });

  it('should return all false when content fits without scrolling', () => {
    const element = document.createElement('div');
    element.style.height = '100px';
    element.style.width = '100px';
    element.style.overflow = 'auto';
    element.innerHTML = '<div style="height: 50px; width: 50px;">Content</div>';
    document.body.appendChild(element);

    const verticalPosition = scroll.getScrollPosition(element, {
      direction: 'vertical',
    });

    expect(verticalPosition.top).toBe(false);
    expect(verticalPosition.bottom).toBe(false);

    const horizontalPosition = scroll.getScrollPosition(element, {
      direction: 'horizontal',
    });

    expect(horizontalPosition.left).toBe(false);
    expect(horizontalPosition.right).toBe(false);

    document.body.removeChild(element);
  });
});
