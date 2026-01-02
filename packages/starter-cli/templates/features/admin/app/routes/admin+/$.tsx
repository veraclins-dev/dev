import { notFound } from '@veraclins-dev/react-utils/server'
import { href } from 'react-router'
import { GeneralErrorBoundary } from '#app/components/error-boundary'

export async function loader() {
	throw notFound('Admin')
}

export function ErrorBoundary() {
	return <GeneralErrorBoundary redirectTo={href('/admin/dashboard')} />
}
