#!/usr/bin/env node

import { copy, pathExists } from 'fs-extra';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CLI_ROOT = resolve(__dirname, '..');
const WORKSPACE_ROOT = resolve(CLI_ROOT, '../..');
const SHARED_TEMPLATES = resolve(
  WORKSPACE_ROOT,
  'packages/starter-templates/templates',
);
const TEMPLATE_DEST = resolve(CLI_ROOT, 'templates');

async function copyTemplates() {
  console.log('📦 Copying templates from shared package...');

  try {
    if (!(await pathExists(SHARED_TEMPLATES))) {
      console.error(
        `❌ Template source not found at ${SHARED_TEMPLATES}\n` +
          '   Templates will not be included in the build.\n' +
          '   Make sure @veraclins-dev/starter-templates exists in workspace.',
      );
      process.exit(1);
    }

    await copy(SHARED_TEMPLATES, TEMPLATE_DEST, {
      overwrite: true,
      filter: (src) => {
        return !src.includes('.git') && !src.includes('node_modules');
      },
    });

    console.log('✅ Templates copied successfully!');
  } catch (error) {
    console.error('❌ Failed to copy templates:', error.message);
    process.exit(1);
  }
}

copyTemplates();
