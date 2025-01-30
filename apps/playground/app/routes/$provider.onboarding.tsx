import {
	json,
	redirect,
	type LoaderFunctionArgs,
	type ActionFunctionArgs,
	type MetaFunction,
} from '@remix-run/node'
import { type Params } from '@remix-run/react'
import { CheckboxField, ImageField, LabeledTextField } from '@veraclins-dev/ui'
import { safeRedirect } from 'remix-utils/safe-redirect'
import createAccountIllustration from '../../../assets/images/create-illustration.svg'
import { Form } from '../../../components/forms/form.tsx'

import { useConForm } from '../../../hooks/use-form-validations'
import { AuthLayout } from '../components/layout'
import {
	authenticator,
	requireAnonymous,
	signupWithConnection,
} from '../../../utils/auth/auth.server.ts'

import { ProviderName } from '../../../utils/auth/connections/common.ts'
import {
	sessionKey,
	authSessionStorage,
} from '../../../utils/auth/session.server.ts'
import { verifySessionStorage } from '../../../utils/auth/verification.server.tsx'
import { onboardingEmailSessionKey } from '../../../utils/auth/verification.utils.ts'
import { redirectWithConfetti } from '../../../utils/confetti.server.ts'
import { formSubmissionErrors } from '../../../utils/errors.ts'
import { processForm } from '../../../utils/form/form.server.ts'
import { getPageTitle } from '../../../utils/misc.ts'
import { CreateAccountSocial } from '../../../utils/user/validations'
import { CreateUniqueAccountSocial } from '../../../utils/user/validations.server'
import { z } from '../../../validations/index.ts'

export const providerIdKey = 'providerId'
export const prefilledProfileKey = 'prefilledProfile'

async function requireData({
	request,
	params,
}: {
	request: Request
	params: Params
}) {
	await requireAnonymous(request)
	const verifySession = await verifySessionStorage.getSession(
		request.headers.get('cookie'),
	)
	const email = verifySession.get(onboardingEmailSessionKey)
	const providerId = verifySession.get(providerIdKey)
	const result = z
		.object({
			email: z.string(),
			providerName: ProviderName,
			providerId: z.string(),
		})
		.safeParse({ email, providerName: params.provider, providerId })
	if (result.success) {
		return result.data
	} else {
		throw redirect('/auth/signup')
	}
}

export async function loader({ request, params }: LoaderFunctionArgs) {
	const { email } = await requireData({ request, params })
	const cookieSession = await authSessionStorage.getSession(
		request.headers.get('cookie'),
	)
	const verifySession = await verifySessionStorage.getSession(
		request.headers.get('cookie'),
	)
	const prefilledProfile = verifySession.get(prefilledProfileKey)

	const formError = cookieSession.get(authenticator.sessionErrorKey)

	return json({
		email,
		status: 'idle',
		submission: {
			intent: '',
			payload: (prefilledProfile ?? {}) as Record<string, unknown>,
			error: {
				'': typeof formError === 'string' ? [formError] : [],
			},
		},
	})
}

export async function action({ request, params }: ActionFunctionArgs) {
	const { email, providerId, providerName } = await requireData({
		request,
		params,
	})
	const submission = await processForm({
		request,
		schema: CreateUniqueAccountSocial,
	})
	if (submission.status !== 'success') {
		return formSubmissionErrors(submission)
	}

	const verifySession = await verifySessionStorage.getSession(
		request.headers.get('cookie'),
	)

	const {
		value: { username, name, imageUrl },
		redirectTo,
	} = submission
	const session = await signupWithConnection({
		username,
		name,
		email,
		id: providerId,
		providerName,
		imageUrl: imageUrl ?? '',
	})
	if (!session) {
		return formSubmissionErrors(submission, {
			formErrors: ['User account creation failed. Please try again'],
		})
	}

	const cookieSession = await authSessionStorage.getSession(
		request.headers.get('cookie'),
	)
	cookieSession.set(sessionKey, session.id)
	const headers = new Headers()
	headers.append(
		'set-cookie',
		await authSessionStorage.commitSession(cookieSession),
	)
	headers.append(
		'set-cookie',
		await verifySessionStorage.destroySession(verifySession),
	)

	return redirectWithConfetti(safeRedirect(redirectTo), { headers })
}

export const meta: MetaFunction = () => {
	return [{ title: getPageTitle('Create Account') }]
}

export default function SignupRoute() {
	const { form, fields } = useConForm({
		schema: CreateAccountSocial,
		id: 'create-social-account-form',
	})

	console.log('fields', fields.imageUrl.initialValue)

	return (
		<AuthLayout
			illustration={createAccountIllustration}
			altText="Welcome aboard"
			title="Welcome aboard!"
		>
			<Form form={form} submitText="Create account">
				{fields.imageUrl.initialValue && (
					<ImageField name="imageUrl" value={fields.imageUrl.initialValue} />
				)}

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
				<CheckboxField
					label="I agree to the Terms of service and privacy policy"
					field={fields.agreeToTerms}
				/>
			</Form>
		</AuthLayout>
	)
}
