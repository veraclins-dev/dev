# Email Service Integration

**Provider Options:** `resend` | `sendgrid` | `none`
**Feature Flag:** `EMAIL_PROVIDER`

---

## Overview

The email service provides a unified interface for sending emails across different providers. Currently supports:

- **Resend** - Modern email API (recommended)
- **SendGrid** - Enterprise email service
- **None** - Mock mode for development

---

## Usage

### Initialization

Initialize the email provider in your server setup:

```typescript
// server/index.ts or app/entry.server.tsx
import { initializeEmailProvider } from '#app/services/email'

const emailProvider = process.env.EMAIL_PROVIDER || 'resend'
const emailApiKey = process.env.RESEND_API_KEY || process.env.SENDGRID_API_KEY || ''
const emailFrom = process.env.EMAIL_FROM || 'noreply@example.com'

initializeEmailProvider(emailProvider, {
	apiKey: emailApiKey,
	defaultFrom: emailFrom,
})
```

### Sending Emails

```typescript
import { sendEmail } from '#app/services/email'
import { WelcomeEmail } from '#app/components/emails/welcome-email'

// Using React Email component
const result = await sendEmail({
	to: 'user@example.com',
	subject: 'Welcome!',
	react: <WelcomeEmail name="John" />,
})

// Using HTML/Text
const result = await sendEmail({
	to: 'user@example.com',
	subject: 'Welcome!',
	html: '<h1>Welcome!</h1>',
	text: 'Welcome!',
})
```

### Environment Variables

```bash
# Email Provider Selection
EMAIL_PROVIDER=resend  # or 'sendgrid' or 'none'

# Resend Configuration
RESEND_API_KEY=re_xxxxx
EMAIL_FROM=support@example.com

# SendGrid Configuration (if using SendGrid)
SENDGRID_API_KEY=SG.xxxxx
```

---

## Provider-Specific Notes

### Resend

- Modern, developer-friendly API
- Built-in React Email support
- Recommended for most projects

### SendGrid

- Enterprise-grade email service
- Higher rate limits
- More complex setup

### None

- Mock mode for development
- Logs emails to console
- Returns success without sending

---

## Template Variables

When generating from template, replace:

- `{{EMAIL_PROVIDER}}` - Selected provider
- `{{EMAIL_FROM}}` - Default from address
- `{{RESEND_API_KEY}}` - Resend API key (if using Resend)
- `{{SENDGRID_API_KEY}}` - SendGrid API key (if using SendGrid)

---

**Last Updated:** 2025-12-18
