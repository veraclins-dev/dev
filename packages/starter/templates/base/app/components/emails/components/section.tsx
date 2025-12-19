import { Section } from '@react-email/components'
import { cn } from '@veraclins-dev/utils'

type Props = {
	children: React.ReactNode
	className?: string
}

export const EmailSection = ({ children, className }: Props) => (
	<Section className={cn('p-2 md:p-4', className)}>{children}</Section>
)
