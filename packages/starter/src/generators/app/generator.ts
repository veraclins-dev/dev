import type { Tree } from '@nx/devkit';
import { formatFiles, getWorkspaceLayout, names } from '@nx/devkit';
import { join } from 'node:path';

import {
  copyBaseTemplate,
  copyDeploymentConfig,
  copyFeatureModule,
  copyServiceIntegration,
  updatePackageJson,
} from '../../utils/generator-helpers';
import {
  generatePrismaSchema,
  getAllRequiredFeatures,
} from '../../utils/prisma-merge';
import { type TemplateConfig } from '../../utils/template';

import type { StarterAppGeneratorSchema } from './schema';

export default async function appGenerator(
  tree: Tree,
  options: StarterAppGeneratorSchema,
) {
  const workspaceLayout = getWorkspaceLayout(tree);
  const projectName = names(options.name).fileName;
  const projectRoot = join(workspaceLayout.appsDir, projectName);

  // Build template configuration
  const config: TemplateConfig = {
    projectName: options.name,
    description: options.description || '',
    features: options.features || [],
    database: options.database || 'postgresql',
    emailProvider: options.emailProvider || 'resend',
    storageProvider: options.storageProvider || 'local',
    monitoringProvider: options.monitoringProvider || 'sentry',
    deploymentTarget: options.deploymentTarget || 'fly.io',
  };

  // Ensure all required features are included (handle dependencies)
  const allFeatures = getAllRequiredFeatures(config.features);
  config.features = allFeatures;

  // 1. Copy base template
  await copyBaseTemplate(tree, projectRoot, config);

  // 2. Include selected feature modules
  for (const feature of config.features) {
    await copyFeatureModule(tree, projectRoot, feature, config);
  }

  // 3. Include selected service integrations
  await copyServiceIntegration(
    tree,
    projectRoot,
    'email',
    config.emailProvider,
    config,
  );
  await copyServiceIntegration(
    tree,
    projectRoot,
    'storage',
    config.storageProvider,
    config,
  );
  await copyServiceIntegration(
    tree,
    projectRoot,
    'monitoring',
    config.monitoringProvider,
    config,
  );

  // 4. Include deployment config
  await copyDeploymentConfig(
    tree,
    projectRoot,
    config.deploymentTarget,
    config,
  );

  // 5. Generate Prisma schema (merge base + features)
  const { getTemplateSourcePath } = await import('../../utils/file-utils');
  const templateSourcePath = await getTemplateSourcePath();
  const prismaSchemaPath = join(projectRoot, 'prisma/schema.prisma');
  generatePrismaSchema(tree, templateSourcePath, config, prismaSchemaPath);

  // 6. Update package.json
  await updatePackageJson(tree, projectRoot, config);

  // 7. Format all files
  await formatFiles(tree);
}
