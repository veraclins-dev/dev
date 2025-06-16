import { parseAcceptLanguage } from 'intl-parse-accept-language';

export function getDateTimeFormat(
  request: Request,
  options?: Intl.DateTimeFormatOptions,
) {
  const locales = parseAcceptLanguage(request.headers.get('accept-language'), {
    validate: Intl.DateTimeFormat.supportedLocalesOf,
  });
  const locale = locales[0] ?? 'en-US';

  // change your default options here
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  options = {
    ...defaultOptions,
    ...options,
    timeZone: options?.timeZone ?? getHints(request).timeZone,
  };
  return new Intl.DateTimeFormat(locale, options);
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

function getHints(request: Request) {
  return {
    timeZone: request.headers.get('x-time-zone') ?? 'UTC',
  };
}
