import { Heading } from '@react-email/components'

type Props = {
	title: string
}

export const EmailHeading = ({ title }: Props) => {
	return (
		<Heading as="h1" className="my-0 text-[20px] font-bold lg:text-[32px]">
			{title}
		</Heading>
	)
}
