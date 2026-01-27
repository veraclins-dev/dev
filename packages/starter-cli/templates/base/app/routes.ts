import { type RouteConfig } from '@react-router/dev/routes'
import { remixRoutesOptionAdapter } from '@react-router/remix-routes-option-adapter'
import { dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { flatRoutes } from 'remix-flat-routes'

// Get the app directory (where routes.ts is located)
const appDir = dirname(fileURLToPath(import.meta.url))
// Calculate app directory relative to workspace root (process.cwd())
const appDirRelative = relative(process.cwd(), appDir)

export default remixRoutesOptionAdapter((defineRoutes) => {
	// Configure appDir to point to the app directory relative to workspace root
	// This tells remix-flat-routes where to find the app directory
	return flatRoutes('routes', defineRoutes, {
		appDir: appDirRelative,
		ignoredRouteFiles: [
			'.*',
			'**/*.css',
			'**/*.test.{js,jsx,ts,tsx}',
			'**/__*.*',
			// This is for server-side utilities you want to colocate
			// next to your routes without making an additional
			// directory. If you need a route that includes "server" or
			// "client" in the filename, use the escape brackets like:
			// my-route.[server].tsx
			'**/*.server.*',
			'**/*.client.*',
			// This is for route level components you want to colocate with
			// your routes in a components directory.
			'**/components/**',
		],
	})
}) satisfies RouteConfig
