# create-veraclins-app

A CLI tool to scaffold new Veraclins-based applications from the starter template.

## Installation

```bash
npm install -g @veraclins-dev/starter-cli
```

Then run `create-veraclins-app my-app`. Or use with `npx` (recommended, no install):

```bash
npx @veraclins-dev/starter-cli my-app
```

## Development

### Building the CLI

Templates come from the single source of truth, `packages/starter-templates/templates`. At build time they are copied directly into `dist/packages/starter-cli/templates` (no copy under `packages/starter-cli`).

```bash
# Install dependencies
npm install

# Build the CLI (compiles TS, then copies templates from starter-templates to dist)
nx run starter-cli:build
```

The built package is self-contained; templates live under `dist/packages/starter-cli/templates`.

## Usage

### Interactive Mode

```bash
npx @veraclins-dev/starter-cli my-app
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

The generator will also create a `.env` file with values derived from your choices (including generated `SESSION_SECRET` and `HONEYPOT_SECRET`) and will run `git init` with a `.gitignore` if the project directory is not already a git repository. For PostgreSQL, `npm run setup` (and `npm run dev` the first time) will create the database with the same name as the project if it does not already exist; for SQLite no separate create step is needed.

### Non-Interactive Mode

```bash
npx @veraclins-dev/starter-cli my-app \
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
