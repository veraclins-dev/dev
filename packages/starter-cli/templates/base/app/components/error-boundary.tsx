import { captureException } from '@sentry/react-router'
import { Box } from '@veraclins-dev/ui'
import { getErrorMessage } from '@veraclins-dev/utils'
import { useEffect } from 'react'
import {
	isRouteErrorResponse,
	useParams,
	useRouteError,
	type ErrorResponse,
} from 'react-router'
import { CatchError } from './catch-error'

type StatusHandler = (info: {
	error: ErrorResponse
	params: Record<string, string | undefined>
	redirectTo?: string
	name?: string
}) => React.JSX.Element | null

export function GeneralErrorBoundary({
	defaultStatusHandler = ({ error, redirectTo, name }) => (
		<CatchError error={error} redirectTo={redirectTo} name={name} />
	),
	statusHandlers,
	unexpectedErrorHandler = (error) => <Box>{getErrorMessage(error)}</Box>,
	redirectTo,
	name,
}: {
	name?: string
	redirectTo?: string
	defaultStatusHandler?: StatusHandler
	statusHandlers?: Record<number, StatusHandler>
	unexpectedErrorHandler?: (error: unknown) => React.JSX.Element | null
}) {
	const error = useRouteError()
	const params = useParams()
	const isResponse = isRouteErrorResponse(error)

	if (typeof document !== 'undefined') {
		console.error(error)
	}

	useEffect(() => {
		if (isResponse) return

		captureException(error)
	}, [error, isResponse])

	return (
		<Box display="flex" items="center" justify="center" className="h-full">
			{isResponse
				? (statusHandlers?.[error.status] ?? defaultStatusHandler)({
						error,
						params,
						redirectTo,
						name,
					})
				: unexpectedErrorHandler(error)}
		</Box>
	)
}
