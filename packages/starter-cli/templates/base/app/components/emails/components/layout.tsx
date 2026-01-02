import {
	Body,
	Head,
	Html,
	Img,
	Preview,
	Section,
	Tailwind,
	pixelBasedPreset,
} from '@react-email/components'
import { Footer } from '#app/components/emails/components/footer'
import { EmailSection } from '#app/components/emails/components/section'
import { getBaseURL } from '#app/utils/misc'

interface EmailLayoutProps {
	children: React.ReactNode
	previewText?: string
}

const ContentBody = ({ children }: Omit<EmailLayoutProps, 'previewText'>) => {
	const baseURL = getBaseURL()
	return (
		<Section className="bg-[#F8EBFB] p-4">
			<Section className="my-4">
				<Img
					src={`${baseURL}/logo.png`}
					width="230"
					height="55"
					alt="Logo"
					className="mx-auto my-0"
				/>
			</Section>
			<EmailSection className="max-w-[700px] rounded-xl border border-solid border-[#eaeaea] bg-white">
				<EmailSection>{children}</EmailSection>
				<Footer />
			</EmailSection>
		</Section>
	)
}

export const EmailLayout = ({ children, previewText }: EmailLayoutProps) => {
	return (
		<Tailwind
			config={{
				presets: [pixelBasedPreset],
				theme: {
					extend: {
						fontFamily: {
							'noto-thai': ['Noto Sans Thai', 'sans-serif'],
						},
					},
				},
			}}
		>
			<Html lang="en" dir="ltr">
				<Head />
				{previewText && <Preview>{previewText}</Preview>}
				<Body className="font-noto-thai mx-auto my-auto bg-gray-50">
					<ContentBody>{children}</ContentBody>
				</Body>
			</Html>
		</Tailwind>
	)
}
