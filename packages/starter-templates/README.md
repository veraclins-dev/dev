# @veraclins-dev/starter-templates

Shared template source for the Nx plugin (`@veraclins-dev/starter-nx`) and the CLI generator (`create-veraclins-app` / `@veraclins-dev/starter-cli`).

This package contains the **single source of truth** for all template files used by both generators.

## Structure

- `templates/base/` - Base application template
- `templates/features/` - Optional feature modules
- `templates/configs/` - Deployment configurations
- `templates/services/` - Service integrations (email, storage, monitoring)

## Usage

### Build Process

Templates are copied from this package during the build process for each generator:

- **Nx Plugin**:
  1. `packages/starter-templates/templates` → `dist/packages/starter-nx/templates` (at build time)

- **CLI**:
  1. At build time: `nx run starter-cli:build` runs `build:tsc` then `copy-templates`, which copies `packages/starter-templates/templates` → `dist/packages/starter-cli/templates`. No separate template copy is kept under `packages/starter-cli`.

### Runtime

Both generators **only use bundled templates** at runtime:

- **Nx Plugin**:
  - In workspace: Uses templates from `dist/packages/starter-nx/templates`
  - When installed: Uses templates from `node_modules/@veraclins-dev/starter-nx/templates` (at package root)

- **CLI**:
  - In workspace: Both generators use templates from `dist/packages/<generator>/templates`, populated at build time from this package.
  - When installed: Uses templates from `node_modules/create-veraclins-app/templates` (at package root)

## Editing Templates

**Always edit templates in this package** (`packages/starter-templates/templates/`), not in the individual generator packages.

After editing templates:

1. Rebuild the generator package(s) to bundle the updated templates
2. Test the generator to verify the changes
