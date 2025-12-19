import { Text, Section, Button } from '@react-email/components'
import { EmailHeading } from '#app/components/emails/components/heading'
import { EmailLayout } from '#app/components/emails/components/layout'
import { EmailSignature } from '#app/components/emails/sections/email-signature'

interface WelcomeEmailProps {
	username: string
	url: string
	appName?: string
}

export const WelcomeEmail = ({
	username,
	url,
	appName = process.env.APP_NAME || 'App',
}: WelcomeEmailProps) => {
	return (
		<EmailLayout>
			<EmailHeading title={`Welcome to ${appName}! 🚀`} />
			<Text className="text-base text-black">
				Hi <strong>{username}</strong>
			</Text>
			<Text className="text-base text-[#333333]">
				Welcome! We're excited to have you join our community.
			</Text>
			<Text className="text-base text-[#333333]">
				Click the button below to get started:
			</Text>
			<Section className="my-8 text-center">
				<Button
					className="rounded bg-[#9A2FB5] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
					href={url}
				>
					Get Started
				</Button>
			</Section>
			<EmailSignature appName={`${appName} Team`}>
				<Text className="text-[12px] leading-5">
					You received this email because you signed up using this email address.
					If this wasn't you, please ignore this message.
				</Text>
			</EmailSignature>
		</EmailLayout>
	)
}
