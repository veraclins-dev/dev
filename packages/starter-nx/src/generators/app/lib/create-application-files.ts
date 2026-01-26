import type { Tree } from '@nx/devkit';
import { generateFiles, joinPathFragments, offsetFromRoot } from '@nx/devkit';
import { join } from 'node:path';

import { getTemplateSourcePath } from '../../../utils/file-utils.js';
import { generatePrismaSchema } from '../../../utils/prisma-merge.js';
import type { NormalizedSchema } from '../schema.js';

/**
 * Get template variables for file generation
 */
function getTemplateVariables(options: NormalizedSchema) {
  const projectSlug = options.projectName.toLowerCase().replace(/\s+/g, '_');
  const dbUrl =
    options.database === 'sqlite'
      ? 'file:./prisma/data.db'
      : `postgresql://postgres@localhost:5432/${projectSlug}`;

  return {
    ...options.names,
    ...options,
    tmpl: '', // Required for template files
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    projectSlug,
    dbUrl,
    // Database-specific variables
    isPostgresql: options.database === 'postgresql',
    isSqlite: options.database === 'sqlite',
    // Email provider flags
    useResend: options.emailProvider === 'resend',
    useSendGrid: options.emailProvider === 'sendgrid',
    hasEmail: options.emailProvider !== 'none',
    // Storage provider flags
    useFirebase: options.storageProvider === 'firebase',
    useS3: options.storageProvider === 's3',
    useLocalStorage: options.storageProvider === 'local',
    hasStorage: options.storageProvider !== 'none',
    // Monitoring provider flags
    useSentry: options.monitoringProvider === 'sentry',
    hasMonitoring: options.monitoringProvider !== 'none',
    // Deployment target flags
    useFlyIo: options.deploymentTarget === 'fly.io',
    useVercel: options.deploymentTarget === 'vercel',
    useRailway: options.deploymentTarget === 'railway',
    useDocker: options.deploymentTarget === 'docker',
    // Feature flags
    hasNotifications: options.features.includes('notifications'),
    hasAdmin: options.features.includes('admin'),
    hasSearch: options.features.includes('search'),
    hasActivityLogging: options.features.includes('activity-logging'),
    hasReporting: options.features.includes('reporting'),
    hasModeration: options.features.includes('moderation'),
    hasInvitations: options.features.includes('invitations'),
    hasMfa: options.features.includes('mfa'),
  };
}

/**
 * Create application files using Nx's generateFiles
 */
export async function createApplicationFiles(
  tree: Tree,
  options: NormalizedSchema,
): Promise<void> {
  const templateSourcePath = await getTemplateSourcePath();
  const templateVariables = getTemplateVariables(options);

  // Generate base template files
  const baseTemplatePath = join(templateSourcePath, 'base');
  generateFiles(tree, baseTemplatePath, options.projectRoot, templateVariables);

  // Generate feature module files
  for (const feature of options.features) {
    const featureTemplatePath = join(templateSourcePath, 'features', feature);
    // Generate files (prisma schema files are handled separately in generatePrismaSchema)
    generateFiles(
      tree,
      featureTemplatePath,
      options.projectRoot,
      templateVariables,
    );
  }

  // Generate service integration files
  if (options.emailProvider !== 'none') {
    const emailTemplatePath = join(templateSourcePath, 'services', 'email');
    generateFiles(
      tree,
      emailTemplatePath,
      joinPathFragments(options.projectRoot, 'app/utils/services/email'),
      templateVariables,
    );
  }

  if (options.storageProvider !== 'none') {
    const storageTemplatePath = join(templateSourcePath, 'services', 'storage');
    generateFiles(
      tree,
      storageTemplatePath,
      joinPathFragments(options.projectRoot, 'app/utils/services/storage'),
      templateVariables,
    );
  }

  if (options.monitoringProvider !== 'none') {
    const monitoringTemplatePath = join(
      templateSourcePath,
      'services',
      'monitoring',
    );
    generateFiles(
      tree,
      monitoringTemplatePath,
      joinPathFragments(options.projectRoot, 'app/utils/services/monitoring'),
      templateVariables,
    );
  }

  // Generate deployment configuration files
  if (options.deploymentTarget !== 'none') {
    const deploymentTemplatePath = join(
      templateSourcePath,
      'configs',
      options.deploymentTarget,
    );
    generateFiles(
      tree,
      deploymentTemplatePath,
      options.projectRoot,
      templateVariables,
    );
  }

  // Generate Prisma schema (merge base + features)
  const prismaSchemaPath = joinPathFragments(
    options.projectRoot,
    'prisma/schema.prisma',
  );
  generatePrismaSchema(
    tree,
    templateSourcePath,
    {
      projectName: options.projectName,
      description: options.description,
      author: options.author,
      features: options.features,
      database: options.database,
      emailProvider: options.emailProvider,
      storageProvider: options.storageProvider,
      monitoringProvider: options.monitoringProvider,
      deploymentTarget: options.deploymentTarget,
    },
    prismaSchemaPath,
  );
}
