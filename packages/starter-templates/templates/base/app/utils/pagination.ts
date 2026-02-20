const DEFAULT_TAKE = 25

export function getPaginationParams(searchParams: URLSearchParams) {
	const page = Math.max(1, Number(searchParams.get('page')) || 1)
	const take = Math.min(100, Math.max(1, Number(searchParams.get('take')) || DEFAULT_TAKE))
	const skip = (page - 1) * take
	return { skip, take }
}
