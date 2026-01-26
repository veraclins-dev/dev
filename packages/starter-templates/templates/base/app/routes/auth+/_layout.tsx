import { Outlet } from 'react-router'
import { GeneralErrorBoundary } from '../../components/error-boundary'
import { requireAnonymous } from '../../utils/auth/auth.server'
import { type Route } from './+types/_layout'

export const loader = async ({ request, context }: Route.LoaderArgs) => {
	await requireAnonymous(request, context)

	return {}
}

export default function Index() {
	return <Outlet />
}

export function ErrorBoundary() {
	return <GeneralErrorBoundary name="authentication" />
}
