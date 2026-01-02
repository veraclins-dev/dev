import { useFetchers } from 'react-router'
import { useHints } from '#app/utils/client-hints'
import { useRequestInfo } from '#app/utils/request-info'
import { type Theme } from '#app/utils/theme.server'

export function useTheme() {
	const hints = useHints()
	const requestInfo = useRequestInfo()
	const optimisticMode = useOptimisticThemeMode()
	if (optimisticMode) {
		return optimisticMode === 'system' ? hints.theme : optimisticMode
	}
	return requestInfo.userPrefs.theme ?? hints.theme
}

export function useOptimisticThemeMode() {
	const fetchers = useFetchers()

	const themeFetcher = fetchers.find((f) => f.formAction === '/common/theme')

	return themeFetcher?.formData?.get('theme') as Theme | 'system'
}
