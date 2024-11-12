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
