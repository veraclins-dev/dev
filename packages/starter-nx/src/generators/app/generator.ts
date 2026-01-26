import type { GeneratorCallback, Tree } from '@nx/devkit';
import {
  addProjectConfiguration,
  ensurePackage,
  formatFiles,
  getWorkspaceLayout,
  joinPathFragments,
  names,
  normalizePath,
  runTasksInSerial,
  updateJson,
} from '@nx/devkit';

import {
  addPostInstallTasks,
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
): Promise<GeneratorCallback> {
  const tasks: GeneratorCallback[] = [];
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

  // 6. Update package.json and install dependencies
  const installTask = await updatePackageJson(tree, projectRoot, config);
  if (installTask) {
    tasks.push(installTask);
  }

  // 7. Add project configuration to workspace
  // Match Nx React plugin pattern: sourceRoot is always ${projectRoot}/src
  // even for React Router projects (files are in app/, but sourceRoot is still /src)
  // The Vite plugin detects React Router via reactRouter() in vite.config.ts
  // and looks for app/root.tsx relative to the project root
  addProjectConfiguration(tree, projectName, {
    root: projectRoot,
    projectType: 'application',
    sourceRoot: joinPathFragments(projectRoot, 'src'), // Match Nx React pattern
    tags: ['type:app', 'framework:react-router'],
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

  // 8. Setup Vite configuration using Nx's generators (ensures proper plugin integration)
  await setupViteConfiguration(tree, projectName, projectRoot, tasks);

  // 9. Update TypeScript configuration for React Router
  updateTypeScriptConfigForReactRouter(tree, projectRoot);

  // 10. Create .env file from .env.example
  await createEnvFile(tree, projectRoot, config);

  // 11. Update README with post-generation instructions
  await updateReadme(tree, projectRoot, config);

  // 12. Format all files
  if (!options.skipFormat) {
    await formatFiles(tree);
  }

  // 13. Add post-generation tasks
  if (!options.skipInstall) {
    const postInstallTasks = await addPostInstallTasks(
      tree,
      projectRoot,
      config,
    );
    tasks.push(...postInstallTasks);
  }

  // Return task chain for execution
  return runTasksInSerial(...tasks);
}

/**
 * Setup Vite configuration using Nx's generators
 * This ensures proper integration with Nx's project graph processing
 */
async function setupViteConfiguration(
  tree: Tree,
  projectName: string,
  _projectRoot: string,
  tasks: GeneratorCallback[],
): Promise<void> {
  // Use ensurePackage to get @nx/vite generators
  const vitePackage = await ensurePackage('@nx/vite', 'latest');
  const { createOrEditViteConfig, viteConfigurationGenerator } = vitePackage;

  // Generate base Vite configuration
  const viteTask = await viteConfigurationGenerator(tree, {
    uiFramework: 'react',
    project: projectName,
    newProject: true,
    includeVitest: true,
    inSourceTests: false,
    compiler: 'babel',
    skipFormat: true,
    addPlugin: true,
    projectType: 'application',
  });
  tasks.push(viteTask);

  // Edit the vite.config.ts to add all required plugins
  // This is done after the base config is created
  createOrEditViteConfig(
    tree,
    {
      project: projectName,
      includeLib: false,
      includeVitest: true,
      inSourceTests: false,
      rollupOptionsExternal: ["'react'", "'react-dom'", "'react/jsx-runtime'"],
      useEsmExtension: true,
      imports: [
        `import { reactRouter } from '@react-router/dev/vite'`,
        `import tailwindcss from '@tailwindcss/vite'`,
        `import { envOnlyMacros } from 'vite-env-only'`,
        `import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'`,
      ],
      plugins: [
        'tailwindcss()',
        'envOnlyMacros()',
        'nxViteTsPaths()',
        '!process.env.VITEST && reactRouter()',
      ],
    },
    false,
  );
}

/**
 * Update TypeScript configuration for React Router
 * Adds necessary types and compiler options
 */
function updateTypeScriptConfigForReactRouter(
  tree: Tree,
  projectRoot: string,
): void {
  const tsconfigPath = joinPathFragments(projectRoot, 'tsconfig.json');
  if (!tree.exists(tsconfigPath)) {
    return;
  }

  updateJson(tree, tsconfigPath, (json) => {
    const types = new Set(json.compilerOptions?.types || []);
    types.add('@react-router/node');
    types.add('node');
    return {
      ...json,
      compilerOptions: {
        ...json.compilerOptions,
        jsx: 'react-jsx',
        moduleResolution: 'bundler',
        types: Array.from(types),
      },
    };
  });
}
