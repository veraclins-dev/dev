import  { type getUserById } from '#app/utils/user/user.server'

export type UserProfile = NonNullable<Awaited<ReturnType<typeof getUserById>>>
