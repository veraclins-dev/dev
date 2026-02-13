import { useNavigate, useSearchParams } from 'react-router'

import { Form, useConform } from '@veraclins-dev/form'
import { TextField } from '@veraclins-dev/ui'

import { SearchSchema } from '../../utils/search/search.server'

interface SearchInputProps {
	placeholder?: string
	resource?: string
	className?: string
	onSearch?: (query: string) => void
}

export function SearchInput({
	placeholder = 'Search...',
	resource,
	className,
	onSearch,
}: SearchInputProps) {
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const { form, fields } = useConform({
		id: 'search-form',
		schema: SearchSchema,
		defaultValue: {
			search: searchParams.get('q') || searchParams.get('search') || '',
		},
	})

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const query = formData.get('search') as string

		if (onSearch) {
			onSearch(query)
		} else {
			const params = new URLSearchParams()
			params.set('q', query)
			if (resource) {
				params.set('resource', resource)
			}
			navigate(`/search?${params.toString()}`)
		}
	}

	return (
		<Form
			form={form}
			onSubmit={handleSubmit}
			method="GET"
			action="/search"
			noButtons
			noError
			className={className}
		>
			<TextField
				field={fields.search}
				placeholder={placeholder}
				type="search"
				autoComplete="off"
			/>
		</Form>
	)
}
