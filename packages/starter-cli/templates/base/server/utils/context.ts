import { createContext, type ServerBuild } from 'react-router'

export const serverBuildContext = createContext<
	() => Promise<{
		build: ServerBuild
		error: unknown
	}>
>()
