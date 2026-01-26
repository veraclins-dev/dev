import { formSubmissionErrors, processForm } from '@veraclins-dev/form/server'
import { jsonWithToast } from '@veraclins-dev/react-utils/server'
import { data } from 'react-router'
import AccountSetupVerification from '../../components/emails/account-setup-verification'
import { ForgotPasswordEmail } from '../../components/emails/forgot-password'
import { requireAnonymous } from '../../utils/auth/auth.server'
import { prepareVerification } from '../../utils/auth/verification.server'
import { sendEmail } from '../../utils/email.server'
import { ResendOTP } from '../../utils/user/validations'
import { type Route } from './+types/resend-otp'

export async function action({ request, context }: Route.ActionArgs) {
	await requireAnonymous(request, context)

	const submission = await processForm({ request, schema: ResendOTP })
	if (submission.status !== 'success') {
		return formSubmissionErrors(submission)
	}

	const { email, type } = submission.value

	const { verifyUrl, otp } = await prepareVerification({
		period: 15 * 60,
		request,
		type,
		target: email,
	})

	let emailComponent
	switch (type) {
		case 'onboarding':
			emailComponent = (
				<AccountSetupVerification
					verificationURL={verifyUrl.toString()}
					verificationCode={otp}
				/>
			)
			break
		case 'reset-password':
			emailComponent = (
				<ForgotPasswordEmail resetUrl={verifyUrl.toString()} otp={otp} />
			)
			break
		default:
			throw new Error('Unsupported email type')
	}

	const response = await sendEmail({
		to: email,
		subject: 'Your new Verification code',
		react: emailComponent,
	})

	if (response.status === 'success') {
		return jsonWithToast({
			data: { status: 'success', submission: submission.reply() } as const,
			toast: {
				type: 'success',
				title: 'Success',
				description: 'Verification code resent successfully',
			},
		})
	} else {
		return data(
			{
				status: 'error',
				message: 'Failed to resend the verification code. Please try again.',
				errorDetails: response.error.message,
			},
			{ status: 500 },
		)
	}
}
