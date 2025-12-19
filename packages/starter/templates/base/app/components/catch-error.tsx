import { Box, Button, Typography } from '@veraclins-dev/ui'
import { useCallback } from 'react'
import { useNavigate, type ErrorResponse } from 'react-router'
import { ErrorLayout } from '#app/components/error-layout'

type ErrorInfo = {
	error: ErrorResponse
	name?: string
	redirectTo?: string
}

const getErrorData = (error: ErrorResponse) => {
	try {
		return JSON.parse(error.data)
	} catch {
		return error.data
	}
}

export const CatchError = ({ error, redirectTo, name = 'page' }: ErrorInfo) => {
	const errorData = getErrorData(error)
	const navigate = useNavigate()

	const refresh = useCallback(() => navigate(0), [])

	const data: Record<string, string> =
		typeof errorData === 'string' ? { message: errorData } : errorData

	switch (error.status) {
		case 401:
			return (
				<ErrorLayout
					title="Unauthorized"
					redirectTo={redirectTo}
					message={
						data?.message ? <Typography>{data.message}</Typography> : null
					}
				/>
			)
		case 404:
			return (
				<ErrorLayout
					title="Oops! Page Not Found"
					message={
						data?.message ??
						`We're sorry, we couldn't find the ${name} you requested`
					}
					redirectTo={redirectTo}
				/>
			)
		case 403:
			return (
				<ErrorLayout
					title="Permission Error"
					message={
						data?.message ??
						"Sorry, you don't have the permission to this resource."
					}
					redirectTo={redirectTo}
				/>
			)
		default:
			return (
				<ErrorLayout
					message={
						<Box className="space-y-3">
							<Typography variant="body1">
								Oops! This is not supposed to happen please refresh the page and
								try again.
							</Typography>
							{data?.message ? <Typography>{data.message}</Typography> : null}
						</Box>
					}
					action={
						<Button
							type="button"
							className="h-16 w-80 px-5 py-1"
							variant="solid"
							color="primary"
							onClick={refresh}
						>
							Refresh
						</Button>
					}
				/>
			)
	}
}
