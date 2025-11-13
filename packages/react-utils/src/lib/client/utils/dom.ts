import { type RefObject } from 'react';

function setInputValue(
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

function scrollIntoView<T extends Element>(ref: RefObject<T | null>) {
  setTimeout(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, 2);
}

const OFFSET = 10;

function checkOverflow<T extends HTMLElement>(ref: RefObject<T | null>) {
  const el = ref.current;
  if (!el) {
    return false;
  }

  const scrollTop = Math.round(el.scrollTop);
  const height = el.scrollHeight - el.offsetHeight;

  const isOverflowing = height > 0 && scrollTop < height - OFFSET;

  return isOverflowing;
}

const createMarkup = (content = '') => {
  return {
    __html: `${content ?? ''}`,
  };
};

export { checkOverflow, createMarkup, scrollIntoView, setInputValue };
