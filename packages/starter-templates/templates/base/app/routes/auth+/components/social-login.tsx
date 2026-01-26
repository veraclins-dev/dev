import { useState } from 'react'
import { useSearchParams } from 'react-router'

import { Box, ErrorList, Separator } from '@veraclins-dev/ui'

import { REDIRECT_TO_FIELD } from '../../../utils/constants'

export const SocialLogin = ({ remember: _remember }: { remember?: boolean }) => {
	const [error, setError] = useState<string | null>(null)

	const [searchParams] = useSearchParams()
	const _redirectTo = searchParams.get(REDIRECT_TO_FIELD)

	// OAuth providers are optional - can be added via feature modules
	// For now, return null if no providers are configured
	const providerNames: string[] = []

	if (providerNames.length === 0) {
		return null
	}

	return (
		<Box
			display="flex"
			flexDirection="column"
			gapY={4}
			items="center"
			className="lg:gap-y-6"
		>
			<Separator withContent>or</Separator>
			<Box>
				<Box display="flex" justify="center" gapX={4} items="center">
					{/* OAuth providers will be added via feature modules */}
				</Box>
				{error && <ErrorList errors={[error]} id="social-login-error" />}
			</Box>
		</Box>
	)
}
