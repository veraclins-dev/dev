import { createContext } from 'react-router'
import { type User } from '#app/utils/db/types'
import { type Session } from './types'

export const sessionContext = createContext<Session | null>(null)

export const userContext = createContext<User | null>(null)

export const userIdContext = createContext<string | null>(null)
