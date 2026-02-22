import { useCustomFetcher } from '@veraclins-dev/form'
import { Box } from '@veraclins-dev/ui'
import { useCallback, useEffect, useState } from 'react'

import { useInfiniteScroll } from '#app/hooks/use-infinite-scroll'
import { PAGE_DATA_DEFAULTS } from '#app/utils/constants'
import { type PaginateResult } from '#app/utils/db/types'

type PageInfo = {
	take?: number
	skip?: number
	hasMore: boolean
}

type FetcherData<T> = {
	page: Pick<PaginateResult<T>, 'nextPage' | 'hasMore' | 'items'>
}

type Items<T> = FetcherData<T>['page']['items']

type ItemWithId = {
	id: string
}

type Props<T extends ItemWithId> = {
	children: React.ReactNode
	url: string
	pageData: PageInfo
	items: Items<T>
	updateItems: (data: Items<T>) => void
	loader?: React.ReactNode
}

export function InfiniteLoader<T extends ItemWithId>({
	children,
	pageData,
	url,
	loader,
	updateItems,
	items,
}: Props<T>) {
	const [pageInfo, setPageInfo] = useState({
		...pageData,
		skip: pageData?.skip ?? PAGE_DATA_DEFAULTS.skip,
		take: pageData?.take ?? PAGE_DATA_DEFAULTS.take,
	})

	const { hasMore, skip, take } = pageInfo

	const { load, loading, data } = useCustomFetcher<FetcherData<T>>()

	const handleUpdate = useCallback(
		(data: Items<T>) => {
			const newItems = data.filter((d) => !items.some((i) => i.id === d.id))
			updateItems([...items, ...newItems])
		},
		[items, updateItems],
	)

	const loadMore = useCallback(() => {
		if (!hasMore || loading) return

		const urlPath = new URL(url)
		urlPath.searchParams.set('take', String(take))
		urlPath.searchParams.set('skip', String(skip))

		void load(urlPath.pathname + urlPath.search)
	}, [hasMore, loading, skip, take, url, load])

	const { lastElementRef: ref } = useInfiniteScroll({
		loadMoreFunc: loadMore,
		hasMore,
		loading,
	})

	useEffect(() => {
		if (!data) return

		const { page } = data
		setPageInfo((prev) => ({
			...prev,
			...page.nextPage,
			hasMore: page.hasMore,
		}))

		handleUpdate(page.items)
	}, [data, handleUpdate])

	return (
		<>
			{children}
			{hasMore && loading && loader != null && loader}
			<Box ref={ref} />
		</>
	)
}
