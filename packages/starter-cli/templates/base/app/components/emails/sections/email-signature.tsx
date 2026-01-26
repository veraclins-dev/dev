import { Section, Text } from '@react-email/components'

type Props = {
	children?: React.ReactNode
	appName?: string
}

export const EmailSignature = ({ children, appName = 'Our Team' }: Props) => {
	return (
		<Section className="flex gap-2">
			{children ? children : null}
			<Text className="mb-0 text-[#333333]">Best Regards,</Text>
			<Text className="my-0 text-[20px] leading-[24px] font-semibold">
				{appName}
			</Text>
		</Section>
	)
}
