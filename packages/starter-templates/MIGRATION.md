# Migration to Shared Templates Package

This guide documents the migration from separate template directories to the shared `@veraclins-dev/starter-templates` package.

## What Changed

### File Locations

- **Before**: Templates in `packages/starter-nx/templates/`
- **After**: Templates in `packages/starter-templates/templates/` (single source of truth)

### Generator Updates

Both generators now **only use bundled templates**:

1. **Nx Plugin** (`@veraclins-dev/starter-nx`):
   - Updated `packages/starter-nx/src/utils/file-utils.ts`
   - Only checks for bundled templates in `dist/packages/starter-nx/templates`
   - Build process copies from `packages/starter-templates/templates`

2. **CLI** (`create-veraclins-app`):
   - Updated `packages/starter-cli/scripts/copy-templates.js`
   - Updated `packages/starter-cli/src/generator.ts`
   - Looks for bundled templates in `dist/packages/starter-cli/templates` (at runtime)
   - Build process copies from `packages/starter-templates/templates` directly to `dist/packages/starter-cli/templates`

### Build Process

- **Nx Plugin**: Copies `packages/starter-templates/templates` → `dist/packages/starter-nx/templates`
- **CLI**: Copies `packages/starter-templates/templates` → `dist/packages/starter-cli/templates` (no intermediate copy under `packages/starter-cli`)

## Going Forward

### Editing Templates

**Always edit templates in**: `packages/starter-templates/templates/`

After editing templates, you must rebuild the generator to bundle the updated templates:

- **Nx Plugin**: `nx run starter-nx:build`
- **CLI**: `nx run starter-cli:build` or `cd packages/starter-cli && npm run build`

### Removing Old Templates (Optional)

Once you've verified everything works, you can optionally remove `packages/starter-nx/templates/` since it's no longer the source of truth. However, keeping it as a backup during migration is recommended.

## Verification

1. Test the Nx generator: `nx g @veraclins-dev/starter-nx:app test-app`
2. Test the CLI: `npx create-veraclins-app test-app`
3. Verify both use templates from the shared package

## Rollback

If you need to rollback:

1. Revert changes to `file-utils.ts` and `generator.ts`
2. Templates in `packages/starter-nx/templates/` will still work as before
