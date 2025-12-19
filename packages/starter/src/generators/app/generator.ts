import type { Tree } from '@nx/devkit';
import {
  addProjectConfiguration,
  formatFiles,
  getWorkspaceLayout,
  joinPathFragments,
  names,
  normalizePath,
} from '@nx/devkit';

import {
  copyBaseTemplate,
  copyDeploymentConfig,
  copyFeatureModule,
  copyServiceIntegration,
  createEnvFile,
  updatePackageJson,
  updateReadme,
} from '../../utils/generator-helpers.js';
import {
  generatePrismaSchema,
  getAllRequiredFeatures,
} from '../../utils/prisma-merge.js';
import { type TemplateConfig } from '../../utils/template.js';

import type { StarterAppGeneratorSchema } from './schema.js';

export default async function appGenerator(
  tree: Tree,
  options: StarterAppGeneratorSchema,
) {
  const workspaceLayout = getWorkspaceLayout(tree);
  const projectName = names(options.name).fileName;

  // Determine apps directory
  // For standalone workspaces (appsDir === '.'), we still use 'apps' for consistency
  // unless explicitly configured otherwise
  const appsDir =
    workspaceLayout.appsDir === '.'
      ? 'apps'
      : workspaceLayout.appsDir || 'apps';
  const projectRoot = normalizePath(joinPathFragments(appsDir, projectName));

  // Build template configuration
  const config: TemplateConfig = {
    projectName: options.name,
    description: options.description || '',
    author: options.author,
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
  const { getTemplateSourcePath } = await import('../../utils/file-utils.js');
  const templateSourcePath = await getTemplateSourcePath();
  const prismaSchemaPath = normalizePath(
    joinPathFragments(projectRoot, 'prisma/schema.prisma'),
  );
  generatePrismaSchema(tree, templateSourcePath, config, prismaSchemaPath);

  // 6. Update package.json
  await updatePackageJson(tree, projectRoot, config);

  // 7. Add project configuration to workspace
  addProjectConfiguration(tree, projectName, {
    root: projectRoot,
    projectType: 'application',
    sourceRoot: joinPathFragments(projectRoot, 'app'),
    tags: [],
    targets: {
      build: {
        executor: '@nx/vite:build',
        outputs: ['{options.outputPath}'],
        options: {
          outputPath: joinPathFragments('dist', projectRoot),
        },
      },
      serve: {
        executor: '@nx/vite:dev-server',
        options: {},
      },
      test: {
        executor: '@nx/vitest:vitest',
        outputs: ['{workspaceRoot}/coverage/{projectRoot}'],
        options: {
          passWithNoTests: true,
        },
      },
      lint: {
        executor: '@nx/eslint:lint',
        outputs: ['{options.outputFile}'],
      },
    },
  });

  // 8. Create .env file from .env.example
  await createEnvFile(tree, projectRoot, config);

  // 9. Update README with post-generation instructions
  await updateReadme(tree, projectRoot, config);

  // 10. Format all files
  await formatFiles(tree);
}
