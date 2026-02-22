import { createContext } from 'react-router'

import { type UserProfile } from '#app/utils/user/types'
import { type Session } from './types'

/**
 * Session context - stores the session object from the database.
 * Contains: id, userId, lastSeenAt, expiresAt, createdAt
 */
export const sessionContext = createContext<Session | null>(null)

/**
 * User context - stores the full user object with relations.
 * Loaded with userInclude: role (with permissions).
 * Uses UserProfile type which includes all relations.
 */
export const userContext = createContext<UserProfile | null>(null)

/**
 * User ID context - stores just the user ID string.
 * Useful for cases where we only need the ID without full user object.
 */
export const userIdContext = createContext<string | null>(null)
