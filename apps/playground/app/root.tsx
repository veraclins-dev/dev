import type { LinksFunction, MetaFunction } from 'react-router';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from 'react-router';

import { initImageConfig } from '@veraclins-dev/image';
import { HoneypotProvider } from '@veraclins-dev/react-utils';
import { honeypot } from '@veraclins-dev/react-utils/server';
import {
  Box,
  IconProvider,
  SidebarProvider,
  SidebarTrigger,
  VeraclinsToaster,
} from '@veraclins-dev/ui';
import sprites from '@veraclins-dev/ui/sprite.svg';

import { type Route } from './+types/root';
import { AppSidebar } from './components/sidebar';
import twStyles from './tailwind.css?url';

export const meta: MetaFunction = () => [{ title: 'New Remix App' }];

const sprite = sprites.replace(
  /\/sprite.svg$/,
  '/sprite.svg?time=' + Date.now(),
);

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
  const data = useRouteLoaderData<typeof loader>('root');
  return (
    <html lang="en" className="darks h-screen w-screen">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-background h-full text-sm text-foreground">
        <div className="overflow-hidden h-full w-full container relative">
          {children}
        </div>

        <script
          dangerouslySetInnerHTML={{
            __html: `
						window.imageConfig = ${JSON.stringify(data?.imageConfig ?? initImageConfig())}
						`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export async function loader() {
  const honeyProps = await honeypot.getInputProps();
  const imageConfig = initImageConfig();
  return { honeyProps, imageConfig };
}

export default function App({ loaderData }: Route.ComponentProps) {
  return (
    <HoneypotProvider {...loaderData.honeyProps}>
      <IconProvider sprite={sprite}>
        <SidebarProvider>
          <AppSidebar />
          <Box component="main" w="full" h="full" flex="1">
            <SidebarTrigger />
            <Box
              display={{ xs: 'flex' }}
              flexDirection="column"
              py={4}
              px={{ xs: 4, sm: 6, md: 8, lg: 10, xl: 12, '2xl': 14 }}
              gap={{ sm: 4 }}
              overflow="auto"
              h="full"
              className="rounded-md"
              pe={{ xs: 4 }}
            >
              <Outlet />
            </Box>
          </Box>
        </SidebarProvider>
        <VeraclinsToaster />
      </IconProvider>
    </HoneypotProvider>
  );
}
