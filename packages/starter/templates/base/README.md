# Base Template

Files in this directory are **always included** in every generated project. These are the core, universal features that every application needs.

## Structure

- **app/** - Application code (routes, components, utilities, hooks)
- **prisma/** - Database schema, migrations, and seed files
- **server/** - Server configuration, middleware, and utilities
- **tests/** - Test utilities, fixtures, and setup files

## What Goes Here

- Authentication & authorization
- Database setup (Prisma + PostgreSQL)
- Server infrastructure
- UI foundation
- Form handling
- Email system
- File upload utilities
- Testing infrastructure

## What Doesn't Go Here

- Project-specific features (Q&A, groups, etc.)
- Optional features (notifications, admin, etc.) - these go in `features/`
- Service-specific code - these go in `services/`
