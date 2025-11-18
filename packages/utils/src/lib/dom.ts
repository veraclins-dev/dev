function highlight(string: string, sub: string) {
  return sub
    ? string.replace(new RegExp(sub, 'gi'), (match) => `<b>${match}</b>`)
    : string;
}

function stripHTMLTags(htmlContent: string) {
  // First decode HTML entities
  const text = htmlContent
    .replace(/&nbsp;/g, ' ') // Replace non-breaking spaces with regular spaces
    .replace(/>/g, '> '); // Add space after closing tags

  // Use native DOMParser API in browser, simple regex fallback for Node.js
  if (typeof DOMParser !== 'undefined') {
    // Browser environment - use native DOMParser
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    return doc.body.textContent || doc.body.innerText || '';
  } else {
    // Node.js/SSR environment - use regex fallback
    // This is safe for server-side rendering where we control the input
    return text
      .replace(/<[^>]*>/g, '') // Remove all HTML tags
      .replace(/&[a-z]+;/gi, ' ') // Replace HTML entities with spaces
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
  }
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

export { closestParent, highlight, stripHTMLTags };
