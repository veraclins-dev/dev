import { type ImageProps, type StaticImageData } from '../../shared';
import { type OnLoadingComplete } from '../types';

const emptyDataURL =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
const loadedImageURLs = new Set<string>();

/**
 * Given a path this function will find the pathname, query and hash and return
 * them. This is useful to parse full paths on the client side.
 * @param path A path to parse e.g. /foo/bar?id=1#hash
 */
function parsePath(path: string) {
  const hashIndex = path.indexOf('#');
  const queryIndex = path.indexOf('?');

  if (queryIndex > -1 || hashIndex > -1) {
    return {
      pathname: path.substring(0, queryIndex > -1 ? queryIndex : hashIndex),
      query:
        queryIndex > -1
          ? path.substring(queryIndex, hashIndex > -1 ? hashIndex : undefined)
          : '',
      hash: hashIndex > -1 ? path.slice(hashIndex) : '',
    };
  }

  return { pathname: path, query: '', hash: '' };
}

/**
 * Removes the trailing slash for a given route or page path. Preserves the
 * root page. Examples:
 *   - `/foo/bar/` -> `/foo/bar`
 *   - `/foo/bar` -> `/foo/bar`
 *   - `/` -> `/`
 */
function removeTrailingSlash(route: string) {
  return route.replace(/\/$/, '') || '/';
}

/**
 * Normalizes the trailing slash of a path according to the `trailingSlash` option
 * in `next.config.js`.
 */
const normalizePathTrailingSlash = (path: string) => {
  if (!path.startsWith('/')) {
    return path;
  }

  const { pathname, query, hash } = parsePath(path);
  if (/\.[^/]+\/?$/.test(pathname)) {
    return `${removeTrailingSlash(pathname)}${query}${hash}`;
  } else if (pathname.endsWith('/')) {
    return `${pathname}${query}${hash}`;
  } else {
    return `${pathname}/${query}${hash}`;
  }
};

const cancelIdleCallback =
  (typeof self !== 'undefined' &&
    self.cancelIdleCallback &&
    self.cancelIdleCallback.bind(window)) ||
  function (id: number) {
    return clearTimeout(id);
  };

const requestIdleCallback =
  (typeof self !== 'undefined' &&
    self.requestIdleCallback &&
    self.requestIdleCallback.bind(window)) ||
  function (cb: IdleRequestCallback): number {
    const start = Date.now();
    return setTimeout(function () {
      cb({
        didTimeout: false,
        timeRemaining: function () {
          return Math.max(0, 50 - (Date.now() - start));
        },
      });
    }, 1) as unknown as number;
  };

function isStaticRequire(
  src: StaticImageData | { default: StaticImageData },
): src is { default: StaticImageData } {
  return (src as { default: StaticImageData }).default !== undefined;
}

function isStaticImageData(
  src: StaticImageData | { default: StaticImageData },
): src is StaticImageData {
  return (src as StaticImageData).src !== undefined;
}

function isStaticImport(
  src: string | StaticImageData | { default: StaticImageData },
): src is StaticImageData | { default: StaticImageData } {
  return (
    typeof src === 'object' &&
    (isStaticRequire(src as StaticImageData | { default: StaticImageData }) ||
      isStaticImageData(src as StaticImageData | { default: StaticImageData }))
  );
}

function handleLoading(
  img: HTMLImageElement & { 'data-loaded-src'?: string },
  src: string,
  layout: ImageProps['layout'],
  placeholder: string,
  onLoadingCompleteRef: React.RefObject<OnLoadingComplete | undefined>,
  setBlurComplete: (b: boolean) => void,
) {
  if (!img || img.src === emptyDataURL || img['data-loaded-src'] === src) {
    return;
  }
  img['data-loaded-src'] = src;
  const p = 'decode' in img ? img.decode() : Promise.resolve();
  p.then(() => {
    if (!img.parentNode) {
      // Exit early in case of race condition:
      // - onload() is called
      // - decode() is called but incomplete
      // - unmount is called
      // - decode() completes
      return;
    }
    loadedImageURLs.add(src);
    if (placeholder === 'blur') {
      setBlurComplete(true);
    }
    if (onLoadingCompleteRef?.current) {
      const { naturalWidth, naturalHeight } = img;
      onLoadingCompleteRef.current({ naturalWidth, naturalHeight });
    }
    if (process.env.NODE_ENV !== 'production') {
      if (img.parentElement?.parentElement) {
        const parent = getComputedStyle(img.parentElement.parentElement);
        if (!parent.position) {
          // The parent has not been rendered to the dom yet and therefore it has no position. Skip the warnings for such cases.
        } else if (layout === 'responsive' && parent.display === 'flex') {
          console.warn(
            `Image with src "${src}" may not render properly as a child of a flex container. Consider wrapping the image with a div to configure the width.`,
          );
        } else if (
          layout === 'fill' &&
          parent.position !== 'relative' &&
          parent.position !== 'fixed' &&
          parent.position !== 'absolute'
        ) {
          console.warn(
            `Image with src "${src}" may not render properly with a parent using position:"${parent.position}". Consider changing the parent style to position:"relative" with a width and height.`,
          );
        }
      }
    }
  }).catch((e) => {
    console.error('Failed to decode image:', e);
  });
}

export {
  cancelIdleCallback,
  emptyDataURL,
  handleLoading,
  isStaticImageData,
  isStaticImport,
  isStaticRequire,
  loadedImageURLs,
  normalizePathTrailingSlash,
  parsePath,
  removeTrailingSlash,
  requestIdleCallback,
};
