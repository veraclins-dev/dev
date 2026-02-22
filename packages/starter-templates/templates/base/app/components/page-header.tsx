import {
	Box,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
	Typography,
} from '@veraclins-dev/ui'
import { humanize, truncate } from '@veraclins-dev/utils'
import { Fragment } from 'react'
import { Link as RouterLink, type UIMatch, useMatches } from 'react-router'

import type { BreadcrumbType, PageHandle } from '#app/common/types'

interface BreadcrumbsProps {
	breadcrumbs: BreadcrumbType[]
	className?: string
}

type Page = PageHandle & {
	breadcrumb: BreadcrumbType
}

function Breadcrumbs({ breadcrumbs, className }: BreadcrumbsProps) {
	const currentPage = breadcrumbs.pop()

	return currentPage ? (
		<Breadcrumb className={className}>
			<BreadcrumbList>
				{breadcrumbs.map((breadcrumb) => (
					<Fragment key={breadcrumb.to}>
						<BreadcrumbItem>
							<BreadcrumbLink component={RouterLink} to={breadcrumb.to}>
								{truncate(breadcrumb.label.replaceAll('-', ' '), 30).replaceAll(
									' ',
									'-',
								)}
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
					</Fragment>
				))}
				<BreadcrumbItem>
					<BreadcrumbPage>{currentPage.label}</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	) : null
}

interface PageHeaderProps {
	className?: string
	noPadding?: boolean
}

export function PageHeader({ className, noPadding = false }: PageHeaderProps) {
	const matches = useMatches() as UIMatch<unknown, PageHandle>[]

	const pages = matches
		.map((match, index) => {
			const { handle, pathname } = match
			const nextMatch = matches[index + 1]
			const nextPathname =
				nextMatch?.pathname.endsWith('/') && nextMatch?.pathname !== '/'
					? nextMatch.pathname.slice(0, -1)
					: nextMatch?.pathname

			const hasBreadcrumb = handle?.breadcrumb !== undefined
			const hasDuplicatePath = nextPathname === pathname

			if ((!hasBreadcrumb && hasDuplicatePath) || handle?.skipInBreadcrumb) {
				return null
			}

			return {
				header: handle?.header ?? '',
				description: handle?.description ?? '',
				breadcrumb: {
					label:
						handle?.breadcrumb ?? humanize(pathname.split('/').pop() || 'Home'),
					to: pathname,
				},
				actions: handle?.actions,
			}
		})
		.filter(Boolean) as Page[]

	const breadcrumbs = pages.map((page) => page.breadcrumb)
	const actions = pages
		.map((page) => page.actions)
		.filter((action) => action !== undefined)
		.pop()
	const currentPage = pages.pop()

	return (
		<Box
			px={noPadding ? 0 : 6}
			py={3}
			display="flex"
			flexDirection="column"
			gap={2}
		>
			<Breadcrumbs breadcrumbs={breadcrumbs} className={className} />
			{currentPage?.header && (
				<Box
					display="flex"
					justify="between"
					gap={2}
					className="flex-col items-start md:flex-row md:items-center"
				>
					<Box>
						<Typography variant="h3">{currentPage?.header}</Typography>
						<Typography className="text-foreground/80">
							{currentPage?.description}
						</Typography>
					</Box>
					{actions && (
						<Box display="flex" gap={2} className="self-end">
							{actions}
						</Box>
					)}
				</Box>
			)}
		</Box>
	)
}
