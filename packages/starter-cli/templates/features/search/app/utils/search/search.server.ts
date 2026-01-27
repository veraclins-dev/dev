import { badRequest } from '@veraclins-dev/react-utils/server'

import { db } from '../../db/db.server'
import { z } from '../../validations/index'

import {
	type SearchConfig,
	type SearchOptions,
	type SearchResult,
	type SearchResults,
} from './types'

const DEFAULT_MIN_LENGTH = 3
const DEFAULT_MAX_RESULTS = 50

const searchHandlers = new Map<string, SearchConfig>()

export function registerSearchHandler(config: SearchConfig) {
	searchHandlers.set(config.resource, config)
}

export function getSearchHandler(resource: string): SearchConfig | undefined {
	return searchHandlers.get(resource)
}

export function getAllSearchHandlers(): SearchConfig[] {
	return Array.from(searchHandlers.values())
}

export const SearchSchema = z.object({
	search: z.string().min(1, 'Search query is required'),
	resource: z.string().optional(),
	skip: z.coerce.number().int().min(0).optional(),
	take: z.coerce.number().int().min(1).max(100).optional(),
})

export async function search(
	query: string,
	resource?: string,
	options?: SearchOptions,
): Promise<SearchResults> {
	if (!query || query.trim().length === 0) {
		return {}
	}

	const trimmedQuery = query.trim()

	if (resource) {
		const config = searchHandlers.get(resource)
		if (!config) {
			throw badRequest(`Invalid search resource: ${resource}`)
		}

		if (trimmedQuery.length < (config.minLength ?? DEFAULT_MIN_LENGTH)) {
			return {
				[resource]: {
					items: [],
					count: 0,
					resource,
				},
			}
		}

		const result = await config.handler(trimmedQuery, {
			...options,
			take: options?.take ?? config.maxResults ?? DEFAULT_MAX_RESULTS,
		})

		return {
			[resource]: result,
		}
	}

	const results: SearchResults = {}
	const handlers = Array.from(searchHandlers.values())

	await Promise.all(
		handlers.map(async (config) => {
			if (trimmedQuery.length < (config.minLength ?? DEFAULT_MIN_LENGTH)) {
				results[config.resource] = {
					items: [],
					count: 0,
					resource: config.resource,
				}
				return
			}

			const result = await config.handler(trimmedQuery, {
				...options,
				take: options?.take ?? config.maxResults ?? DEFAULT_MAX_RESULTS,
			})

			results[config.resource] = result
		}),
	)

	return results
}

export async function searchUsers(
	query: string,
	options?: SearchOptions,
): Promise<SearchResult> {
	const where = {
		OR: [
			{ name: { contains: query, mode: 'insensitive' as const } },
			{ username: { contains: query, mode: 'insensitive' as const } },
			{ email: { contains: query, mode: 'insensitive' as const } },
		],
	}

	const [items, count] = await Promise.all([
		db.user.findMany({
			where,
			take: options?.take ?? DEFAULT_MAX_RESULTS,
			skip: options?.skip,
			orderBy: { createdAt: 'desc' },
			select: {
				id: true,
				username: true,
				name: true,
				email: true,
				profileImage: true,
				createdAt: true,
			},
		}),
		db.user.count({ where }),
	])

	return {
		items,
		count,
		resource: 'users',
	}
}

registerSearchHandler({
	resource: 'users',
	handler: searchUsers,
	minLength: DEFAULT_MIN_LENGTH,
	maxResults: DEFAULT_MAX_RESULTS,
})
