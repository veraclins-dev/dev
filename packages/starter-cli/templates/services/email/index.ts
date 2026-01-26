// ============================================================================
// EMAIL SERVICE ABSTRACTION
// ============================================================================

import { type EmailProvider, type SendEmailInput, type SendEmailResult } from './types'
import { ResendEmailProvider } from './resend'
import { SendGridEmailProvider } from './sendgrid'

let emailProviderInstance: {
	sendEmail: (input: SendEmailInput) => Promise<SendEmailResult>
} | null = null

export function initializeEmailProvider(
	provider: EmailProvider,
	config: {
		apiKey: string
		defaultFrom: string
	},
) {
	switch (provider) {
		case 'resend':
			emailProviderInstance = new ResendEmailProvider(
				config.apiKey,
				config.defaultFrom,
			)
			break
		case 'sendgrid':
			emailProviderInstance = new SendGridEmailProvider(
				config.apiKey,
				config.defaultFrom,
			)
			break
		case 'none':
			emailProviderInstance = {
				async sendEmail() {
					console.warn('Email provider not configured. Email not sent.')
					return {
						status: 'success',
						data: { id: 'no-provider' },
					} as const
				},
			}
			break
		default:
			throw new Error(`Unknown email provider: ${provider}`)
	}
}

export async function sendEmail(
	input: SendEmailInput,
): Promise<SendEmailResult> {
	if (!emailProviderInstance) {
		throw new Error(
			'Email provider not initialized. Call initializeEmailProvider() first.',
		)
	}

	return emailProviderInstance.sendEmail(input)
}

// Re-export types
export type { EmailProvider, SendEmailInput, SendEmailResult } from './types'
