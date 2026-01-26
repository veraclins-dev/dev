import { notFound } from '@veraclins-dev/react-utils/server'

import { GeneralErrorBoundary } from '../../components/error-boundary'

import { type Route } from './+types/$'

export async function loader() {
	throw notFound('Auth')
}

export function ErrorBoundary({ params }: Route.ErrorBoundaryProps) {
	const basePath = params['*'].split('/')[0] ?? 'login'

	return <GeneralErrorBoundary redirectTo={`/auth/${basePath}`} />
}
