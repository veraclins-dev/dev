import type { Tree } from '@nx/devkit';
import { names, readNxJson } from '@nx/devkit';
import {
  determineProjectNameAndRootOptions,
  type ProjectGenerationOptions,
} from '@nx/devkit/src/generators/project-name-and-root-utils.js';

import { assertValidOptions } from '../../../utils/assertion.js';
import { getAllRequiredFeatures } from '../../../utils/prisma-merge.js';
import type { StarterAppGeneratorSchema } from '../schema.js';
import type { NormalizedSchema } from '../schema.js';

/**
 * Determine the directory for the application
 */
function determineDirectory(
  tree: Tree,
  appName: string,
  providedDirectory?: string,
): string {
  // Use provided directory if specified
  if (providedDirectory) {
    return `${providedDirectory}/${appName}`;
  }

  const nxJson = readNxJson(tree);

  // Check if workspaceLayout is explicitly configured
  if (nxJson?.workspaceLayout?.appsDir) {
    return `${nxJson.workspaceLayout.appsDir}/${appName}`;
  }

  // Check if apps directory exists in the workspace
  if (tree.exists('apps')) {
    return `apps/${appName}`;
  }

  // Default to root level (no apps directory)
  return appName;
}

/**
 * Normalize and validate generator options
 */
export async function normalizeOptions(
  tree: Tree,
  options: StarterAppGeneratorSchema,
): Promise<NormalizedSchema> {
  // Validate options first
  assertValidOptions(options);

  // Determine directory based on provided option or workspace layout
  const directory = determineDirectory(tree, options.name, options.directory);

  // Determine project name and root using Nx utilities
  const projectNameAndRootOptions: ProjectGenerationOptions = {
    name: options.name,
    projectType: 'application',
    directory,
  };

  const {
    projectName,
    names: projectNames,
    projectRoot,
    importPath,
  } = await determineProjectNameAndRootOptions(tree, projectNameAndRootOptions);

  // Ensure all required features are included (handle dependencies)
  const allFeatures = getAllRequiredFeatures(options.features || []);

  // Build normalized schema with defaults
  const normalized: NormalizedSchema = {
    ...options,
    projectName,
    projectRoot,
    importPath,
    names: names(projectNames.projectSimpleName),
    features: allFeatures,
    database: options.database || 'postgresql',
    emailProvider: options.emailProvider || 'resend',
    storageProvider: options.storageProvider || 'local',
    monitoringProvider: options.monitoringProvider || 'sentry',
    deploymentTarget: options.deploymentTarget || 'fly.io',
    description: options.description || '',
    author: options.author,
  };

  return normalized;
}
