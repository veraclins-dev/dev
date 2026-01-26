export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type NonEmptyArray<T> = [T, ...T[]]

export type Maybe<T> = T | null
export type MaybeString = Maybe<string>

export type Nullable<T> = {
	[P in keyof T]: Maybe<T[P]>
}
