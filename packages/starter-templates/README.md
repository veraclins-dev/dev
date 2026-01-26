# @veraclins-dev/starter-templates

Shared template source for both the Nx plugin (`@veraclins-dev/starter-nx`) and CLI generator (`@veraclins-dev/starter-nx`) (`create-veraclins-app`).

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
  1. `packages/starter-templates/templates` → `dist/packages/starter-nx/templates` (at workspace root)

- **CLI**:
  1. `packages/starter-templates/templates` → `packages/starter-cli/templates` (via copy-templates.js)
  2. `packages/starter-cli/templates` → `dist/packages/starter-cli/templates` (bundled as assets during build)

### Runtime

Both generators **only use bundled templates** at runtime:

- **Nx Plugin**:
  - In workspace: Uses templates from `dist/packages/starter-nx/templates`
  - When installed: Uses templates from `node_modules/@veraclins-dev/starter-nx/templates` (at package root)

- **CLI**:
  - In workspace: Uses templates from `dist/packages/starter-cli/templates`
  - When installed: Uses templates from `node_modules/create-veraclins-app/templates` (at package root)

## Editing Templates

**Always edit templates in this package** (`packages/starter-templates/templates/`), not in the individual generator packages.

After editing templates:

1. Rebuild the generator package(s) to bundle the updated templates
2. Test the generator to verify the changes
