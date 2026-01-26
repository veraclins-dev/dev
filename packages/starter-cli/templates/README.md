# Template Source Structure

This directory contains the source files for the starter template, organized into base files, optional feature modules, service integrations, and deployment configurations.

## Directory Structure

```
template-source/
├── base/                    # Always included in generated projects
│   ├── app/                 # Application code (routes, components, utils)
│   ├── prisma/              # Database schema and migrations
│   ├── server/              # Server configuration and utilities
│   └── tests/               # Test utilities and setup
├── features/                # Optional feature modules
│   ├── notifications/       # Notification system
│   ├── admin/              # Admin dashboard
│   ├── search/             # Search functionality
│   ├── activity-logging/   # Activity tracking
│   ├── multi-tenant/       # Multi-tenant support
│   ├── invitations/        # Invitation system
│   ├── reporting/          # Content reporting
│   └── moderation/         # Moderation system
├── services/                # Service integrations
│   ├── email/              # Email provider integrations (Resend, SendGrid)
│   ├── storage/            # Storage provider integrations (Firebase, S3)
│   └── monitoring/         # Monitoring integrations (Sentry)
└── configs/                 # Deployment configurations
    ├── fly.io/             # Fly.io deployment config
    ├── vercel/             # Vercel deployment config
    └── railway/             # Railway deployment config
```

## Usage

Files from this directory will be copied to generated projects based on:
- **Base files:** Always included
- **Feature modules:** Included based on feature flags
- **Service integrations:** Included based on selected providers
- **Deployment configs:** Included based on deployment target

## Next Steps

1. Extract base files from edulinksng (Phase 1.3)
2. Create feature modules (Phase 1.4)
3. Create service integrations (Phase 1.5)

