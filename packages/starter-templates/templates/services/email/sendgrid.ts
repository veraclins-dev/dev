// ============================================================================
// SENDGRID EMAIL PROVIDER
// ============================================================================

import { render } from '@react-email/components'
import { type ReactElement } from 'react'

import {
	type EmailProviderInterface,
	type SendEmailInput,
	type SendEmailResult,
} from './types'

async function renderReactEmail(react: ReactElement) {
	const [html, text] = await Promise.all([
		render(react),
		render(react, { plainText: true }),
	])
	return { html, text }
}

export class SendGridEmailProvider implements EmailProviderInterface {
	private apiKey: string
	private defaultFrom: string

	constructor(apiKey: string, defaultFrom: string) {
		this.apiKey = apiKey
		this.defaultFrom = defaultFrom
	}

	async sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
		const from = input.from || this.defaultFrom

		const email = {
			personalizations: [
				{
					to: Array.isArray(input.to) ? input.to : [{ email: input.to }],
					cc: input.cc
						? Array.isArray(input.cc)
							? input.cc.map((email) => ({ email }))
							: [{ email: input.cc }]
						: undefined,
					bcc: input.bcc
						? Array.isArray(input.bcc)
							? input.bcc.map((email) => ({ email }))
							: [{ email: input.bcc }]
						: undefined,
				},
			],
			from: { email: from },
			subject: input.subject,
			content: input.react
				? await renderReactEmail(input.react).then(({ html, text }) => [
						{ type: 'text/plain', value: text },
						{ type: 'text/html', value: html },
					])
				: [
						{ type: 'text/plain', value: input.text },
						{ type: 'text/html', value: input.html },
					],
			replyTo: input.replyTo ? { email: input.replyTo } : undefined,
		}

		// Mock mode if API key not set
		if (!this.apiKey && !process.env.MOCKS) {
			console.error(`SENDGRID_API_KEY not set and we're not in mocks mode.`)
			console.error(
				`To send emails, set the SENDGRID_API_KEY environment variable.`,
			)
			console.error(`Would have sent the following email:`, JSON.stringify(email))
			return {
				status: 'success',
				data: { id: 'mocked' },
			} as const
		}

		const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
			method: 'POST',
			body: JSON.stringify(email),
			headers: {
				Authorization: `Bearer ${this.apiKey}`,
				'Content-Type': 'application/json',
			},
		})

		if (response.ok) {
			const messageId = response.headers.get('x-message-id') || 'unknown'
			return {
				status: 'success',
				data: { id: messageId },
			} as const
		} else {
			const data = await response.json()
			return {
				status: 'error',
				error: {
					name: 'SendGridError',
					message: data.errors?.[0]?.message || 'Failed to send email',
					statusCode: response.status,
					cause: data,
				},
			} as const
		}
	}
}
