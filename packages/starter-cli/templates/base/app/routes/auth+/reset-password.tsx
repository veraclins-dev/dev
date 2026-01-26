import { Form, useConform } from '@veraclins-dev/form'
import { processForm, formSubmissionErrors } from '@veraclins-dev/form/server'
import { Icon, LabeledTextField } from '@veraclins-dev/ui'
import { redirect, type RouterContextProvider } from 'react-router'
import newPasswordIllustration from '../../assets/images/new-password-illustration.svg'
import { PasswordChangeNotice } from '../../components/emails/password-change-notice'
import { AuthLayout } from './components/layout'
import { AuthLink } from './components/link'
import {
	requireAnonymous,
	resetUserPassword,
} from '../../utils/auth/auth.server'
import { verifySessionStorage } from '../../utils/auth/verification.server'
import { resetPasswordUsernameSessionKey } from '../../utils/auth/verification.utils'
import { sendEmail } from '../../utils/email.server'
import { getDisplayName, getPageTitle } from '../../utils/misc'
import { PasswordAndConfirmPassword } from '../../utils/user/validations'
import { ResetPassword } from '../../utils/user/validations.server'
import { type Route } from './+types/reset-password'

async function requireResetPasswordUsername(
	request: Request,
	context?: Readonly<RouterContextProvider>,
) {
	await requireAnonymous(request, context)
	const verifySession = await verifySessionStorage.getSession(
		request.headers.get('cookie'),
	)
	const resetPasswordUsername = verifySession.get(
		resetPasswordUsernameSessionKey,
	)
	if (typeof resetPasswordUsername !== 'string' || !resetPasswordUsername) {
		throw redirect('/auth/login')
	}
	return resetPasswordUsername
}

export async function loader({ request, context }: Route.LoaderArgs) {
	const resetPasswordUsername = await requireResetPasswordUsername(
		request,
		context,
	)
	return { resetPasswordUsername }
}

export async function action({ request, context }: Route.ActionArgs) {
	const resetPasswordUsername = await requireResetPasswordUsername(
		request,
		context,
	)
	const submission = await processForm({ request, schema: ResetPassword })
	if (submission.status !== 'success') {
		return formSubmissionErrors(submission)
	}
	const { password } = submission.value

	const user = await resetUserPassword({
		username: resetPasswordUsername,
		password,
	})

	await sendEmail({
		subject: 'Password Reset',
		to: user.email,
		react: <PasswordChangeNotice name={getDisplayName(user)} />,
	})

	const verifySession = await verifySessionStorage.getSession()
	return redirect('/auth/login', {
		headers: {
			'set-cookie': await verifySessionStorage.destroySession(verifySession),
		},
	})
}

export const meta: Route.MetaFunction = () => {
	return [{ title: getPageTitle('Reset Password') }]
}

export default function ResetPasswordPage() {
	const { form, fields } = useConform({
		schema: PasswordAndConfirmPassword,
		id: 'reset-password-form',
	})

	return (
		<AuthLayout
			illustration={newPasswordIllustration}
			altText="reset password"
			title="Create New Password"
			subtitle="Your new password must be different from previously used passwords"
		>
			<Form submitText="Confirm" form={form}>
				<LabeledTextField
					placeholder="New password"
					label="New password"
					type="password"
					field={fields.password}
				/>
				<LabeledTextField
					placeholder="Confirm New Password"
					type="password"
					label="Confirm password"
					field={fields.confirmPassword}
				/>
			</Form>

			<AuthLink
				to="/auth/login"
				text={<Icon name="arrow-left" />}
				linkClassName="font-semibold"
				linkText="Go back to login"
			/>
		</AuthLayout>
	)
}
