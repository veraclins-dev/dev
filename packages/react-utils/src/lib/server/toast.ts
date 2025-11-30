import {
  createCookieSessionStorage,
  data as dataResponse,
  redirect,
} from 'react-router';

import { type ToastInput, toastKey, ToastSchema } from '../client/toast';

import { combineHeaders } from './http';

// Get secrets from environment variable, with fallback for development
// In production, SESSION_SECRET should always be set
const getSecrets = (): string[] => {
  const envSecret = process.env.SESSION_SECRET;
  if (envSecret) {
    return envSecret.split(',');
  }
  // Development fallback - should be overridden in production
  if (process.env.NODE_ENV === 'production') {
    console.warn(
      'SESSION_SECRET is not set. Toast cookies will not be signed. Please set SESSION_SECRET in production.',
    );
    return [];
  }
  // Development fallback - use a default secret (not secure, but prevents warning)
  return ['dev-toast-secret-change-in-production'];
};

export const toastSessionStorage = createCookieSessionStorage({
  cookie: {
    name: 'en_toast',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: getSecrets(),
    secure: process.env.NODE_ENV === 'production',
  },
});

export async function redirectWithToast(
  url: string,
  toast: ToastInput,
  init?: ResponseInit,
) {
  return redirect(url, {
    ...init,
    headers: combineHeaders(init?.headers, await createToastHeaders(toast)),
  });
}

export async function jsonWithToast<
  T extends object = Record<string, unknown>,
>({ data, toast, init }: { data?: T; toast: ToastInput; init?: ResponseInit }) {
  return dataResponse(data, {
    ...init,
    headers: combineHeaders(init?.headers, await createToastHeaders(toast)),
  });
}

export async function createToastHeaders(toastInput: ToastInput) {
  const session = await toastSessionStorage.getSession();
  const toast = ToastSchema.parse(toastInput);
  session.flash(toastKey, toast);
  const cookie = await toastSessionStorage.commitSession(session);
  return new Headers({ 'set-cookie': cookie });
}

export async function getToast(request: Request) {
  const session = await toastSessionStorage.getSession(
    request.headers.get('cookie'),
  );
  const result = ToastSchema.safeParse(session.get(toastKey));
  const toast = result.success ? result.data : null;
  return {
    toast,
    headers: toast
      ? new Headers({
          'set-cookie': await toastSessionStorage.destroySession(session),
        })
      : null,
  };
}
