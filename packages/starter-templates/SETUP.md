# Shared Templates Package Guide

## Overview

This package contains the **single source of truth** for all template files used by both the Nx plugin (`@veraclins-dev/starter-nx`) and CLI generator (`create-veraclins-app`).

## How It Works

### Architecture

**Workspace Structure:**

```
veraclins-dev/
├── dist/                            # Build output at workspace root
│   └── packages/
│       ├── starter-nx/
│       │   └── templates/           # (copied from templates during build)
│       └── starter-cli/
│           └── templates/           # (bundled from packages/starter-cli/templates)
├── packages/
│   ├── starter-nx/                  # Nx plugin generator
│   ├── starter-cli/                 # CLI generator
│   │   └── templates/               # (intermediate: copied from templates, then bundled to dist)
│   └── starter-templates/           # ✨ Single source of truth
│       └── templates/
│           ├── base/
│           ├── features/
│           ├── configs/
│           └── services/
```

**Installed Package Structure:**

```
node_modules/
├── @veraclins-dev/
│   └── starter/
│       ├── src/
│       └── templates/               # (at package root, bundled during publish)
└── create-veraclins-app/
    ├── index.js
    └── templates/                   # (at package root, bundled during publish)
```

### Build Process

Templates are copied from the shared package during build:

- **Nx Plugin**:
  1. `packages/starter-templates/templates` → `dist/packages/starter-nx/templates` (at workspace root)

- **CLI**:
  1. `packages/starter-templates/templates` → `packages/starter-cli/templates` (via copy-templates.js)
  2. `packages/starter-cli/templates` → `dist/packages/starter-cli/templates` (bundled as assets during build)

### Runtime

Both generators **only use bundled templates** at runtime. They do not reference the shared package directly:

- **Nx Plugin**:
  - In workspace: Uses templates from `dist/packages/starter-nx/templates`
  - When installed: Uses templates from `node_modules/@veraclins-dev/starter-nx/templates` (at package root)

- **CLI**:
  - In workspace: Uses templates from `dist/packages/starter-cli/templates`
  - When installed: Uses templates from `node_modules/create-veraclins-app/templates` (at package root)

### Development Workflow

1. **Edit templates** in `packages/starter-templates/templates/`
2. **Rebuild the generator** to bundle updated templates:
   - Nx Plugin: `nx run starter-nx:build`
   - CLI: `nx run starter-cli:build` or `cd packages/starter-cli && npm run build`
3. **Test the generator**:
   - Nx Plugin: `nx g @veraclins-dev/starter-nx:app test-app`
   - CLI: `npx create-veraclins-app test-app`

### Build Workflow

During build, templates are copied:

- **Nx Plugin**: `packages/starter-templates/templates` → `dist/packages/starter-nx/templates`
- **CLI**: `packages/starter-templates/templates` → `packages/starter-cli/templates`

## Benefits

✅ **Single source of truth** - Edit templates in one place
✅ **Same workspace** - Everything in one repo for streamlined development
✅ **Automatic sync** - Both generators use the same templates automatically
✅ **No duplication** - Templates maintained in one location
✅ **Easy updates** - Change once, both generators benefit

## Maintenance

### Adding New Templates

1. Add files to `packages/starter-templates/templates/`
2. Both generators will automatically pick them up
3. No need to update multiple locations

### Updating Existing Templates

1. Edit files in `packages/starter-templates/templates/`
2. Test with both generators
3. Templates are automatically bundled during build

### Removing Templates

1. Remove from `packages/starter-templates/templates/`
2. Both generators will stop including them
3. Update build scripts if needed
