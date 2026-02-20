import type { Tree } from '@nx/devkit';
import { normalizePath } from '@nx/devkit';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Get the template source directory path
 * Only looks for bundled templates in the package directory
 */
export async function getTemplateSourcePath(): Promise<string> {
  // Check for environment variable override (for testing)
  if (process.env['TEMPLATE_SOURCE_PATH']) {
    return process.env['TEMPLATE_SOURCE_PATH'];
  }

  // Look for bundled templates in the package directory
  // Navigate from src/utils/file-utils.js to package root
  // From: node_modules/@veraclins-dev/starter-nx/src/utils/file-utils.js
  // To:   node_modules/@veraclins-dev/starter-nx/templates
  // Or from: dist/packages/starter-nx/src/utils/file-utils.js
  // To:   dist/packages/starter-nx/templates
  const currentFile = fileURLToPath(import.meta.url);
  const currentDir = dirname(currentFile);
  const packageRoot = join(currentDir, '../..');
  const bundledTemplatePath = join(packageRoot, 'templates');

  if (existsSync(bundledTemplatePath)) {
    return bundledTemplatePath;
  }

  throw new Error(
    `Template source not found. Please either:\n` +
      `1. Set TEMPLATE_SOURCE_PATH environment variable pointing to template directory\n` +
      `2. Ensure templates are bundled with the @veraclins-dev/starter-nx package\n\n` +
      `Searched path: ${bundledTemplatePath}\n` +
      `Current file location: ${currentFile}\n` +
      `Current directory: ${currentDir}\n\n` +
      `Templates should be copied from packages/starter-templates/templates during build.`,
  );
}

/**
 * Recursively get all files in a directory
 */
export function getAllFiles(
  dirPath: string,
  arrayOfFiles: string[] = [],
): string[] {
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
 * Copy a file from source to target in the Tree
 */
export function copyFileToTree(
  tree: Tree,
  sourcePath: string,
  targetPath: string,
  content?: string,
): void {
  if (content) {
    tree.write(targetPath, content);
  } else {
    const fileContent = readFileSync(sourcePath, 'utf-8');
    tree.write(targetPath, fileContent);
  }
}

/**
 * Copy a directory structure from source to target in the Tree
 */
export function copyDirectoryToTree(
  tree: Tree,
  sourceDir: string,
  targetDir: string,
  shouldInclude: (filePath: string) => boolean = () => true,
  transformContent: (content: string, filePath: string) => string = (content) =>
    content,
): void {
  const allFiles = getAllFiles(sourceDir);

  for (const sourceFile of allFiles) {
    // Calculate relative path first to check against relative path
    const relativePath = relative(sourceDir, sourceFile);

    // Skip .gitkeep files - they're not needed in generated projects
    if (relativePath.endsWith('.gitkeep')) {
      continue;
    }

    // Check shouldInclude using relative path (not absolute path)
    // This avoids false positives when the sourceDir itself is in node_modules
    if (!shouldInclude(relativePath)) {
      continue;
    }

    // Normalize the target file path to ensure consistent path separators
    const targetFile = normalizePath(join(targetDir, relativePath));

    // Read source file content
    const content = readFileSync(sourceFile, 'utf-8');

    // Transform content
    const transformedContent = transformContent(content, relativePath);

    // Write to tree
    tree.write(targetFile, transformedContent);
  }
}

/**
 * Ensure a directory exists in the Tree
 */
export function ensureDirectory(tree: Tree, dirPath: string): void {
  if (!tree.exists(dirPath)) {
    // Create parent directories if needed
    const parts = dirPath.split('/');
    for (let i = 1; i <= parts.length; i++) {
      const partialPath = parts.slice(0, i).join('/');
      if (partialPath && !tree.exists(partialPath)) {
        // Create empty file to represent directory
        // Nx Tree doesn't have explicit directory creation
        // We'll create a .gitkeep file if needed
      }
    }
  }
}
