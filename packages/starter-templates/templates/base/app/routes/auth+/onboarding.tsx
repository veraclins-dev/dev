import { redirect, type RouterContextProvider } from 'react-router'
import { safeRedirect } from 'remix-utils/safe-redirect'

import { Form, useConform } from '@veraclins-dev/form'
import { formSubmissionErrors, processForm } from '@veraclins-dev/form/server'
import {
	Box,
	CheckboxField,
	Icon,
	LabeledTextField,
} from '@veraclins-dev/ui'

import createAccountIllustration from '#app/assets/images/create-illustration.svg'
import { WelcomeEmail } from '#app/components/emails/welcome-email'
import { requireAnonymous, signup } from '#app/utils/auth/auth.server'
import {
	authSessionStorage,
	sessionKey,
} from '#app/utils/auth/session.server'
import { verifySessionStorage } from '#app/utils/auth/verification.server'
import {
	onboardingEmailSessionKey,
} from '#app/utils/auth/verification.utils'
import { redirectWithConfetti } from '#app/utils/confetti.server'
import { sendEmail } from '#app/utils/email.server'
import { getBaseURL, getPageTitle } from '#app/utils/misc'
import { CreateAccount } from '#app/utils/user/validations'
import { CreateUniqueAccount } from '#app/utils/user/validations.server'

import { type Route } from './+types/onboarding'
import { AuthLayout } from './components/layout'
import { AuthLink } from './components/link'

async function getOnboardingSessionValues(
	request: Request,
	context?: Readonly<RouterContextProvider>,
): Promise<{
	email: string | undefined
}> {
	await requireAnonymous(request, context)
	const verifySession = await verifySessionStorage.getSession(
		request.headers.get('cookie'),
	)

	const email = verifySession.get(onboardingEmailSessionKey) as string

	if (typeof email !== 'string' || !email) {
		throw redirect('/auth/signup')
	}

	return { email }
}

export async function loader({ request, context }: Route.LoaderArgs) {
	await getOnboardingSessionValues(request, context)
	return {}
}

export async function action({ request, context }: Route.ActionArgs) {
	const { email } = await getOnboardingSessionValues(request, context)
	const submission = await processForm({ request, schema: CreateUniqueAccount })

	if (submission.status !== 'success') {
		return formSubmissionErrors(submission)
	}

	const { redirectTo, value } = submission
	if (!email) {
		return getOnboardingSessionValues(request, context)
	}

	const session = await signup({ ...value }, email, request)
	if (!session) {
		return formSubmissionErrors(submission, {
			formErrors: ['User account creation failed. Please try again'],
		})
	}

	const cookieSession = await authSessionStorage.getSession(
		request.headers.get('cookie'),
	)
	cookieSession.set(sessionKey, session.id)
	const verifySession = await verifySessionStorage.getSession()
	const headers = new Headers()
	headers.append(
		'set-cookie',
		await authSessionStorage.commitSession(cookieSession),
	)
	headers.append(
		'set-cookie',
		await verifySessionStorage.destroySession(verifySession),
	)

	const baseURL = getBaseURL() ?? 'http://localhost:3000'

	await sendEmail({
		to: email,
		subject: 'Welcome!',
		react: <WelcomeEmail username={value.username} url={baseURL} />,
	})

	return redirectWithConfetti(safeRedirect(redirectTo), { headers })
}

export const meta: Route.MetaFunction = () => {
	return [{ title: getPageTitle('Create Account') }]
}

export default function OnboardingPage(_props: Route.ComponentProps) {
	const { form, fields } = useConform({
		schema: CreateAccount,
		id: 'onboarding-form',
	})

	return (
		<AuthLayout
			illustration={createAccountIllustration}
			altText="Welcome aboard"
			title="Welcome aboard!"
		>
			<Form submitText="Create account" form={form}>
				<LabeledTextField
					label="Username"
					placeholder="Choose a unique username"
					autoComplete="username"
					field={fields.username}
				/>
				<LabeledTextField
					label="Name"
					placeholder="Enter your full name"
					autoComplete="name"
					field={fields.name}
				/>

				<LabeledTextField
					label="Password"
					placeholder="Enter your password"
					type="password"
					field={fields.password}
				/>
				<LabeledTextField
					label="Confirm Password"
					placeholder="Reenter the password"
					type="password"
					field={fields.confirmPassword}
				/>

				<CheckboxField
					label="I agree to the Terms of service and privacy policy"
					field={fields.agreeToTerms}
				/>
			</Form>
			<Box gap={2} display="flex" className="text-center italic">
				<Icon name="arrow-left" />
				<AuthLink
					to="/auth/login"
					linkClassName="font-semibold"
					linkText="Go back to login"
				/>
			</Box>
		</AuthLayout>
	)
}
