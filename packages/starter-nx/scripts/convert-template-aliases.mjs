#!/usr/bin/env node

/**
 * Script to convert alias imports (#app/, #prisma/, etc.) to relative paths
 * in all template files. This is a one-time conversion to update templates.
 */

import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Template alias map
const TEMPLATE_ALIAS_MAP = {
  '#app': './app',
  '#prisma': './prisma',
  '#generated': './generated',
  '#tests': './tests',
};

/**
 * Recursively get all files in a directory
 */
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = join(dirPath, file);
    if (statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

/**
 * Convert alias imports to relative paths
 */
function convertAliasImports(content, filePath, templatesRoot) {
  // Check if content has any template alias imports
  const hasAliasImports = Object.keys(TEMPLATE_ALIAS_MAP).some((alias) =>
    new RegExp(`${alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/`).test(
      content,
    ),
  );

  if (!hasAliasImports) {
    return content;
  }

  // Get the directory of the current file (relative to templates root)
  const filePathRelative = relative(templatesRoot, filePath);

  // Remove template directory prefixes (base/, features/X/, services/X/, configs/X/)
  // These prefixes are removed when templates are copied to the project
  const strippedPath = filePathRelative.replace(
    /^(base|features\/[^/]+|services\/[^/]+|configs\/[^/]+)\//,
    '',
  );

  const currentFileDir = dirname(strippedPath);

  let transformed = content;

  for (const [templateAlias, templatePath] of Object.entries(
    TEMPLATE_ALIAS_MAP,
  )) {
    // Remove /* suffix and ./ prefix from template path
    const basePath = templatePath.replace(/^\.\//, '').replace(/\/\*$/, '');

    // Create regex to match the alias in import/export statements
    // Matches: import ... from '#alias/...' and export ... from '#alias/...'
    // Handles: import { x } from, import type { x } from, import x from, import * as x from
    //          export { x } from, export * from, export type { x } from
    const aliasRegex = new RegExp(
      `((?:import|export)(?:\\s+(?:type\\s+)?(?:\\{[^}]*\\}|\\*\\s*(?:as\\s+\\w+)?|\\w+))?\\s+from\\s+['"])(${templateAlias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\/[^'"]+)(['"])`,
      'g',
    );

    transformed = transformed.replace(
      aliasRegex,
      (match, importPrefix, importPath, quote) => {
        // Remove the alias prefix
        const pathWithoutAlias = importPath.replace(
          new RegExp(
            `^${templateAlias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/`,
          ),
          '',
        );

        // Construct the target file path (relative to templates root)
        const targetPath = join(basePath, pathWithoutAlias);

        // Calculate relative path from current file directory to target
        let relativePath = relative(currentFileDir, targetPath);

        // Normalize the path separators (replace backslashes with forward slashes)
        relativePath = relativePath.replace(/\\/g, '/');

        // Ensure relative paths start with ./ for same-directory imports
        // Paths starting with ../ are already correct and should not be modified
        if (
          !relativePath.startsWith('.') &&
          !relativePath.startsWith('/') &&
          !relativePath.startsWith('..')
        ) {
          relativePath = './' + relativePath;
        }

        // Remove .ts/.tsx extension if present (TypeScript allows omitting extensions)
        relativePath = relativePath.replace(/\.(ts|tsx)$/, '');

        return `${importPrefix}${relativePath}${quote}`;
      },
    );
  }

  return transformed;
}

/**
 * Main function
 */
function main() {
  const templatesRoot = join(__dirname, '..', 'templates');
  const allFiles = getAllFiles(templatesRoot);

  // Filter to only TypeScript/JavaScript files
  const tsFiles = allFiles.filter(
    (file) =>
      file.endsWith('.ts') ||
      file.endsWith('.tsx') ||
      file.endsWith('.js') ||
      file.endsWith('.jsx'),
  );

  let convertedCount = 0;
  let totalAliasesConverted = 0;

  console.log(
    `Found ${tsFiles.length} TypeScript/JavaScript files to process...\n`,
  );

  for (const filePath of tsFiles) {
    const content = readFileSync(filePath, 'utf-8');
    const converted = convertAliasImports(content, filePath, templatesRoot);

    if (content !== converted) {
      writeFileSync(filePath, converted, 'utf-8');
      convertedCount++;

      // Count how many aliases were converted
      const beforeMatches = (
        content.match(/#(app|prisma|generated|tests)\//g) || []
      ).length;
      const afterMatches = (
        converted.match(/#(app|prisma|generated|tests)\//g) || []
      ).length;
      const aliasesInFile = beforeMatches - afterMatches;
      totalAliasesConverted += aliasesInFile;

      const relativePath = relative(templatesRoot, filePath);
      console.log(`✓ Converted ${aliasesInFile} alias(es) in ${relativePath}`);
    }
  }

  console.log(`\n✅ Conversion complete!`);
  console.log(`   - Files modified: ${convertedCount}`);
  console.log(`   - Total aliases converted: ${totalAliasesConverted}`);
}

main();
