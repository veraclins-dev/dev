import type { ReactNode } from 'react'

interface InfiniteLoaderProps {
	children: ReactNode
	url: string
	items: unknown[]
	updateItems: React.Dispatch<React.SetStateAction<unknown[]>>
	pageData: { nextPage: string | null; hasMore: boolean }
}

export function InfiniteLoader({
	children,
}: Pick<InfiniteLoaderProps, 'children'>) {
	return <>{children}</>
}
