# create-veraclins-app

A CLI tool to scaffold new Veraclins-based applications from the starter template.

## Installation

```bash
npm install -g create-veraclins-app
```

Or use with `npx` (recommended):

```bash
npx create-veraclins-app my-app
```

## Development

### Building the CLI

Before building, ensure the `veraclins-template` repository is available at the same level as this package:

```bash
# Install dependencies
npm install

# Copy templates from veraclins-template repository
npm run copy-templates

# Build the CLI
npm run build
```

The templates are bundled directly in the CLI package, so the published package is self-contained and doesn't require external dependencies.

## Usage

### Interactive Mode

```bash
npx create-veraclins-app my-app
```

This will prompt you for:
- Project name
- Description
- Author
- OAuth providers
- Features to include
- Database type
- Email provider
- Storage provider
- Deployment target
- Package manager

### Non-Interactive Mode

```bash
npx create-veraclins-app my-app \
  --auth github,google \
  --features notifications,admin \
  --database postgresql \
  --email resend \
  --storage firebase \
  --deployment fly.io \
  --package-manager pnpm \
  --skip-install
```

## Options

- `--auth <providers>` - OAuth providers (comma-separated: github,google,facebook,twitter)
- `--features <features>` - Features to include (comma-separated: notifications,admin,search,activity-logging,multi-tenant,invitations,reporting)
- `--database <type>` - Database type (postgresql|sqlite)
- `--email <provider>` - Email provider (resend|sendgrid|none)
- `--storage <provider>` - Storage provider (firebase|s3|local)
- `--deployment <target>` - Deployment target (fly.io|vercel|railway|none)
- `--package-manager <pm>` - Package manager (npm|pnpm|yarn)
- `--skip-install` - Skip dependency installation

## Features

The CLI supports the following optional features:

- **notifications** - Notifications system
- **admin** - Admin dashboard
- **search** - Search functionality
- **activity-logging** - Activity logging
- **multi-tenant** - Multi-tenant support
- **invitations** - Invitation system
- **reporting** - Reporting & moderation

## Next Steps

After creating your project:

```bash
cd my-app
npm install  # if --skip-install was used
npm run setup
npm run dev
```

## License

MIT
