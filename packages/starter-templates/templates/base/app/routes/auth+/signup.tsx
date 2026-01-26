import { Form, useConform } from '@veraclins-dev/form'
import { processForm, formSubmissionErrors } from '@veraclins-dev/form/server'
import { HiddenField, LabeledTextField } from '@veraclins-dev/ui'
import { redirect, useSearchParams, data } from 'react-router'
import getStartedIllustration from '../../assets/images/get-started-illustration.svg'
import AccountSetupVerification from '../../components/emails/account-setup-verification'
import { AuthLayout } from './components/layout'
import { AuthLink } from './components/link'
import { requireAnonymous } from '../../utils/auth/auth.server'
import { prepareVerification } from '../../utils/auth/verification.server'
import {
	targetQueryParam,
} from '../../utils/auth/verification.utils'
import { sendEmail } from '../../utils/email.server'
import { getPageTitle } from '../../utils/misc'
import { Signup } from '../../utils/user/validations'
import { UniqueSignup } from '../../utils/user/validations.server'
import { type Route } from './+types/signup'

export async function loader({ request, context }: Route.LoaderArgs) {
	await requireAnonymous(request, context)
	return {}
}

export async function action({ request, context }: Route.ActionArgs) {
	await requireAnonymous(request, context)
	const submission = await processForm({ request, schema: UniqueSignup })
	if (submission.status !== 'success') {
		return formSubmissionErrors(submission)
	}
	const { email } = submission.value

	const { verifyUrl, redirectTo, otp } = await prepareVerification({
		period: 15 * 60,
		request,
		type: 'onboarding',
		target: email,
	})
	const response = await sendEmail({
		to: email,
		subject: 'Welcome!',
		react: (
			<AccountSetupVerification
				verificationCode={otp}
				verificationURL={verifyUrl.toString()}
			/>
		),
	})
	if (response.status === 'success') {
		return redirect(redirectTo.toString())
	} else {
		return data(
			{
				status: 'error',
				submission: submission.reply({ formErrors: [response.error.message] }),
			} as const,
			{ status: 500 },
		)
	}
}

export const meta: Route.MetaFunction = () => {
	return [{ title: getPageTitle('Sign Up') }]
}

export default function SignupPage() {
	const [searchParams] = useSearchParams()

	const { form, fields } = useConform({
		id: 'signup-form',
		schema: Signup,
		defaultValue: {
			email: searchParams.get(targetQueryParam) ?? '',
		},
	})

	return (
		<AuthLayout
			illustration={getStartedIllustration}
			altText="Get Started"
			title="Let's get you started"
		>
			<Form form={form} submitText="Signup">
				<LabeledTextField
					field={fields.email}
					label="Email"
					placeholder="Enter your email address"
				/>
			</Form>

			<AuthLink
				text="Already have an account?"
				to={{
					pathname: '/auth/login',
					search: searchParams.toString(),
				}}
				className="italic"
				linkClassName="font-semibold"
				linkText="Login"
			/>
		</AuthLayout>
	)
}
