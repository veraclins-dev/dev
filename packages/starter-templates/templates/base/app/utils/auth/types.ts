import { type getDbSession } from './auth.server'

export type Session = Awaited<ReturnType<typeof getDbSession>>
