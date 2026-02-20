#!/usr/bin/env node
/**
 * Copies templates from the single source of truth (starter-templates) into
 * dist/packages/starter-cli/templates at build time. Run as part of nx build starter-cli.
 */
import fsExtra from 'fs-extra';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const { copy, pathExists, ensureDir } = fsExtra;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CLI_ROOT = resolve(__dirname, '..');
const WORKSPACE_ROOT = resolve(CLI_ROOT, '../..');
const SHARED_TEMPLATES = resolve(
  WORKSPACE_ROOT,
  'packages/starter-templates/templates',
);
const TEMPLATE_DEST = resolve(
  WORKSPACE_ROOT,
  'dist/packages/starter-cli/templates',
);

async function copyTemplates() {
  console.log('📦 Copying templates from starter-templates (single source of truth)...');

  try {
    if (!(await pathExists(SHARED_TEMPLATES))) {
      console.error(
        `❌ Template source not found at ${SHARED_TEMPLATES}\n` +
          '   Make sure packages/starter-templates/templates exists in the workspace.',
      );
      process.exit(1);
    }

    await ensureDir(TEMPLATE_DEST);
    await copy(SHARED_TEMPLATES, TEMPLATE_DEST, {
      overwrite: true,
      filter: (src) => {
        return !src.includes('.git') && !src.includes('node_modules');
      },
    });

    console.log('✅ Templates copied to dist/packages/starter-cli/templates');
  } catch (error) {
    console.error('❌ Failed to copy templates:', error.message);
    process.exit(1);
  }
}

copyTemplates();
