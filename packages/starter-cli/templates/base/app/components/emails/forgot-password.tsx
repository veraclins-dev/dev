import { Button, Section, Text } from '@react-email/components'
import { EmailHeading } from '#app/components/emails/components/heading'
import { EmailLayout } from '#app/components/emails/components/layout'
import { EmailSignature } from '#app/components/emails/sections/email-signature'

interface ForgotPasswordEmailProps {
	resetUrl: string
	otp: string
	appName?: string
}

export function ForgotPasswordEmail({
	resetUrl,
	otp,
	appName = process.env.APP_NAME || 'App',
}: ForgotPasswordEmailProps) {
	return (
		<EmailLayout>
			<EmailHeading title={`Reset Your ${appName} Password`} />
			<Text className="m-0 text-[14px] leading-[24px] text-black">
				<strong>Hi there,</strong>
			</Text>
			<Text className="m-0 text-[14px] leading-[24px] text-black">
				We received a request to reset your password. If you made this request,
				click the button below or use the verification code provided.
			</Text>
			<Section className="my-3 text-center">
				<Button
					className="cursor-pointer rounded bg-[#9A2FB5] px-5 py-3 text-center text-[14px] leading-none font-semibold text-white no-underline"
					href={resetUrl}
				>
					Reset Password
				</Button>
			</Section>
			<Text className="m-0 text-center text-[14px] text-black">
				Or use this verification code: <strong>{otp}</strong>
			</Text>
			<EmailSignature appName={`${appName} Team`}>
				<Text className="text-[14px] leading-[16px] text-[#666666] italic">
					This verification link is only valid for 10 minutes and can only be
					used once. Do not share this link with anyone. If you did not initiate
					this request, please ignore this email.
				</Text>
			</EmailSignature>
		</EmailLayout>
	)
}
