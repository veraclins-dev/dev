import { Button, Column, Row, Section, Text } from '@react-email/components'

import { EmailHeading } from './components/heading'
import { EmailLayout } from './components/layout'
import { EmailSignature } from './sections/email-signature'

type Props = {
	verificationURL: string
	verificationCode: string
	previewText?: string
}

const Code = ({
	verificationCode,
	verificationURL,
}: Omit<Props, 'previewText'>) => {
	return (
		<Section className="text-center">
			<Text className="text-[#333333]">
				Click the button below to verify your email and complete your account
				setup.
			</Text>
			<Button
				href={verificationURL}
				className="rounded-md bg-[#9A2FB5] px-8 py-3 text-sm text-white no-underline"
			>
				Verify & Get Started
			</Button>

			<Row className="mx-auto mb-0 flex w-[251px] gap-x-2">
				<Column>
					<Text className="mb-0">or use this verification code:</Text>
				</Column>
				<Column>
					<Text className="mb-0 ml-2 font-semibold">{verificationCode}</Text>
				</Column>
			</Row>
			<Row className="mx-auto">
				<Column align="center">
					<Text className="mt-0">
						This link and code will expire in 15 minutes.
					</Text>
				</Column>
			</Row>
		</Section>
	)
}

const AccountSetupVerification = ({
	previewText = 'Welcome',
	...props
}: Props) => {
	return (
		<EmailLayout previewText={previewText}>
			<EmailHeading title="Welcome" />
			<Text className="mb-0 font-semibold">Hi There 👋 </Text>
			<Text className="mt-1">You are almost there,</Text>
			<Code {...props} />
			<EmailSignature>
				<Text className="italic">
					You received this email because you used this email address to sign up.
					If this wasn&apos;t you, please ignore this message.
				</Text>
			</EmailSignature>
		</EmailLayout>
	)
}

export default AccountSetupVerification
