import { useSearchParams } from 'react-router'

import { Form, useConform } from '@veraclins-dev/form'
import { formSubmissionErrors,processForm } from '@veraclins-dev/form/server'
import { CheckboxField, LabeledTextField } from '@veraclins-dev/ui'

import loginIllustration from '../../assets/images/login-illustration.svg'
import { login, requireAnonymous } from '../../utils/auth/auth.server'
import { handleNewSession } from '../../utils/auth/session.server'
import { getPageTitle } from '../../utils/misc'
import { Login } from '../../utils/user/validations'
import { LoginWithCheck } from '../../utils/user/validations.server'

import { type Route } from './+types/login'
import { AuthLayout } from './components/layout'
import { AuthLink } from './components/link'

export async function loader({ request, context }: Route.LoaderArgs) {
	await requireAnonymous(request, context)
	return {}
}

export async function action({ request, context }: Route.ActionArgs) {
	await requireAnonymous(request, context)
	const submission = await processForm({ request, schema: LoginWithCheck })
	if (submission.status !== 'success' || !submission.value) {
		return formSubmissionErrors(submission, { hideFields: ['password'] })
	}
	const { redirectTo, value } = submission

	const { userId, remember } = value

	const session = await login(userId, request)

	return handleNewSession({
		request,
		session,
		redirectTo,
		remember: remember === 'on',
	})
}

export const meta: Route.MetaFunction = () => {
	return [{ title: getPageTitle('Login') }]
}

export default function LoginPage() {
	const [searchParams] = useSearchParams()
	const { fields, form } = useConform({
		schema: Login,
		id: 'login-form',
	})

	return (
		<AuthLayout
			illustration={loginIllustration}
			altText="User login"
			title="Login"
		>
			<Form action="/auth/login" form={form} submitText="Login">
				<LabeledTextField
					label="Email/username"
					placeholder="Enter your email or username"
					field={fields.username}
				/>
				<LabeledTextField
					label="Password"
					placeholder="Password"
					type="password"
					field={fields.password}
					topText={
						<AuthLink
							to="/auth/forgot-password"
							linkText="Forgot your password?"
						/>
					}
				/>
				<CheckboxField label="Remember me" field={fields.remember} />
			</Form>

			<AuthLink
				text="Don't have an account?"
				to={{ pathname: '/auth/signup', search: searchParams.toString() }}
				className="italic"
				linkClassName="font-semibold"
				linkText="Sign Up"
			/>
		</AuthLayout>
	)
}
