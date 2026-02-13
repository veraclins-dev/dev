import { Box } from '@veraclins-dev/ui'
import { getSizeClasses, type Size } from '@veraclins-dev/utils'

const LoadingIcon = () => (
	<svg
		width="100%"
		height="100%"
		viewBox="0 0 45 45"
		xmlns="http://www.w3.org/2000/svg"
		stroke="currentColor"
	>
		<g
			fill="none"
			fillRule="evenodd"
			transform="translate(1 1)"
			strokeWidth="2"
		>
			<circle cx="22" cy="22" r="6" strokeOpacity="0">
				<animate
					attributeName="r"
					begin="1.5s"
					dur="3s"
					values="6;22"
					calcMode="linear"
					repeatCount="indefinite"
				/>
				<animate
					attributeName="stroke-opacity"
					begin="1.5s"
					dur="3s"
					values="1;0"
					calcMode="linear"
					repeatCount="indefinite"
				/>
				<animate
					attributeName="stroke-width"
					begin="1.5s"
					dur="3s"
					values="2;0"
					calcMode="linear"
					repeatCount="indefinite"
				/>
			</circle>
			<circle cx="22" cy="22" r="6" strokeOpacity="0">
				<animate
					attributeName="r"
					begin="3s"
					dur="3s"
					values="6;22"
					calcMode="linear"
					repeatCount="indefinite"
				/>
				<animate
					attributeName="stroke-opacity"
					begin="3s"
					dur="3s"
					values="1;0"
					calcMode="linear"
					repeatCount="indefinite"
				/>
				<animate
					attributeName="stroke-width"
					begin="3s"
					dur="3s"
					values="2;0"
					calcMode="linear"
					repeatCount="indefinite"
				/>
			</circle>
			<circle cx="22" cy="22" r="8">
				<animate
					attributeName="r"
					begin="0s"
					dur="1.5s"
					values="6;1;2;3;4;5;6"
					calcMode="linear"
					repeatCount="indefinite"
				/>
			</circle>
		</g>
	</svg>
)

export const Loader = ({
	size = 6,
	children,
	className,
}: {
	size?: Size
	children?: React.ReactNode
	className?: string
}) => {
	const classes = getSizeClasses(size)

	return (
		<Box display="flex" items="center" gapX={2} className={className}>
			<Box
				component="span"
				display="flex"
				items="center"
				justify="center"
				className={classes}
			>
				<LoadingIcon />
			</Box>
			{children}
		</Box>
	)
}
