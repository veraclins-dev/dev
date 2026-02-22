import { z } from '#app/validations/index'
import { REDIRECT_TO_FIELD } from '../constants'
import { VerificationType } from '../user/validations'

export const twoFAVerificationType = '2fa' satisfies VerificationTypes

export const codeQueryParam = 'code'
export const targetQueryParam = 'target'
export const typeQueryParam = 'type'
export type VerificationTypes = z.infer<typeof VerificationType>
export const onboardingEmailSessionKey = 'onboardingEmail'
export const resetPasswordUsernameSessionKey = 'resetPasswordUsername'
export const newEmailAddressSessionKey = 'new-email-address'
export const unverifiedSessionIdKey = 'unverified-session-id'

export const Verify = z.object({
	[codeQueryParam]: z.string().min(6).max(6),
	[typeQueryParam]: VerificationType,
	[targetQueryParam]: z.string(),
	[REDIRECT_TO_FIELD]: z.string().optional(),
})
