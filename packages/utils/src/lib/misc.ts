import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function getErrorMessage(error: unknown) {
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

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getDomainUrl(request: Request) {
  const host =
    request.headers.get('X-Forwarded-Host') ??
    request.headers.get('host') ??
    new URL(request.url).host;
  const protocol = host.includes('localhost') ? 'http' : 'https';
  return `${protocol}://${host}`;
}

function getReferrerRoute(request: Request) {
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
function invariant<T>(
  condition: T,
  message: string | (() => string),
): asserts condition {
  if (!condition) {
    throw new Error(typeof message === 'function' ? message() : message);
  }
}

function callAll<Args extends Array<unknown>>(
  ...fns: Array<((...args: Args) => unknown) | undefined>
) {
  return (...args: Args) => fns.forEach((fn) => fn?.(...args));
}

const roundToDecimal = (value: number | string, decimalPlaces = 2) => {
  const number = Number(value) || 0;
  return Number(number.toFixed(decimalPlaces));
};

const roundToTwo = (numb: number) =>
  Math.round((numb + Number.EPSILON) * 100) / 100;

async function wait(stallTime = 3000) {
  await new Promise((resolve) => setTimeout(resolve, stallTime));
}

async function downloadFile(url: string, retries = 0) {
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

function humanize(message: string) {
  if (!message) return '';
  message = message.replace(/_/g, ' '); // replaces underscore with space
  message = message.replace(/([A-Z]+)([A-Z][a-z]+)/g, function (_, $1, $2) {
    return `${$1} ${$2.toLowerCase()}`;
  }); // breaks patterns like JSONData to JSON data
  message = message.replace(
    /([A-Z]?[a-z]+)([A-Z][a-z]+)?([A-Z][a-z]+)?([A-Z]+[a-z]+)?([A-Z]+[a-z]+)|([A-Z]?[a-z]+)([A-Z][a-z]*)/g,
    (_, ...s) => {
      const matches = s.filter(Boolean).filter(isNaN).slice(0, -1);
      return matches.map((v) => v.toLowerCase()).join(' ');
    },
  ); // breaks camelCase and PascalCase to words
  message = `${message.charAt(0).toUpperCase()}${message.slice(1)}`;
  return message.replace(
    /([!?.]\s+)([a-z])/g,
    (_, $1, $2: string) => $1 + $2.toUpperCase(),
  ); // capitalizes the first letter of inner sentences
}

const truncate = (string: string, length: number) => {
  if (string.length <= length) return string;
  let sub = string.slice(0, length + 1);

  if (sub.length < string.length) {
    const fullWordIndex = Math.min(sub.length, sub.lastIndexOf(' '));
    sub = sub.slice(0, fullWordIndex + 1);
  }
  return sub.length < string.length ? `${sub.trim()} ...` : sub;
};

const emailToUserName = (email: string): string => {
  const [username] = email.split('@');
  if (!username) return email;
  return username;
};

function getRandom<T>(arr: T[], n: number) {
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

/**
 * Truncate the middle of the given text, if it's longer than the given length.
 */
function truncateMiddle(text: string, length = 20): string {
  if (text.length <= length) {
    return text;
  }

  const half = Math.floor(length / 2);
  return `${text.slice(0, half).trim()}…${text.slice(-half).trim()}`;
}

function combinePaths(...paths: string[]) {
  return paths
    .map((path) => path.replace(/^\/|\/$/g, ''))
    .filter(Boolean)
    .join('/');
}

/**
 * Extracts initials from a name string.
 * @param name - The name to extract initials from
 * @returns The initials, up to 2 characters
 */
function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
export {
  callAll,
  cn,
  combinePaths,
  downloadFile,
  emailToUserName,
  getDomainUrl,
  getErrorMessage,
  getInitials,
  getRandom,
  getReferrerRoute,
  humanize,
  invariant,
  roundToDecimal,
  roundToTwo,
  truncate,
  truncateMiddle,
  wait,
};
