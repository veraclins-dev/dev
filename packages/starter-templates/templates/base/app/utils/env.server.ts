import { z } from '../validations/index';

const schema = z.object({
	NODE_ENV: z.enum(['production', 'development', 'test'] as const),
	DATABASE_URL: z.string(),
	SESSION_SECRET: z.string(),
	HONEYPOT_SECRET: z.string(),
	HOST: z.string(),
	SENTRY_DSN: z.string().optional(),
	RESEND_API_KEY: z.string().optional(),
	EMAIL_FROM: z.string().optional(),
	APP_NAME: z.string().optional(),
})

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace NodeJS {
		type ProcessEnv = z.infer<typeof schema>
	}
}

export function init() {
	const parsed = schema.safeParse(process.env)

	if (parsed.success === false) {
		console.error(
			'❌ Invalid environment variables:',
			z.treeifyError(parsed.error),
		)

		throw new Error('Invalid environment variables')
	}
}

export function getEnv() {
	return {
		MODE: process.env.NODE_ENV,
		SENTRY_DSN: process.env.SENTRY_DSN,
		HOST: process.env.HOST,
		SCHEME: 'http',
	}
}

type ENV = ReturnType<typeof getEnv>

declare global {
	var ENV: ENV
	interface Window {
		ENV: ENV
	}
}
