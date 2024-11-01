import { clsx, type ClassValue } from 'clsx';
import { type Config } from 'tailwindcss';
import { extendTailwindMerge } from 'tailwind-merge';
import { extendedTheme } from './tailwind-theme';

export function getErrorMessage(error: unknown) {
  if (typeof error === 'string') return error;
  if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message;
  }
  console.error('Unable to get error message for error', error);
  return 'Unknown Error';
}

function formatColors(input: Config['theme'] = extendedTheme.colors) {
  const colors = [];
  for (const [key, color] of Object.entries(input)) {
    if (typeof color === 'string') {
      colors.push(key);
    } else {
      const colorGroup = Object.keys(color).map((subKey) =>
        subKey === 'DEFAULT' ? '' : subKey
      );
      colors.push({ [key]: colorGroup });
    }
  }
  return colors;
}

const customTwMerge = extendTailwindMerge<string, string>({
  extend: {
    theme: {
      colors: formatColors(),
      borderRadius: Object.keys(extendedTheme.borderRadius),
    },
    classGroups: {
      'font-size': [
        {
          text: Object.keys(extendedTheme.fontSize),
        },
      ],
      animate: [
        {
          animate: Object.keys(extendedTheme.animation),
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}

export function getDomainUrl(request: Request) {
  const host =
    request.headers.get('X-Forwarded-Host') ??
    request.headers.get('host') ??
    new URL(request.url).host;
  const protocol = host.includes('localhost') ? 'http' : 'https';
  return `${protocol}://${host}`;
}

export function getReferrerRoute(request: Request) {
  // spelling errors and whatever makes this annoyingly inconsistent
  // in my own testing, `referer` returned the right value, but 🤷‍♂️
  const referrer =
    request.headers.get('referer') ??
    request.headers.get('referrer') ??
    request.referrer;
  const domain = getDomainUrl(request);
  if (referrer?.startsWith(domain)) {
    return referrer.slice(domain.length);
  } else {
    return '/';
  }
}

/**
 * Provide a condition and if that condition is falsey, this throws an error
 * with the given message.
 *
 * inspired by invariant from 'tiny-invariant' except will still include the
 * message in production.
 *
 * @example
 * invariant(typeof value === 'string', `value must be a string`)
 *
 * @param condition The condition to check
 * @param message The message to throw (or a callback to generate the message)
 * @param responseInit Additional response init options if a response is thrown
 *
 * @throws {Error} if condition is falsey
 */
export function invariant<T>(
  condition: T,
  message: string | (() => string)
): asserts condition {
  if (!condition) {
    throw new Error(typeof message === 'function' ? message() : message);
  }
}

export function callAll<Args extends Array<unknown>>(
  ...fns: Array<((...args: Args) => unknown) | undefined>
) {
  return (...args: Args) => fns.forEach((fn) => fn?.(...args));
}

export const roundToDecimal = (value: number | string, decimalPlaces = 2) => {
  const number = Number(value) || 0;
  return Number(number.toFixed(decimalPlaces));
};

export const roundToTwo = (numb: number) =>
  Math.round((numb + Number.EPSILON) * 100) / 100;

/**
 * Simple debounce implementation
 */
export function debounce<
  Callback extends (...args: Parameters<Callback>) => void
>(fn: Callback, delay: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<Callback>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export async function wait(stallTime = 3000) {
  await new Promise((resolve) => setTimeout(resolve, stallTime));
}

export async function downloadFile(url: string, retries = 0) {
  const MAX_RETRIES = 3;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image with status ${response.status}`);
    }
    const contentType = response.headers.get('content-type') ?? 'image/jpg';
    const blob = Buffer.from(await response.arrayBuffer());
    return { contentType, blob };
  } catch (e) {
    if (retries > MAX_RETRIES) throw e;
    return downloadFile(url, retries + 1);
  }
}

export const highlight = (string: string, sub: string) =>
  sub
    ? string.replace(new RegExp(sub, 'gi'), (match) => `<b>${match}</b>`)
    : string;

export const createMarkup = (content = '') => {
  return {
    __html: `${content ?? ''}`,
  };
};

export const humanize = (message: string) => {
  if (!message) return '';
  message = message.replace(/_/g, ' '); // replaces underscore with space
  message = message.replace(/^[a-z]|[A-Z]/g, function (v, i) {
    return i === 0 ? v : ` ${v.toLowerCase()}`;
  }); // breaks camelCase to two words
  message = `${message.charAt(0).toUpperCase()}${message.slice(1)}`;
  return message.replace(
    /([!?.]\s+)([a-z])/g,
    (m, $1, $2: string) => $1 + $2.toUpperCase()
  );
};

export const substring = (string: string, length: number) => {
  if (string.length <= length) return string;
  let sub = string.slice(0, length + 1);

  if (sub.length < string.length) {
    const fullWordIndex = Math.min(sub.length, sub.lastIndexOf(' '));
    sub = sub.slice(0, fullWordIndex + 1);
  }
  return sub.length < string.length ? `${sub.trim()} ...` : sub;
};

export const stripHTMLTags = (string: string) =>
  string.replace(/<.+?>|[\r\n]/g, ' ').replace(/&nbsp;/g, ' ');

export const emailToUserName = (email: string): string => {
  const [username] = email.split('@');
  if (!username) return email;
  return username;
};

export function getRandom<T>(arr: T[], n: number) {
  let len = arr.length;
  const result: T[] = new Array(n),
    taken = new Array(len);
  if (n > len)
    throw new RangeError('getRandom: more elements taken than available');
  while (n--) {
    const x = Math.floor(Math.random() * len);
    const item = arr[x in taken ? taken[x] : x];
    if (item) {
      result[n] = item;
      taken[x] = --len in taken ? taken[len] : len;
    }
  }
  return result;
}
