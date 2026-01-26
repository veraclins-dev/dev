import { Text } from '@react-email/components'
import { EmailHeading } from './components/heading'
import { EmailLayout } from './components/layout'
import { EmailSignature } from './sections/email-signature'

type Props = {
	name: string
}

export const PasswordChangeNotice = ({ name }: Props) => {
	return (
		<EmailLayout previewText="Your password has been updated. Contact support immediately if this wasn't you.">
			<EmailHeading title="Your Password Has Been Successfully Updated" />
			<Text className="mb-0 font-semibold text-[#333333]">Hi {name},</Text>
			<Text className="mt-1 text-[#333333]">
				We received a request to change your password. If you did not make this
				request, please update your email or contact our customer support team
				immediately for further assistance.
			</Text>
			<EmailSignature>
				<Text>
					Thanks for being part of our community. We&apos;re excited to keep
					learning and growing with you — one click at a time!
				</Text>
			</EmailSignature>
		</EmailLayout>
	)
}
