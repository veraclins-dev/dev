import { Form, useConform } from '@veraclins-dev/form'
import { formSubmissionErrors, processForm } from '@veraclins-dev/form/server'
import {
	Box,
	CheckboxField,
	HiddenField,
	Icon,
	LabeledTextField,
} from '@veraclins-dev/ui'
import { redirect, type RouterContextProvider } from 'react-router'
import { safeRedirect } from 'remix-utils/safe-redirect'
import createAccountIllustration from '../../assets/images/create-illustration.svg'
import { WelcomeEmail } from '../../components/emails/welcome-email'
import { AuthLayout } from './components/layout'
import { AuthLink } from './components/link'
import { requireAnonymous, signup } from '../../utils/auth/auth.server'
import {
	sessionKey,
	authSessionStorage,
} from '../../utils/auth/session.server'
import { verifySessionStorage } from '../../utils/auth/verification.server'
import {
	onboardingEmailSessionKey,
} from '../../utils/auth/verification.utils'
import { redirectWithConfetti } from '../../utils/confetti.server'
import { sendEmail } from '../../utils/email.server'
import { getBaseURL, getPageTitle } from '../../utils/misc'
import { CreateAccount } from '../../utils/user/validations'
import { CreateUniqueAccount } from '../../utils/user/validations.server'
import { type Route } from './+types/onboarding'

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

	const baseURL = getBaseURL()

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

export default function OnboardingPage({}: Route.ComponentProps) {
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
