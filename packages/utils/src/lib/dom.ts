import sanitizeHtml from 'sanitize-html';

function highlight(string: string, sub: string) {
  return sub
    ? string.replace(new RegExp(sub, 'gi'), (match) => `<b>${match}</b>`)
    : string;
}

function createMarkup(content = '') {
  return {
    __html: `${content ?? ''}`,
  };
}

function stripHTMLTags(htmlContent: string) {
  // First decode HTML entities
  const text = htmlContent
    .replace(/&nbsp;/g, ' ') // Replace non-breaking spaces with regular spaces
    .replace(/>/g, '> '); // Add space after closing tags

  return sanitizeHtml(text, {
    allowedTags: [], // No tags allowed, strips all HTML
    allowedAttributes: {}, // No attributes allowed
  }).trim();
}

function closestParent(
  el: HTMLElement | null,
  selector: string,
  fallBack?: true,
): Element;
function closestParent(
  el: HTMLElement | null,
  selector: string,
  fallBack?: false,
): Element | null;
function closestParent(
  el: HTMLElement | null,
  selector: string,
  fallBack?: boolean,
): Element | null {
  if (!el) return fallBack ? document.body : null;
  const found = el.closest(selector);

  if (found) return found;

  return fallBack ? document.body : null;
}

function setReactInputValue(
  element: HTMLInputElement | HTMLTextAreaElement | null,
  value: string,
) {
  if (!element) return;
  const { set: valueSetter } =
    Object.getOwnPropertyDescriptor(element, 'value') || {};
  const prototype = Object.getPrototypeOf(element);
  const { set: prototypeValueSetter } =
    Object.getOwnPropertyDescriptor(prototype, 'value') || {};

  if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
    prototypeValueSetter.call(element, value);
  } else if (valueSetter) {
    valueSetter.call(element, value);
  } else {
    throw new Error('The given element does not have a value setter');
  }
  element.dispatchEvent(new Event('change', { bubbles: true }));
}

export {
  closestParent,
  createMarkup,
  highlight,
  setReactInputValue,
  stripHTMLTags,
};
