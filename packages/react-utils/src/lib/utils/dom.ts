import { type RefObject } from 'react';

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

export function scrollIntoView<T extends Element>(ref: RefObject<T | null>) {
  setTimeout(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, 2);
}

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

const OFFSET = 10;

export function checkOverflow<T extends HTMLElement>(ref: RefObject<T | null>) {
  const el = ref.current;
  if (!el) {
    return false;
  }

  const scrollTop = Math.round(el.scrollTop);
  const height = el.scrollHeight - el.offsetHeight;

  const isOverflowing = height > 0 && scrollTop < height - OFFSET;

  return isOverflowing;
}
