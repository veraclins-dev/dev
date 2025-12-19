import type { Tree } from '@nx/devkit';
import { existsSync,readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname,join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Get the template source directory path
 * Looks for bundled templates in the package directory
 */
export async function getTemplateSourcePath(): Promise<string> {
  // Check for environment variable override (for local development)
  if (process.env['TEMPLATE_SOURCE_PATH']) {
    return process.env['TEMPLATE_SOURCE_PATH'];
  }

  // Check for local development path (sibling repository)
  const localDevPath = join(
    process.cwd(),
    '../../veraclins-template/template-source',
  );
  if (existsSync(localDevPath)) {
    return localDevPath;
  }

  // For production, look for bundled templates in the package directory
  // Get the directory of the current file (file-utils.ts)
  const currentFile = fileURLToPath(import.meta.url);
  const currentDir = dirname(currentFile);

  // Navigate from dist/packages/starter/src/utils/file-utils.js
  // to packages/starter/templates (bundled with package)
  const packageRoot = join(currentDir, '../../..');
  const bundledTemplatePath = join(packageRoot, 'templates');

  if (existsSync(bundledTemplatePath)) {
    return bundledTemplatePath;
  }

  throw new Error(
    `Template source not found. Please either:\n` +
      `1. Set TEMPLATE_SOURCE_PATH environment variable pointing to local template-source directory\n` +
      `2. Clone veraclins-template repository locally: git clone https://github.com/veraclins/veraclins-template.git\n` +
      `3. Ensure template-source is bundled with the @veraclins-dev/starter package\n\n` +
      `Searched paths:\n` +
      `- ${bundledTemplatePath}\n` +
      `- ${localDevPath}`,
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
    if (!shouldInclude(sourceFile)) {
      continue;
    }

    const relativePath = relative(sourceDir, sourceFile);
    const targetFile = join(targetDir, relativePath);

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
