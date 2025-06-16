import { useMemo } from 'react'
import { useMatches } from 'react-router'

/**
 * This hook is used to quickly search for all the matched pathnames.
 * @returns {string[] } The matched pathnames
 */
export function useMatchesPath(): string[] {
	const matchingRoutes = useMatches()
	const routes = useMemo(
		() => matchingRoutes.map((route) => route.pathname),
		[matchingRoutes],
	)
	return routes
}

/**
 * This hook is used to quickly search for all the matched pathnames.
 * @returns {string[] } The matched pathnames
 */
export function useMatchesId(): string[] {
	const matchingRoutes = useMatches()
	const routes = useMemo(
		() => matchingRoutes.map((route) => route.id),
		[matchingRoutes],
	)
	return routes
}
