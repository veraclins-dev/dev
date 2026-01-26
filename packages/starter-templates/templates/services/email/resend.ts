// ============================================================================
// RESEND EMAIL PROVIDER
// ============================================================================

import { render } from '@react-email/components';
import { type ReactElement } from 'react';

import { z } from '@veraclins-dev/utils';

import {
  type EmailProviderInterface,
  type SendEmailInput,
  type SendEmailResult,
} from './types';

const resendErrorSchema = z.union([
  z.object({
    name: z.string(),
    message: z.string(),
    statusCode: z.number(),
  }),
  z.object({
    name: z.literal('UnknownError'),
    message: z.literal('Unknown Error'),
    statusCode: z.literal(500),
    cause: z.any(),
  }),
]);

const resendSuccessSchema = z.object({
  id: z.string(),
});

async function renderReactEmail(react: ReactElement) {
  const [html, text] = await Promise.all([
    render(react),
    render(react, { plainText: true }),
  ]);
  return { html, text };
}

export class ResendEmailProvider implements EmailProviderInterface {
  private apiKey: string;
  private defaultFrom: string;

  constructor(apiKey: string, defaultFrom: string) {
    this.apiKey = apiKey;
    this.defaultFrom = defaultFrom;
  }

  async sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
    const from = input.from || this.defaultFrom;

    const email = {
      from,
      to: input.to,
      subject: input.subject,
      replyTo: input.replyTo,
      cc: input.cc,
      bcc: input.bcc,
      ...(input.react ? await renderReactEmail(input.react) : null),
    };

    // Mock mode if API key not set
    if (!this.apiKey && !process.env.MOCKS) {
      console.error(`RESEND_API_KEY not set and we're not in mocks mode.`);
      console.error(
        `To send emails, set the RESEND_API_KEY environment variable.`,
      );
      console.error(
        `Would have sent the following email:`,
        JSON.stringify(email),
      );
      return {
        status: 'success',
        data: { id: 'mocked' },
      } as const;
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      body: JSON.stringify(email),
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    const parsedData = resendSuccessSchema.safeParse(data);

    if (response.ok && parsedData.success) {
      return {
        status: 'success',
        data: parsedData.data,
      } as const;
    } else {
      const parseResult = resendErrorSchema.safeParse(data);
      if (parseResult.success) {
        return {
          status: 'error',
          error: parseResult.data,
        } as const;
      } else {
        return {
          status: 'error',
          error: {
            name: 'UnknownError',
            message: 'Unknown Error',
            statusCode: 500,
            cause: data,
          },
        } as const;
      }
    }
  }
}
