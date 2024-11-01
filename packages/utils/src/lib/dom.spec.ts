import * as dom from './dom';

// @vitest-environment jsdom
describe('utils.closestParent', () => {
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
