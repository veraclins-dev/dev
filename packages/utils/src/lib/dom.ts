export const highlight = (string: string, sub: string) =>
  sub
    ? string.replace(new RegExp(sub, 'gi'), (match) => `<b>${match}</b>`)
    : string;

export const createMarkup = (content = '') => {
  return {
    __html: `${content ?? ''}`,
  };
};

export const stripHTMLTags = (string: string) =>
  string.replace(/<.+?>|[\r\n]/g, ' ').replace(/&nbsp;/g, ' ');

export function closestParent(
  el: HTMLElement | null,
  selector: string,
  fallBack?: true,
): Element;
export function closestParent(
  el: HTMLElement | null,
  selector: string,
  fallBack?: false,
): Element | null;
export function closestParent(
  el: HTMLElement | null,
  selector: string,
  fallBack?: boolean,
): Element | null {
  if (!el) return fallBack ? document.body : null;
  const found = el.closest(selector);

  if (found) return found;

  return fallBack ? document.body : null;
}

export function setReactInputValue(
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
