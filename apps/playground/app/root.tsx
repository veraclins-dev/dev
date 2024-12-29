import type { LinksFunction, MetaFunction } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import { IconProvider } from '@veraclins-dev/ui';
import sprite from '@veraclins-dev/ui/sprite.svg';

import twStyles from './tailwind.css?url';

export const meta: MetaFunction = () => [
  {
    title: 'New Remix App',
  },
];

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: twStyles },
  { rel: 'preload', href: sprite, as: 'image' },

  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-background text-sm text-foreground">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <IconProvider sprite={sprite}>
      <Outlet />
    </IconProvider>
  );
}
