import {
	data,
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from 'react-router';

import { HoneypotProvider } from '@veraclins-dev/form'
import { honeypot } from '@veraclins-dev/form/server'
import { EpicToaster, useNonce, useToast } from '@veraclins-dev/react-utils'
import {
	combineHeaders,
	getToast,
	pipeHeaders,
} from '@veraclins-dev/react-utils/server'
import { IconProvider } from '@veraclins-dev/ui'
import href from '@veraclins-dev/ui/sprite.svg'
import { cn, getDomainUrl } from '@veraclins-dev/utils'

import { type Route } from './+types/root'
import { CatchError } from './components/catch-error';
import { Confetti } from './components/confetti';
import { Layout } from './components/layouts/main';
import { EpicProgress } from './components/progress-bar';
import { useTheme } from './hooks/use-theme';
import tailwindStylesheetUrl from './styles/tailwind.css?url';
import { userContext } from './utils/auth/context.server';
import { authMiddleware } from './utils/auth/middleware.server';
import { ClientHintCheck, getHints } from './utils/client-hints';
import { getConfetti } from './utils/confetti.server';
import { getEnv } from './utils/env.server';
import { getPageTitle } from './utils/misc';
import { getTheme,type Theme } from './utils/theme.server';
import { makeTimings } from './utils/timing.server';

export const middleware: Route.MiddlewareFunction[] = [authMiddleware]

export const links: Route.LinksFunction = () => {
	return [
		{ rel: 'preload', href, as: 'image' },
		{ rel: 'preload', href: tailwindStylesheetUrl, as: 'style' },
		{
			rel: 'icon',
			type: 'image/svg+xml',
			href: '/logo-square.svg',
		},
		{
			rel: 'apple-touch-icon',
			sizes: '180x180',
			href: '/favicons/apple-touch-icon.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '32x32',
			href: '/favicons/favicon-32x32.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '16x16',
			href: '/favicons/favicon-16x16.png',
		},
		{ rel: 'manifest', href: '/site.webmanifest' },
		{ rel: 'icon', href: '/favicon.ico' },
		{
			rel: 'manifest',
			href: '/site.webmanifest',
			crossOrigin: 'use-credentials',
		} as const,
		{ rel: 'stylesheet', href: tailwindStylesheetUrl },
	].filter(Boolean)
}

export const meta: Route.MetaFunction = ({ data }) => {
	const appName = data?.ENV?.APP_NAME ?? 'App'
	return [
		{ title: data ? getPageTitle('Home') : getPageTitle('Error') },
		{ name: 'description', content: `${appName} - Your application description` },
	]
}

export async function loader({ request, context }: Route.LoaderArgs) {
	const timings = makeTimings('root loader')

	const user = context.get(userContext)

	const [{ toast, headers: toastHeaders }] = await Promise.all([
		getToast(request),
	])
	const { confettiId, headers: confettiHeaders } = getConfetti(request)
	const honeyProps = await honeypot.getInputProps()
	return data(
		{
			user,
			requestInfo: {
				hints: getHints(request),
				origin: getDomainUrl(request),
				path: new URL(request.url).pathname,
				userPrefs: { theme: getTheme(request) },
			},
			ENV: getEnv(),
			toast,
			confettiId,
			honeyProps,
		},
		{
			headers: combineHeaders(
				{ 'Server-Timing': timings.toString() },
				toastHeaders,
				confettiHeaders,
			),
		},
	)
}

export const headers: Route.HeadersFunction = pipeHeaders

function Document({
	children,
	nonce,
	theme = 'light',
	env = {},
	title,
}: Readonly<{
	children: React.ReactNode
	nonce: string
	theme?: Theme
	env?: Record<string, string>
	title?: string
}>) {
	const appName = env.APP_NAME ?? 'App'
	const appDescription = `${appName} - Your application description`

	return (
		<html lang="en" className={cn(theme, 'h-screen scroll-smooth')}>
			<head>
				<ClientHintCheck nonce={nonce} />
				<Meta />
				<meta charSet="utf-8" />
				{title ? <title>{getPageTitle(title)}</title> : null}
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content={appDescription} />
				<meta name="robots" content="all,follow" />
				<meta name="googlebot" content="index,follow,snippet,archive" />
				<meta itemProp="name" content={appName} />
				<meta itemProp="description" content={appDescription} />
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:title" content={appName} />
				<meta name="twitter:description" content={appDescription} />
				<meta name="og:site_name" content={appName} />
				<meta name="og:type" content="website" />
				<meta name="og:title" content={appName} />
				<meta name="og:description" content={appDescription} />
				<link rel="icon" type="image/svg+xml" href="/logo-square.svg" />
				<link rel="icon" type="image/x-icon" href="/favicon.ico" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/favicons/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicons/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicons/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
				<Links />
			</head>
			<body className="bg-background text-foreground relative h-full text-sm">
				<Layout>{children}</Layout>
				<script
					nonce={nonce}
					dangerouslySetInnerHTML={{
						__html: `
						window.ENV = ${JSON.stringify(env)}
						`,
					}}
				/>
				<ScrollRestoration nonce={nonce} />
				<Scripts nonce={nonce} />
			</body>
		</html>
	)
}

function App({ data }: { data: Route.ComponentProps['loaderData'] }) {
	const nonce = useNonce()
	const theme = useTheme()

	useToast(data.toast)

	return (
		<IconProvider sprite={href}>
			<Document nonce={nonce} theme={theme} env={data.ENV}>
				<Outlet />
				<Confetti id={data.confettiId} />
				<EpicToaster position="bottom-right" theme={theme} richColors />
				<EpicProgress />
			</Document>
		</IconProvider>
	)
}

function getErrorMessage(error: unknown): string {
	if (error instanceof Error) {
		return error.message || 'An unexpected error occurred'
	}
	if (typeof error === 'string') {
		return error
	}
	if (error && typeof error === 'object' && 'message' in error) {
		const message = error.message
		if (typeof message === 'string') {
			return message
		}
	}
	return 'An unknown error occurred. Please try again later.'
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	const nonce = useNonce()

	if (isRouteErrorResponse(error)) {
		return (
			<Document title={`${error.status} ${error.statusText}`} nonce={nonce}>
				<CatchError error={error} />
			</Document>
		)
	}

	const errorMessage = getErrorMessage(error)

	return (
		<Document title="Error!" nonce={nonce}>
			<CatchError
				error={{
					status: 500,
					statusText: 'Internal Server Error',
					data: errorMessage,
				}}
			/>
		</Document>
	)
}

function AppWithProviders({ loaderData }: Route.ComponentProps) {
	return (
		<HoneypotProvider {...loaderData.honeyProps}>
			<App data={loaderData} />
		</HoneypotProvider>
	)
}

export default AppWithProviders
