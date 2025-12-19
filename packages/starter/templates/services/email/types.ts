// ============================================================================
// EMAIL SERVICE TYPES
// ============================================================================

import { type ReactElement } from 'react'

export type EmailProvider = 'resend' | 'sendgrid' | 'none'

export interface EmailOptions {
	to: string | string[]
	subject: string
	from?: string
	replyTo?: string
	cc?: string | string[]
	bcc?: string | string[]
}

export interface EmailWithHtml extends EmailOptions {
	html: string
	text: string
	react?: never
}

export interface EmailWithReact extends EmailOptions {
	react: ReactElement
	html?: never
	text?: never
}

export type SendEmailInput = EmailWithHtml | EmailWithReact

export interface EmailSuccessResponse {
	status: 'success'
	data: {
		id: string
	}
}

export interface EmailErrorResponse {
	status: 'error'
	error: {
		name: string
		message: string
		statusCode: number
		cause?: unknown
	}
}

export type SendEmailResult = EmailSuccessResponse | EmailErrorResponse

export interface EmailProviderInterface {
	sendEmail(input: SendEmailInput): Promise<SendEmailResult>
}
