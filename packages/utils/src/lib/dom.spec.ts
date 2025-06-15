import * as dom from './dom';

// @vitest-environment jsdom
describe('dom.closestParent', () => {
  it('should return the closest parent element', () => {
    const el = document.createElement('div');
    el.innerHTML = '<div><span>text</span></div>';
    const span = el.querySelector('span');
    expect(dom.closestParent(span, 'div')).toBe(el.querySelector('div'));
  });

  it('should return null if the parent element is not found', () => {
    const el = document.createElement('div');
    el.innerHTML = '<div><span>text</span></div>';
    const span = el.querySelector('span');
    expect(dom.closestParent(span, 'p')).toBe(null);
  });

  it('should return the body element if the parent element is not found and the fallback is set', () => {
    const el = document.createElement('div');
    el.innerHTML = '<div><span>text</span></div>';
    const span = el.querySelector('span');
    expect(dom.closestParent(span, 'p', true)).toBe(document.body);
  });
});

describe('dom.highlight', () => {
  it('should highlight a substring in a string', () => {
    expect(dom.highlight('Hello World', 'World')).toBe('Hello <b>World</b>');
  });

  it('should highlight all occurrences of the substring in a string', () => {
    expect(dom.highlight('Hello World and World', 'World')).toBe(
      'Hello <b>World</b> and <b>World</b>',
    );
  });

  it('should return the string if the substring is not found', () => {
    expect(dom.highlight('Hello World', 'Universe')).toBe('Hello World');
  });

  it('should highlight a substring in a string case-insensitively', () => {
    expect(dom.highlight('Hello World', 'world')).toBe('Hello <b>World</b>');
  });
});

describe('dom.createMarkup', () => {
  it('should create markup with the given content', () => {
    expect(dom.createMarkup('Hello World')).toEqual({
      __html: 'Hello World',
    });
  });

  it('should create markup with an empty string if no content is provided', () => {
    expect(dom.createMarkup()).toEqual({ __html: '' });
  });
});

describe('dom.stripHTMLTags', () => {
  it('should strip HTML tags from a string', () => {
    expect(dom.stripHTMLTags('<p>Hello World</p>')).toBe('Hello World');
  });

  it('should replace non-breaking spaces with spaces', () => {
    const result = dom.stripHTMLTags('Hello&nbsp;World');
    console.log(result);
    expect(result).toEqual('Hello World');
  });
});
