# Monitoring Service Integration

**Provider Options:** `sentry` | `none`
**Feature Flag:** `MONITORING_PROVIDER`

---

## Overview

The monitoring service provides error tracking and performance monitoring. Currently supports:

- **Sentry** - Error tracking and performance monitoring
- **None** - Disabled monitoring

---

## Usage

### Server-Side Initialization

Initialize the monitoring provider in your server setup:

```typescript
// server/index.ts or server/utils/monitoring.ts
import { initializeMonitoringProvider } from '#app/services/monitoring'

const monitoringProvider = process.env.MONITORING_PROVIDER || 'sentry'

if (monitoringProvider === 'sentry' && process.env.SENTRY_DSN) {
	initializeMonitoringProvider('sentry', {
		dsn: process.env.SENTRY_DSN,
		environment: process.env.NODE_ENV || 'development',
		tracesSampleRate: process.env.NODE_ENV === 'production' ? 1.0 : 0,
	})
}
```

### Client-Side Initialization

Initialize monitoring in your client entry:

```typescript
// app/entry.client.tsx
import { initializeMonitoringClient } from '#app/services/monitoring'

if (ENV.SENTRY_DSN) {
	initializeMonitoringClient('sentry', {
		dsn: ENV.SENTRY_DSN,
		environment: ENV.MODE,
		tracesSampleRate: 1.0,
		replaysSessionSampleRate: 0.1,
		replaysOnErrorSampleRate: 1.0,
	})
}
```

### Capturing Errors

```typescript
import { captureException, captureMessage } from '#app/services/monitoring'

try {
	// Your code
} catch (error) {
	captureException(error, {
		userId: user.id,
		action: 'createPost',
	})
}

// Capture messages
captureMessage('User performed action', 'info')
```

### Setting User Context

```typescript
import { setUser } from '#app/services/monitoring'

// In your auth middleware or loader
setUser({
	id: user.id,
	email: user.email,
	username: user.username,
})
```

---

## Environment Variables

```bash
# Monitoring Provider Selection
MONITORING_PROVIDER=sentry  # or 'none'

# Sentry Configuration
SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
NODE_ENV=production
```

---

## Provider-Specific Notes

### Sentry

- Comprehensive error tracking
- Performance monitoring
- Session replay
- User context tracking
- Prisma integration
- HTTP integration
- Node profiling

### None

- Monitoring disabled
- No error tracking
- Useful for development or privacy-sensitive projects

---

## Template Variables

When generating from template, replace:

- `{{MONITORING_PROVIDER}}` - Selected provider
- `{{SENTRY_DSN}}` - Sentry DSN (if using Sentry)

---

**Last Updated:** 2025-12-18
