# Service Integrations

Service provider integrations that can be selected during project generation.

## Available Services

### Email Providers
- **email/resend/** - Resend email service integration
- **email/sendgrid/** - SendGrid email service integration

### Storage Providers
- **storage/firebase/** - Firebase Storage integration
- **storage/s3/** - AWS S3 integration

### Monitoring Providers
- **monitoring/sentry/** - Sentry error tracking and monitoring

## Usage

Each service integration should include:
- Configuration files
- Service-specific utilities
- Environment variable templates
- Documentation

Only one provider per service type is included based on user selection during generation.

