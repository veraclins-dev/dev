import { VerifyForm } from '../../components/verification/verify'
import { validateRequest } from '../../utils/auth/verification.server'
import { codeQueryParam } from '../../utils/auth/verification.utils'
import { getPageTitle } from '../../utils/misc'
import { type Route } from './+types/verify'

export async function loader({ request }: Route.LoaderArgs) {
	const params = new URL(request.url).searchParams
	if (!params.has(codeQueryParam)) {
		return {
			status: 'idle',
			submission: {
				intent: '',
				payload: Object.fromEntries(params) as Record<string, unknown>,
				error: {} as Record<string, Array<string>>,
			},
		} as const
	}
	return validateRequest(request, params)
}

export async function action({ request }: Route.ActionArgs) {
	return validateRequest(request)
}

export const meta: Route.MetaFunction = () => {
	return [{ title: getPageTitle('Verify') }]
}

export default function VerifyRoute() {
	return <VerifyForm />
}
