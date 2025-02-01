import { z } from '../../../validations';

const SocialsProvider = {
  DISCORD: 'discord',
  FACEBOOK: 'facebook',
  GITHUB: 'github',
  GOOGLE: 'google',
  MICROSOFT: 'microsoft',
  TWITTER: 'twitter',
  TWITTER2: 'twitter2',
  LINKEDIN: 'linkedin',
} as const;

// to add another provider, set their name here and add it to the providerNames below

export const providerNames = [
  SocialsProvider.GOOGLE,
  SocialsProvider.FACEBOOK,
  SocialsProvider.TWITTER,
  SocialsProvider.GITHUB,
] as const;

export const ProviderName = z.enum(providerNames);
export type ProviderName = z.infer<typeof ProviderName>;

export const providerLabels: Record<ProviderName, string> = {
  [SocialsProvider.GOOGLE]: 'Google',
  [SocialsProvider.FACEBOOK]: 'Facebook',
  [SocialsProvider.TWITTER]: 'Twitter',
  [SocialsProvider.GITHUB]: 'GitHub',
} as const;

export const providerColors: Record<ProviderName, string> = {
  [SocialsProvider.GOOGLE]: 'bg-white text-brand-gray',
  [SocialsProvider.FACEBOOK]: 'bg-facebook-500',
  [SocialsProvider.TWITTER]: 'bg-twitter-500',
  [SocialsProvider.GITHUB]: 'bg-black',
} as const;

export const getCallback = (provider: ProviderName) => {
  return `http://localhost:3000/${provider}/callback`;
};

export type ConnectionType = 'Connect' | 'Login' | 'Signup';
