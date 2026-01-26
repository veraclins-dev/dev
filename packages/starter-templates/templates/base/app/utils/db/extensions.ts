import { Prisma } from '../../../generated/prisma/client'

const SOFT_DELETABLE_MODELS = ['User'] as const

const FILTERABLE_OPERATIONS = [
	'findMany',
	'updateMany',
	'findFirst',
	'findUnique',
	'count',
] as const

const RELATION_INCLUDE_OPERATIONS = ['findMany', 'findFirst'] as const

function shouldFilterModel(model: string): boolean {
	return SOFT_DELETABLE_MODELS.includes(
		model as (typeof SOFT_DELETABLE_MODELS)[number],
	)
}

function shouldFilterOperation(operation: string): boolean {
	return FILTERABLE_OPERATIONS.includes(
		operation as (typeof FILTERABLE_OPERATIONS)[number],
	)
}

function shouldFilterIncludes(operation: string): boolean {
	return RELATION_INCLUDE_OPERATIONS.includes(
		operation as (typeof RELATION_INCLUDE_OPERATIONS)[number],
	)
}

function addDeletedAtFilter(where: Record<string, unknown>): void {
	if (where.deletedAt === undefined) {
		const notFilter = where.NOT
		const hasNotFilter =
			notFilter &&
			(!Array.isArray(notFilter) ||
				(typeof notFilter === 'object' &&
					notFilter !== null &&
					'deletedAt' in notFilter &&
					notFilter.deletedAt !== undefined))

		if (!hasNotFilter) {
			where.deletedAt = null
		}
	}
}

export const excludeDeleted = Prisma.defineExtension({
	name: 'ExcludeDeleted',
	query: {
		$allModels: {
			$allOperations({ model, operation, args, query }) {
				if (!shouldFilterModel(model) || !shouldFilterOperation(operation)) {
					return query(args)
				}

				const argsWithWhere = args as { where?: Record<string, unknown> }
				if (argsWithWhere.where) {
					addDeletedAtFilter(argsWithWhere.where)
				} else {
					;(args as { where: Record<string, unknown> }).where = {
						deletedAt: null,
					}
				}

				return query(args)
			},
		},
	},
})
