# @veraclins-dev/starter-nx

Nx generator for scaffolding new applications from the starter template.

## Usage

```bash
nx g @veraclins-dev/starter-nx:app my-new-app
```

## Options

- `name` (required) - Application name
- `description` - Application description
- `features` - Feature modules to include (notifications, admin, search, etc.)
- `database` - Database type (postgresql, sqlite)
- `emailProvider` - Email service provider (resend, sendgrid, none)
- `storageProvider` - Storage provider (firebase, s3, local, none)
- `monitoringProvider` - Monitoring provider (sentry, none)
- `deploymentTarget` - Deployment target (fly.io, vercel, railway, docker, none)

## Example

```bash
nx g @veraclins-dev/starter-nx:app my-app \
  --features=notifications,admin \
  --emailProvider=resend \
  --storageProvider=firebase \
  --deploymentTarget=fly.io
```
