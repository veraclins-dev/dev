import { Box, Typography } from '@veraclins-dev/ui'

interface EmptyProps {
	title: string
	message?: string
	elevated?: boolean
}

export function Empty({ title, message }: EmptyProps) {
	return (
		<Box display="flex" flexDirection="column" items="center" justify="center" gap={2} py={8}>
			<Typography variant="h6">{title}</Typography>
			{message && (
				<Typography variant="body2" className="text-foreground/70">
					{message}
				</Typography>
			)}
		</Box>
	)
}
