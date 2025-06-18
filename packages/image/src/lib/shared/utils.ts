const badImageBase64 =
  'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

const emptyDataURL = 'data:image/gif;base64,' + badImageBase64;

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

export {
  badImageBase64,
  emptyDataURL,
  normalizePathTrailingSlash,
  parsePath,
  removeTrailingSlash,
};
