import type { Tree } from '@nx/devkit';
import { updateJson } from '@nx/devkit';
import { join } from 'node:path';

import { copyDirectoryToTree, getTemplateSourcePath } from './file-utils';
import { renderTemplate, type TemplateConfig } from './template';

/**
 * Copy base template files to the target project
 */
export async function copyBaseTemplate(
  tree: Tree,
  projectRoot: string,
  config: TemplateConfig,
): Promise<void> {
  const templateSourcePath = await getTemplateSourcePath();
  const baseSourcePath = join(templateSourcePath, 'base');

  copyDirectoryToTree(
    tree,
    baseSourcePath,
    projectRoot,
    (filePath) => {
      // Include all base files
      return !filePath.includes('node_modules');
    },
    (content) => {
      // Render template variables
      return renderTemplate(content, config);
    },
  );
}

/**
 * Copy feature module files to the target project
 */
export async function copyFeatureModule(
  tree: Tree,
  projectRoot: string,
  feature: string,
  config: TemplateConfig,
): Promise<void> {
  const templateSourcePath = await getTemplateSourcePath();
  const featureSourcePath = join(templateSourcePath, 'features', feature);

  copyDirectoryToTree(
    tree,
    featureSourcePath,
    projectRoot,
    (filePath) => {
      // Exclude schema.prisma (will be merged separately)
      return !filePath.includes('prisma/schema.prisma');
    },
    (content) => {
      // Render template variables
      return renderTemplate(content, config);
    },
  );
}

/**
 * Copy service integration files to the target project
 */
export async function copyServiceIntegration(
  tree: Tree,
  projectRoot: string,
  serviceType: 'email' | 'storage' | 'monitoring',
  provider: string,
  config: TemplateConfig,
): Promise<void> {
  if (provider === 'none') {
    return;
  }

  const templateSourcePath = await getTemplateSourcePath();
  const serviceSourcePath = join(templateSourcePath, 'services', serviceType);

  copyDirectoryToTree(
    tree,
    serviceSourcePath,
    join(projectRoot, 'app/utils/services', serviceType),
    () => {
      // Include all service files
      return true;
    },
    (content) => {
      // Render template variables
      return renderTemplate(content, config);
    },
  );
}

/**
 * Copy deployment configuration files
 */
export async function copyDeploymentConfig(
  tree: Tree,
  projectRoot: string,
  deploymentTarget: string,
  config: TemplateConfig,
): Promise<void> {
  if (deploymentTarget === 'none') {
    return;
  }

  const templateSourcePath = await getTemplateSourcePath();
  const configSourcePath = join(
    templateSourcePath,
    'configs',
    deploymentTarget,
  );

  copyDirectoryToTree(
    tree,
    configSourcePath,
    projectRoot,
    () => true,
    (content) => {
      // Render template variables
      return renderTemplate(content, config);
    },
  );
}

/**
 * Update package.json with correct dependencies based on features and services
 */
export async function updatePackageJson(
  tree: Tree,
  projectRoot: string,
  config: TemplateConfig,
): Promise<void> {
  const packageJsonPath = join(projectRoot, 'package.json');

  if (!tree.exists(packageJsonPath)) {
    throw new Error(`package.json not found at ${packageJsonPath}`);
  }

  await updateJson(tree, packageJsonPath, (packageJson) => {
    // Update name
    packageJson.name = config.projectName.toLowerCase().replace(/\s+/g, '-');
    packageJson.description = config.description || '';

    // Add feature-specific dependencies
    if (config.features.includes('notifications')) {
      // Add notification dependencies if needed
    }

    if (config.emailProvider === 'resend') {
      packageJson.dependencies = packageJson.dependencies || {};
      packageJson.dependencies['@react-email/components'] = '^0.0.20';
    }

    if (config.storageProvider === 'firebase') {
      packageJson.dependencies = packageJson.dependencies || {};
      packageJson.dependencies['firebase'] = '^10.0.0';
    }

    if (config.storageProvider === 's3') {
      packageJson.dependencies = packageJson.dependencies || {};
      packageJson.dependencies['@aws-sdk/client-s3'] = '^3.0.0';
      packageJson.dependencies['@aws-sdk/s3-request-presigner'] = '^3.0.0';
    }

    if (config.monitoringProvider === 'sentry') {
      packageJson.dependencies = packageJson.dependencies || {};
      packageJson.dependencies['@sentry/react-router'] = '^8.0.0';
      packageJson.dependencies['@prisma/instrumentation'] = '^5.0.0';
    }

    return packageJson;
  });
}
