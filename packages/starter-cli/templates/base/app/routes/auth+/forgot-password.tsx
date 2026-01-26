import { Form, useConform } from '@veraclins-dev/form'
import { formSubmissionErrors, processForm } from '@veraclins-dev/form/server'
import { Icon, LabeledTextField } from '@veraclins-dev/ui'
import { redirect, useSearchParams, data } from 'react-router'
import createAccountIllustration from '../../assets/images/new-password-illustration.svg'
import { ForgotPasswordEmail } from '../../components/emails/forgot-password'
import { AuthLayout } from './components/layout'
import { AuthLink } from './components/link'
import { prepareVerification } from '../../utils/auth/verification.server'
import { sendEmail } from '../../utils/email.server'
import { getPageTitle } from '../../utils/misc'
import { ForgotPassword } from '../../utils/user/validations'
import { ForgotPasswordWithCheck } from '../../utils/user/validations.server'
import { type Route } from './+types/forgot-password'

export async function action({ request }: Route.ActionArgs) {
	const submission = await processForm({
		request,
		schema: ForgotPasswordWithCheck,
	})
	if (submission.status !== 'success') {
		return formSubmissionErrors(submission)
	}
	const { username, email } = submission.value

	const { verifyUrl, redirectTo, otp } = await prepareVerification({
		period: 10 * 60,
		request,
		type: 'reset-password',
		target: username,
	})

	const response = await sendEmail({
		to: email,
		subject: 'Password Reset',
		react: <ForgotPasswordEmail resetUrl={verifyUrl.toString()} otp={otp} />,
	})

	if (response.status === 'success') {
		return redirect(redirectTo.toString())
	} else {
		return data(
			{ status: 'error', formError: response.error.message } as const,
			{ status: 500 },
		)
	}
}

export const meta: Route.MetaFunction = () => {
	return [{ title: getPageTitle('Forgot Password') }]
}

export default function ForgotPasswordRoute() {
	const [searchParams] = useSearchParams()
	const { form, fields } = useConform({
		schema: ForgotPassword,
		id: 'forgot-password-form',
	})

	return (
		<AuthLayout
			illustration={createAccountIllustration}
			altText="Trouble Logging in"
			title="Trouble Logging in?"
			subtitle="Not to worry, we'll send you instructions to reset your password."
		>
			<Form submitText="Send Reset Link" form={form}>
				<LabeledTextField
					label="Email or username"
					placeholder="Enter your email or username"
					field={fields.username}
				/>
			</Form>
			<AuthLink
				to={{ pathname: '/auth/login', search: searchParams.toString() }}
				text={<Icon name="arrow-left" />}
				linkClassName="font-semibold"
				linkText="Go back to login"
			/>
		</AuthLayout>
	)
}
