# veraclins-dev

Nx monorepo for the Veraclins UI platform. It houses shared packages, a
Playground app for interactive demos, and tooling for building, testing, and
releasing the library suite.

## Workspace layout

### Apps

- `apps/playground` - React Router app for showcasing packages and UI patterns.

### Packages

- `@veraclins-dev/ui` - UI component library and icon sprite exports.
  Docs: https://packages.veraclins.dev/ui
- `@veraclins-dev/editor` - Rich text editor components and extensions.
  Docs: https://packages.veraclins.dev/editor
- `@veraclins-dev/form` - Form helpers for Conform + React Router.
  Docs: https://packages.veraclins.dev/form
- `@veraclins-dev/image` - Image utilities (client + server).
  Docs: https://packages.veraclins.dev/image
- `@veraclins-dev/react-utils` - Shared React utilities (client + server).
  Docs: https://packages.veraclins.dev/react-utils
- `@veraclins-dev/utils` - Framework-agnostic utilities.
  Docs: https://packages.veraclins.dev/utils
- `@veraclins-dev/cva` - Class variance helpers.
  Docs: https://packages.veraclins.dev/utils/cva
- `@veraclins-dev/docs` - Documentation helpers.
  Docs: https://packages.veraclins.dev/docs
- `@veraclins-dev/remix-seo` - SEO utilities for React Router/Remix.
  Docs: https://packages.veraclins.dev/react-utils/remix-seo
- `@veraclins-dev/remix-auth-social` - Social auth helpers for Remix.
  Docs: https://packages.veraclins.dev/auth

## Tooling

- **Nx** for project orchestration and caching
- **pnpm** for dependency management
- **React 19 + React Router v7** for the app runtime
- **Vite** for builds and dev servers
- **Tailwind CSS** for styling
- **Storybook** for component documentation
- **Vitest/Jest/Playwright** for testing

## Prerequisites

- Node.js 20+
- pnpm 9+ (CI uses pnpm 10)

## Getting started

```sh
pnpm install
```

## Running tasks

Targets are inferred by Nx plugins or declared in `project.json`. To see the
available targets for a project:

```sh
pnpm exec nx show project playground --web
```

Common task patterns:

```sh
pnpm exec nx dev playground
pnpm exec nx build playground
pnpm exec nx lint playground
```

To explore dependencies and the project graph:

```sh
pnpm exec nx graph
```

## Local registry

Start the Verdaccio registry for local package testing:

```sh
pnpm exec nx local-registry
```

The registry configuration lives in `.verdaccio/config.yml` and stores artifacts
under `tmp/local-registry/storage`.

## Release & publish

Packages are built and published with Nx Release:

```sh
pnpm exec nx run-many -t build --projects=tag:scope:lib
pnpm exec nx release publish
```

Publishing runs on the `master` and `prod` branches via `.github/workflows/publish.yml`.

## Contributing

- Follow conventional commits (see `commitlint.config.mjs`).
- Use `pnpm exec nx <target> <project>` for consistent task execution.
