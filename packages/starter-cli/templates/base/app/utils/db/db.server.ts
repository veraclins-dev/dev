import { styleText } from 'node:util'
import { PrismaPg } from '@prisma/adapter-pg'

import { invariant } from '@veraclins-dev/utils'
import { excludeDeleted } from '#app/utils/db/extensions.ts'
import { singleton } from '#app/utils/db/singleton.server.ts'
import { PrismaClient } from '#generated/prisma/client'

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL,
})

const logThreshold = 10
const getColor = (duration: number) => {
	if (duration < logThreshold) return 'green'
	if (duration < logThreshold * 1.1) return 'blue'
	if (duration < logThreshold * 1.2) return 'yellow'
	if (duration < logThreshold * 1.3) return 'redBright'
	if (duration < logThreshold * 1.4) return 'red'
	return 'red'
}

export const db = singleton('prisma', () => {
	const client = new PrismaClient({
		adapter,
		log: [
			{ level: 'query', emit: 'event' },
			{ level: 'error', emit: 'stdout' },
			{ level: 'warn', emit: 'stdout' },
		],
		transactionOptions: {
			timeout: 10000,
		},
	})

	client.$on('query', (e) => {
		if (e.duration < logThreshold) return
		const color = getColor(e.duration)
		const dur = styleText(color, `${e.duration.toFixed(2)}ms`)
		console.info(`prisma:query - ${dur}: ${e.query}`)
	})

	const extended = client.$extends(excludeDeleted) as unknown as Omit<
		typeof client,
		'$on' | '$use'
	>

	extended.$connect()
	return extended
})

export type BasePaginateArgs = {
	skip?: number
	take?: number
	maxTake?: number
}

export type PaginateArgs<QueryResult> = {
	skip?: number
	take?: number
	maxTake?: number
	count: () => Promise<number>
	query: (args: { skip: number; take: number }) => Promise<QueryResult>
}

const isInteger = (value: unknown) =>
	typeof value === 'number' && value % 1 === 0

export async function paginate<QueryResult>({
	skip = 0,
	take = 10,
	count: countQuery,
	maxTake = 250,
	query,
}: PaginateArgs<QueryResult>) {
	invariant(isInteger(skip), '`skip` argument must be an integer')
	invariant(isInteger(take), '`take` argument must be an integer')
	invariant(isInteger(maxTake), '`maxTake` argument must be an integer')
	invariant(
		typeof countQuery === 'function',
		'`count` argument must be a function',
	)
	invariant(typeof query === 'function', '`query` argument must be a function')
	invariant(skip >= 0, '`skip` argument must be a positive number')
	invariant(take >= 0, '`take` argument must be a positive number')
	invariant(
		take <= maxTake,
		`'take' argument must less than 'maxTake' which is currently '${maxTake}'`,
	)

	const [count, items] = await Promise.all([
		countQuery(),
		query({ skip, take }),
	])

	const hasMore = skip + take < count
	const nextPage = hasMore ? { take, skip: skip + take } : null
	const pageCount = Math.floor((count + take - 1) / take)
	const from = skip + 1
	const to = skip + take

	return {
		items,
		nextPage,
		hasMore,
		pageCount,
		pageSize: take,
		from,
		to,
		count,
	}
}

export { Prisma } from '#generated/prisma/client'

export * from '#generated/prisma/sql'
