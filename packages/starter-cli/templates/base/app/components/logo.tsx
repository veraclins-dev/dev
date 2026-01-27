import { Image } from '@veraclins-dev/image'
import { Box } from '@veraclins-dev/ui'
import { cn } from '@veraclins-dev/utils'

import logoIcon from '../assets/images/edulinks_logo_icon.svg'
import logo from '../assets/images/logo.svg'

interface Props {
	height?: 24 | 32 | 40 | 48 | 56 | 64
	className?: string
	icon?: boolean
}

export const Logo = ({ height = 48, className, icon = false }: Props) => {
	return (
		<Box display="flex" items="center" className={cn(className)}>
			<Image
				src={icon ? logoIcon : logo}
				height={height}
				width={icon ? height : height * 3.2875}
				alt="Logo"
				priority
				className="max-h-full"
			/>
		</Box>
	)
}
