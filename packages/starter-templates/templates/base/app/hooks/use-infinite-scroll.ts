import { useCallback, useRef } from 'react'

type UseInfiniteScroll = {
	loading: boolean
	hasMore: boolean
	loadMoreFunc: () => void
}

/**
 * `useInfiniteScroll` is a custom hook for implementing infinite scroll functionality.
 *
 * It observes the last element in a list and automatically calls the provided `loadMoreFunc`
 * when the element becomes visible in the viewport, provided that loading is not in progress
 * and there are more items to load (`hasMore`).
 *
 * Attach the returned `lastElementRef` to the last item in your rendered list.
 * When the last item enters the viewport, `loadMoreFunc` will be triggered.
 */
export const useInfiniteScroll = ({
	loadMoreFunc,
	loading,
	hasMore,
}: UseInfiniteScroll) => {
	const observer = useRef<IntersectionObserver | null>(null)

	const lastElementRef = useCallback(
		(node: HTMLElement | null) => {
			if (!node || loading) return
			if (observer.current) observer.current.disconnect()
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0]?.isIntersecting && hasMore) {
					loadMoreFunc()
				}
			})
			observer.current.observe(node)
		},
		[loading, hasMore, loadMoreFunc],
	)

	return {
		lastElementRef,
	}
}
