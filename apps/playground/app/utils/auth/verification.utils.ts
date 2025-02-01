import { z } from '../../validations';

import { VerificationType } from './validations';

export const twoFAVerificationType = '2fa' satisfies VerificationTypes;

export const codeQueryParam = 'code';
export const targetQueryParam = 'target';
export const typeQueryParam = 'type';
export const referralQueryParam = 'referral';
export const channelQueryParam = 'channel';
export type VerificationTypes = z.infer<typeof VerificationType>;
export const onboardingEmailSessionKey = 'onboardingEmail';
export const resetPasswordUsernameSessionKey = 'resetPasswordUsername';
export const newEmailAddressSessionKey = 'new-email-address';
export const unverifiedSessionIdKey = 'unverified-session-id';

export const Verify = z.object({
  [codeQueryParam]: z.string().min(6).max(6),
  [typeQueryParam]: VerificationType,
  [targetQueryParam]: z.string(),
  [channelQueryParam]: z.string().optional(),
  [referralQueryParam]: z.string().length(8).optional(),
  redirectTo: z.string().optional(),
});
