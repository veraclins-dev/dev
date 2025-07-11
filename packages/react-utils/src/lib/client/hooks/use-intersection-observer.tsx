'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

/** The hook internal state. */
type State = {
  /** A boolean indicating if the element is intersecting. */
  isIntersecting: boolean;
  /** A boolean indicating if the element is in the middle of the root container. */
  isInTheMiddle: boolean;
  /** The intersection observer entry. */
  entry?: IntersectionObserverEntry;
};

/** Represents the options for configuring the Intersection Observer. */
type UseIntersectionObserverOptions = {
  /**
   * The element that is used as the viewport for checking visibility of the target.
   * @default null
   */
  root?: Element | Document | null;
  /**
   * The element that is used as the viewport for checking visibility of the target.
   * @default null
   */
  rootSelector?: string;
  /**
   * A margin around the root.
   * @default '0%'
   */
  rootMargin?: string;
  /**
   * A threshold indicating the percentage of the target's visibility needed to trigger the callback.
   * @default 0
   */
  threshold?: number | number[];
  /**
   * If true, freezes the intersection state once the element becomes visible.
   * @default false
   */
  freezeOnceVisible?: boolean;
  /**
   * A callback function to be invoked when the intersection state changes.
   * @param {boolean} isIntersecting - A boolean indicating if the element is intersecting.
   * @param {IntersectionObserverEntry} entry - The intersection observer Entry.
   * @default undefined
   */
  onChange?: (
    isIntersecting: boolean,
    entry: IntersectionObserverEntry,
  ) => void;
  /**
   * The initial state of the intersection.
   * @default false
   */
  initialIsIntersecting?: boolean;
};

/**
 * The return type of the useIntersectionObserver hook.
 *
 * Supports both tuple and object destructing.
 * @param {(node: Element | null) => void} ref - The ref callback function.
 * @param {boolean} isIntersecting - A boolean indicating if the element is intersecting.
 * @param {IntersectionObserverEntry | undefined} entry - The intersection observer Entry.
 * @param {boolean} isInTheMiddle - A boolean indicating if the element is in the middle of the root container.
 */
type IntersectionReturn = [
  (node?: Element | null) => void,
  boolean,
  IntersectionObserverEntry | undefined,
  boolean,
] & {
  ref: (node?: Element | null) => void;
  isIntersecting: boolean;
  isInTheMiddle: boolean;
  entry?: IntersectionObserverEntry;
};

/**
 * Custom hook that tracks the intersection of a DOM element with its containing element or the viewport using the [`Intersection Observer API`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).
 * @param {UseIntersectionObserverOptions} options - The options for the Intersection Observer.
 * @returns {IntersectionReturn} The ref callback, a boolean indicating if the element is intersecting, and the intersection observer entry.
 * @example
 * ```tsx
 * // Example 1
 * const [ref, isIntersecting, entry] = useIntersectionObserver({ threshold: 0.5 });
 * ```
 *
 * ```tsx
 * // Example 2
 * const { ref, isIntersecting, entry } = useIntersectionObserver({ threshold: 0.5 });
 * ```
 */
export function useIntersectionObserver({
  threshold = 0,
  root: rootElement = null,
  rootMargin = '0%',
  freezeOnceVisible = false,
  initialIsIntersecting = false,
  onChange,
  rootSelector,
}: UseIntersectionObserverOptions = {}): IntersectionReturn {
  const [ref, setRef] = useState<Element | null>(null);

  const [state, setState] = useState<State>(() => ({
    isIntersecting: initialIsIntersecting,
    isInTheMiddle: false,
    entry: undefined,
  }));

  const callbackRef = useRef<UseIntersectionObserverOptions['onChange']>(
    () => void 0,
  );

  callbackRef.current = onChange;

  const frozen = state.entry?.isIntersecting && freezeOnceVisible;

  useEffect(() => {
    // Ensure we have a ref to observe
    if (!ref) return;
    // Ensure the browser supports the Intersection Observer API
    if (!('IntersectionObserver' in window)) return;

    const root =
      rootElement ||
      (rootSelector ? document.querySelector(rootSelector) : null);

    // Skip if frozen
    if (frozen) return;

    let unobserve: (() => void) | undefined;

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]): void => {
        console.log(entries, 'entries');
        const thresholds = Array.isArray(observer.thresholds)
          ? observer.thresholds
          : [observer.thresholds];
        // console.log({ threshold, thresholds, root });
        const allIntersecting = entries.filter((entry) => entry.isIntersecting);

        console.log(allIntersecting);

        entries.forEach((entry) => {
          const isIntersecting =
            entry.isIntersecting &&
            thresholds.some(
              (threshold) => entry.intersectionRatio >= threshold,
            );

          // Calculate if the element is in the middle of the root container
          let isInTheMiddle = false;
          if (entry.isIntersecting && entry.rootBounds) {
            const rootBounds = entry.rootBounds;
            const targetBounds = entry.boundingClientRect;

            // Calculate the center of the root container
            const rootCenter = rootBounds.top + rootBounds.height / 2;

            // Calculate the center of the target element
            const targetCenter = targetBounds.top + targetBounds.height / 2;

            // Check if the target center is within a small tolerance of the root center
            const tolerance = targetBounds.height / 2; // Half the height of the target element
            isInTheMiddle = Math.abs(targetCenter - rootCenter) <= tolerance;
          }

          setState({ isIntersecting, isInTheMiddle, entry });

          if (callbackRef.current) {
            callbackRef.current(isIntersecting, entry);
          }

          if (isIntersecting && freezeOnceVisible && unobserve) {
            unobserve();
            unobserve = undefined;
          }
        });
      },
      { threshold, root, rootMargin },
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [
    ref,
    threshold,
    rootElement,
    rootSelector,
    rootMargin,
    frozen,
    freezeOnceVisible,
  ]);

  // ensures that if the observed element changes, the intersection observer is reinitialized
  const prevRef = useRef<Element | null>(null);

  useEffect(() => {
    if (
      !ref &&
      state.entry?.target &&
      !freezeOnceVisible &&
      !frozen &&
      prevRef.current !== state.entry.target
    ) {
      prevRef.current = state.entry.target;
      setState({
        isIntersecting: initialIsIntersecting,
        isInTheMiddle: false,
        entry: undefined,
      });
    }
  }, [ref, state.entry, freezeOnceVisible, frozen, initialIsIntersecting]);

  const result = [
    setRef,
    !!state.isIntersecting,
    state.entry,
    state.isInTheMiddle,
  ] as IntersectionReturn;

  // Support object destructuring, by adding the specific values.
  result.ref = result[0];
  result.isIntersecting = result[1];
  result.entry = result[2];
  result.isInTheMiddle = result[3];

  return result;
}
