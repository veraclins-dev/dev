export type SearchResult<T = unknown> = {
	items: T[]
	count: number
	resource: string
}

export type SearchResults = Record<string, SearchResult>

export type SearchHandler<T = unknown> = (
	search: string,
	options?: SearchOptions,
) => Promise<SearchResult<T>>

export interface SearchOptions {
	skip?: number
	take?: number
	filters?: Record<string, unknown>
}

export interface SearchConfig {
	resource: string
	handler: SearchHandler
	minLength?: number
	maxResults?: number
}
