import type { GeneratorCallback, Tree } from '@nx/devkit';
import { normalizePath, readJson, updateJson } from '@nx/devkit';
import { execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

import {
  copyDirectoryToTree,
  getTemplateSourcePath,
  replaceAppAlias,
} from './file-utils.js';
import { renderTemplate, type TemplateConfig } from './template.js';

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

  // Verify base template exists
  if (!existsSync(baseSourcePath)) {
    throw new Error(
      `Base template not found at ${baseSourcePath}\n` +
        `Template source path: ${templateSourcePath}`,
    );
  }

  copyDirectoryToTree(
    tree,
    baseSourcePath,
    projectRoot,
    (filePath) => {
      // Normalize path separators for cross-platform compatibility
      const normalizedPath = normalizePath(filePath);

      // Include all base files except node_modules and .gitkeep
      // Also skip .env.example - it will be handled separately in createEnvFile
      // Skip tsconfig.json transformation - it will be handled after copy
      // Skip vite.config.ts - it will be created by Nx's Vite generator
      // Skip readme/ folder - it's only used for template generation, not copied to projects
      return (
        !normalizedPath.includes('node_modules') &&
        !normalizedPath.endsWith('.gitkeep') &&
        normalizedPath !== '.env.example' &&
        normalizedPath !== 'tsconfig.json' &&
        normalizedPath !== 'vite.config.ts' &&
        !normalizedPath.startsWith('readme/') &&
        normalizedPath !== 'README.md'
      );
    },
    (content, relativePath) => {
      const rendered = renderTemplate(content, config);
      // Nx apps use relative imports; rewrite #app/... to relative path
      return replaceAppAlias(rendered, relativePath);
    },
  );

  // Copy tsconfig.json separately and remove paths field (Nx uses root-level aliases)
  const templateTsconfigPath = join(baseSourcePath, 'tsconfig.json');
  if (existsSync(templateTsconfigPath)) {
    const tsconfigContent = readFileSync(templateTsconfigPath, 'utf-8');
    const rendered = renderTemplate(tsconfigContent, config);

    // Parse and remove paths field to avoid overriding root-level aliases
    try {
      const tsconfig = JSON.parse(rendered);
      if (tsconfig.compilerOptions?.paths) {
        delete tsconfig.compilerOptions.paths;
      }
      tree.write(
        join(projectRoot, 'tsconfig.json'),
        JSON.stringify(tsconfig, null, '\t'),
      );
    } catch {
      // If parsing fails, write as-is (shouldn't happen, but safe fallback)
      tree.write(join(projectRoot, 'tsconfig.json'), rendered);
    }
  }

  // Verify package.json was copied
  const packageJsonPath = join(projectRoot, 'package.json');
  if (!tree.exists(packageJsonPath)) {
    // Debug: check what files were actually written
    const allFiles: string[] = [];
    tree.listChanges().forEach((change) => {
      if (change.path.startsWith(projectRoot)) {
        allFiles.push(change.path);
      }
    });

    throw new Error(
      `Failed to copy package.json from base template.\n` +
        `Expected at: ${packageJsonPath}\n` +
        `Base template path: ${baseSourcePath}\n` +
        `Project root: ${projectRoot}\n` +
        `Files written to tree: ${allFiles.slice(0, 10).join(', ')}${allFiles.length > 10 ? '...' : ''}`,
    );
  }
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
    (content, relativePath) => {
      const rendered = renderTemplate(content, config);
      return replaceAppAlias(rendered, relativePath);
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

  const serviceTargetPath = join(
    projectRoot,
    'app/utils/services',
    serviceType,
  );

  copyDirectoryToTree(
    tree,
    serviceSourcePath,
    serviceTargetPath,
    () => {
      // Include all service files
      return true;
    },
    (content, relativePath) => {
      const rendered = renderTemplate(content, config);
      // Service files end up under app/utils/services/<type>/; path relative to project root
      const pathRelativeToProjectRoot = normalizePath(
        relative(projectRoot, join(serviceTargetPath, relativePath)),
      );
      return replaceAppAlias(rendered, pathRelativeToProjectRoot);
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
 * Returns a task to install dependencies in the project directory
 */
export async function updatePackageJson(
  tree: Tree,
  projectRoot: string,
  config: TemplateConfig,
): Promise<GeneratorCallback | null> {
  const packageJsonPath = join(projectRoot, 'package.json');

  if (!tree.exists(packageJsonPath)) {
    // Debug: list what files were actually created
    const files = tree.children(projectRoot);
    throw new Error(
      `package.json not found at ${packageJsonPath}\n` +
        `Project root: ${projectRoot}\n` +
        `Files in project root: ${files.join(', ')}`,
    );
  }

  // Get workspace name from root package.json
  let workspaceName = 'workspace';
  try {
    const rootPackageJson = readJson<{ name?: string }>(tree, 'package.json');
    if (rootPackageJson?.name) {
      // Extract workspace name from scoped package name (e.g., "@starter/source" -> "starter")
      const match = rootPackageJson.name.match(/^@([^/]+)/);
      if (match) {
        workspaceName = match[1];
      } else {
        // If not scoped, use the package name as-is
        workspaceName = rootPackageJson.name;
      }
    }
  } catch {
    // If root package.json doesn't exist or can't be read, use default
  }

  await updateJson(tree, packageJsonPath, (packageJson) => {
    // Update name in format @workspace/appname
    const appName = config.projectName.toLowerCase().replace(/\s+/g, '-');
    packageJson.name = `@${workspaceName}/${appName}`;
    packageJson.description = config.description || '';
    if (config.author) {
      packageJson.author = config.author;
    }

    // Only add author if provided
    if (config.author) {
      packageJson.author = config.author;
    } else if (packageJson.author) {
      // Remove author if it was in template but not provided
      delete packageJson.author;
    }

    // Add feature-specific dependencies
    if (config.features.includes('notifications')) {
      // Add notification dependencies if needed
    }

    if (config.emailProvider === 'resend') {
      packageJson.dependencies = packageJson.dependencies || {};
      // Use version from base template
      packageJson.dependencies['@react-email/components'] = '^1.0.1';
    }

    if (config.storageProvider === 'firebase') {
      packageJson.dependencies = packageJson.dependencies || {};
      // Firebase v11.x is the latest stable version (as of 2024)
      packageJson.dependencies['firebase'] = '^11.0.0';
    }

    if (config.storageProvider === 's3') {
      packageJson.dependencies = packageJson.dependencies || {};
      // AWS SDK v3 - use compatible versions
      // These versions work together and are actively maintained
      packageJson.dependencies['@aws-sdk/client-s3'] = '^3.700.0';
      packageJson.dependencies['@aws-sdk/s3-request-presigner'] = '^3.700.0';
    }

    if (config.monitoringProvider === 'sentry') {
      packageJson.dependencies = packageJson.dependencies || {};
      // Use latest stable version of @sentry/react-router (v10.x)
      // Latest as of Dec 2024 is 10.32.1
      packageJson.dependencies['@sentry/react-router'] = '^10.32.1';
      // Required for Sentry profiling integration
      packageJson.dependencies['@sentry/profiling-node'] = '^10.32.1';
      // Match Prisma version from base template
      packageJson.dependencies['@prisma/instrumentation'] = '^7.0.0';
    }

    return packageJson;
  });

  // Return a task to install dependencies at workspace root
  return () => {
    try {
      const workspaceRoot = process.cwd();

      console.log(`\n📦 Installing dependencies for ${config.projectName}...`);

      // Detect package manager from workspace
      const packageManager = detectPackageManager(workspaceRoot);
      const installCommand = getInstallCommand(packageManager);

      // Install at workspace root (dependencies are in project package.json but installed at root)
      execSync(installCommand, {
        cwd: workspaceRoot,
        stdio: 'inherit',
        env: { ...process.env },
      });

      console.log(`✅ Dependencies installed successfully\n`);
    } catch (error) {
      console.warn(
        `⚠️  Failed to install dependencies. You may need to run 'npm install' or 'pnpm install' manually at the workspace root.`,
      );
      console.warn(
        `   Error: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  };
}

/**
 * Detect package manager from workspace
 */
function detectPackageManager(workspaceRoot: string): 'npm' | 'pnpm' | 'yarn' {
  if (existsSync(join(workspaceRoot, 'pnpm-lock.yaml'))) {
    return 'pnpm';
  }
  if (existsSync(join(workspaceRoot, 'yarn.lock'))) {
    return 'yarn';
  }
  return 'npm';
}

/**
 * Get install command for package manager
 */
function getInstallCommand(packageManager: 'npm' | 'pnpm' | 'yarn'): string {
  switch (packageManager) {
    case 'pnpm':
      return 'pnpm install';
    case 'yarn':
      return 'yarn install';
    default:
      return 'npm install';
  }
}

/**
 * Filter and render env template based on selected options
 */
function filterAndRenderEnvTemplate(
  templateContent: string,
  config: TemplateConfig,
): string {
  const lines = templateContent.split('\n');
  const filteredLines: string[] = [];
  let skipSection = false;
  let currentSection = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Check for section headers
    if (trimmed.startsWith('# Email Provider')) {
      currentSection = 'email';
      // Only include if email provider is not 'none'
      skipSection = config.emailProvider === 'none';
      if (!skipSection) {
        // Update header based on provider
        if (config.emailProvider === 'resend') {
          filteredLines.push('# Email Provider (Resend)');
        } else if (config.emailProvider === 'sendgrid') {
          filteredLines.push('# Email Provider (SendGrid)');
        } else {
          filteredLines.push(line);
        }
      }
      continue;
    }

    if (trimmed.startsWith('# Storage Provider')) {
      currentSection = 'storage';
      // Only include if storage provider is not 'none' and not 'local'
      skipSection =
        config.storageProvider === 'none' || config.storageProvider === 'local';
      if (!skipSection) {
        // Update header based on provider
        if (config.storageProvider === 'firebase') {
          filteredLines.push('# Storage Provider (Firebase)');
        } else if (config.storageProvider === 's3') {
          filteredLines.push('# Storage Provider (AWS S3)');
        } else {
          filteredLines.push(line);
        }
      }
      continue;
    }

    if (trimmed.startsWith('# Monitoring')) {
      currentSection = 'monitoring';
      // Only include if monitoring provider is not 'none'
      skipSection = config.monitoringProvider === 'none';
      if (!skipSection) {
        filteredLines.push(line);
      }
      continue;
    }

    // Skip lines in excluded sections
    if (skipSection) {
      // Check if we've reached the next section or empty line
      if (trimmed === '' || trimmed.startsWith('#')) {
        skipSection = false;
        currentSection = '';
        // Don't skip this line, it's the start of a new section
        if (trimmed.startsWith('#')) {
          i--; // Re-process this line
          continue;
        }
      } else {
        continue; // Skip this line
      }
    }

    // Filter provider-specific variables
    if (currentSection === 'email') {
      if (config.emailProvider === 'resend' && line.includes('SENDGRID')) {
        continue; // Skip SendGrid variables if Resend is selected
      }
      if (config.emailProvider === 'sendgrid' && line.includes('RESEND')) {
        continue; // Skip Resend variables if SendGrid is selected
      }
    }

    if (currentSection === 'storage') {
      if (config.storageProvider === 'firebase') {
        if (line.includes('AWS_') || line.includes('S3_')) {
          continue; // Skip S3 variables if Firebase is selected
        }
      } else if (config.storageProvider === 's3') {
        if (line.includes('FIREBASE_')) {
          continue; // Skip Firebase variables if S3 is selected
        }
      } else if (
        config.storageProvider === 'local' ||
        config.storageProvider === 'none'
      ) {
        // Skip all storage provider variables if local or none is selected
        if (
          line.includes('FIREBASE_') ||
          line.includes('AWS_') ||
          line.includes('S3_')
        ) {
          continue;
        }
      }
    }

    if (currentSection === 'monitoring') {
      if (config.monitoringProvider === 'none') {
        continue; // Skip monitoring variables if none is selected
      }
    }

    // Include the line
    filteredLines.push(line);
  }

  // Render template variables
  const filteredContent = filteredLines.join('\n');
  return renderTemplate(filteredContent, config);
}

/**
 * Create .env file from .env.example template
 */
export async function createEnvFile(
  tree: Tree,
  projectRoot: string,
  config: TemplateConfig,
): Promise<void> {
  // Check for both env.example (legacy) and .env.example (template might have either)
  const oldEnvExamplePath = join(projectRoot, 'env.example');
  const envExamplePath = join(projectRoot, '.env.example');
  const envPath = join(projectRoot, '.env');

  let envExampleContent: string | null = null;

  // First, check if we need to read from the template source
  const templateSourcePath = await getTemplateSourcePath();
  const templateEnvExamplePath = join(templateSourcePath, 'base/.env.example');
  const { readFileSync, existsSync } = await import('node:fs');

  // Read from template source if it exists (since we skip it in copyBaseTemplate)
  if (existsSync(templateEnvExamplePath)) {
    const templateContent = readFileSync(templateEnvExamplePath, 'utf-8');
    // Filter and render template content based on selected options
    envExampleContent = filterAndRenderEnvTemplate(templateContent, config);
    tree.write(envExamplePath, envExampleContent);
  } else if (tree.exists(oldEnvExamplePath)) {
    // Handle existing env.example (rename to .env.example)
    const content = tree.read(oldEnvExamplePath, 'utf-8');
    if (content) {
      envExampleContent = filterAndRenderEnvTemplate(content, config);
      tree.write(envExamplePath, envExampleContent);
      tree.delete(oldEnvExamplePath);
    }
  } else if (tree.exists(envExamplePath)) {
    // .env.example already exists
    const content = tree.read(envExamplePath, 'utf-8');
    if (content) {
      envExampleContent = filterAndRenderEnvTemplate(content, config);
      tree.write(envExamplePath, envExampleContent);
    }
  } else {
    // Create new .env.example if it doesn't exist
    envExampleContent = generateEnvExample(config);
    tree.write(envExamplePath, envExampleContent);
  }

  // Create .env file - make it identical to .env.example
  if (envExampleContent) {
    tree.write(envPath, envExampleContent);
  }
}

/**
 * Generate .env.example content based on configuration
 */
function generateEnvExample(config: TemplateConfig): string {
  const lines = [
    '# Core Configuration',
    'NODE_ENV=development',
    `DATABASE_URL=postgresql://postgres@localhost:5432/${config.projectName.toLowerCase().replace(/\s+/g, '_')}`,
    'SESSION_SECRET=<generate-a-random-secret-key>',
    'INTERNAL_COMMAND_TOKEN=<generate-a-random-token>',
    'HONEYPOT_SECRET=<generate-a-random-secret>',
    'HOST=http://localhost:3000',
    '',
  ];

  // Email provider
  if (config.emailProvider === 'resend') {
    lines.push('# Email Provider (Resend)');
    lines.push('RESEND_API_KEY=<your-resend-api-key>');
    lines.push('');
  } else if (config.emailProvider === 'sendgrid') {
    lines.push('# Email Provider (SendGrid)');
    lines.push('SENDGRID_API_KEY=<your-sendgrid-api-key>');
    lines.push('');
  }

  // OAuth Providers (always included as optional)
  lines.push('# OAuth Providers (optional)');
  lines.push('GIT_AUTH_CLIENT_ID=<your-github-client-id>');
  lines.push('GIT_AUTH_CLIENT_SECRET=<your-github-client-secret>');
  lines.push('GOOGLE_CLIENT_ID=<your-google-client-id>');
  lines.push('GOOGLE_CLIENT_SECRET=<your-google-client-secret>');
  lines.push('FACEBOOK_CLIENT_ID=<your-facebook-client-id>');
  lines.push('FACEBOOK_CLIENT_SECRET=<your-facebook-client-secret>');
  lines.push('TWITTER_CONSUMER_KEY=<your-twitter-consumer-key>');
  lines.push('TWITTER_CONSUMER_SECRET=<your-twitter-consumer-secret>');
  lines.push('');

  // Storage provider
  if (config.storageProvider === 'firebase') {
    lines.push('# Storage Provider (Firebase)');
    lines.push('FIREBASE_API_KEY=<your-firebase-api-key>');
    lines.push('FIREBASE_AUTH_DOMAIN=<your-firebase-auth-domain>');
    lines.push('FIREBASE_PROJECT_ID=<your-firebase-project-id>');
    lines.push('FIREBASE_STORAGE_BUCKET=<your-firebase-storage-bucket>');
    lines.push(
      'FIREBASE_MESSAGING_SENDER_ID=<your-firebase-messaging-sender-id>',
    );
    lines.push('FIREBASE_APP_ID=<your-firebase-app-id>');
    lines.push('FIREBASE_MEASUREMENT_ID=<your-firebase-measurement-id>');
    lines.push('FIREBASE_STORAGE_ROOT=<your-firebase-storage-root>');
    lines.push('');
  } else if (config.storageProvider === 's3') {
    lines.push('# Storage Provider (AWS S3)');
    lines.push('AWS_REGION=us-east-1');
    lines.push('AWS_ACCESS_KEY_ID=<your-aws-access-key-id>');
    lines.push('AWS_SECRET_ACCESS_KEY=<your-aws-secret-access-key>');
    lines.push('AWS_S3_BUCKET_NAME=<your-s3-bucket-name>');
    lines.push('');
  }

  // Monitoring provider
  if (config.monitoringProvider === 'sentry') {
    lines.push('# Monitoring Provider (Sentry)');
    lines.push('SENTRY_DSN=<your-sentry-dsn>');
    lines.push('SENTRY_AUTH_TOKEN=<your-sentry-auth-token>');
    lines.push('SENTRY_ORG=<your-sentry-org>');
    lines.push('SENTRY_PROJECT=<your-sentry-project>');
    lines.push('');
  }

  lines.push('# Port Configuration');
  lines.push('PORT=3000');

  const content = lines.join('\n');
  return renderTemplate(content, config);
}

/**
 * Update README with post-generation instructions
 * Reads from readme/ folder sections and composes them with placeholders replaced
 */
export async function updateReadme(
  tree: Tree,
  projectRoot: string,
  config: TemplateConfig,
): Promise<void> {
  const readmePath = join(projectRoot, 'README.md');

  // Generate README from template sections
  const readmeContent = await generateReadmeFromTemplateSections(config);
  tree.write(readmePath, readmeContent);
}

/**
 * Generate README from template sections in readme/ folder
 */
async function generateReadmeFromTemplateSections(
  config: TemplateConfig,
): Promise<string> {
  const templateSourcePath = await getTemplateSourcePath();
  const readmeDir = join(templateSourcePath, 'base', 'readme');

  // Define section order
  const sections = [
    'header',
    'getting-started',
    'scripts',
    'project-structure',
    'configuration',
    'customization',
    'testing',
    'features',
    'troubleshooting',
    'learn-more',
  ];

  const projectName = config.projectName;
  const projectSlug = projectName.toLowerCase().replace(/\s+/g, '-');
  const dbName = projectSlug.replace(/-/g, '_');

  // Prepare template variables for sections that need dynamic content
  const templateVars: Record<string, string> = {
    PROJECT_NAME: config.projectName,
    PROJECT_DESCRIPTION:
      config.description ||
      'A modern web application built with React Router, Prisma, and TypeScript.',
    PROJECT_SLUG: projectSlug,
    DATABASE_TYPE: config.database === 'postgresql' ? 'PostgreSQL' : 'SQLite',
    DATABASE_SETUP_INSTRUCTIONS: getDatabaseSetupInstructions(config, dbName),
    DATABASE_TROUBLESHOOTING:
      config.database === 'postgresql'
        ? 'Ensure PostgreSQL is running\n- Check database exists: `psql -l`'
        : 'Ensure the SQLite database file path is correct',
    CONFIGURATION_SECTION: generateConfigSection(config),
    FEATURES_SECTION: generateFeaturesSection(config),
  };

  // Handle conditional author section
  if (config.author) {
    templateVars['AUTHOR'] = config.author;
  }

  // Read and compose sections
  const readmeParts: string[] = [];

  for (const section of sections) {
    const sectionPath = join(readmeDir, `${section}.md`);

    if (existsSync(sectionPath)) {
      let sectionContent = readFileSync(sectionPath, 'utf-8');

      // Replace all template variables
      for (const [key, value] of Object.entries(templateVars)) {
        if (key !== 'AUTHOR') {
          sectionContent = sectionContent.replace(
            new RegExp(`\\{\\{${key}\\}\\}`, 'g'),
            value,
          );
        }
      }

      // Handle AUTHOR separately to avoid index signature issue
      if (config.author && templateVars['AUTHOR']) {
        // Replace conditional author block
        sectionContent = sectionContent.replace(
          /\{\{#AUTHOR\}\}([\s\S]*?)\{\{\/AUTHOR\}\}/g,
          `$1`,
        );
        // Replace author placeholder
        sectionContent = sectionContent.replace(
          /\{\{AUTHOR\}\}/g,
          templateVars['AUTHOR'],
        );
      } else {
        // Remove conditional author block if no author
        sectionContent = sectionContent.replace(
          /\{\{#AUTHOR\}\}[\s\S]*?\{\{\/AUTHOR\}\}/g,
          '',
        );
      }

      // Remove any remaining conditional blocks that weren't matched
      sectionContent = sectionContent.replace(
        /\{\{#AUTHOR\}\}[\s\S]*?\{\{\/AUTHOR\}\}/g,
        '',
      );

      // Use renderTemplate for standard placeholders
      sectionContent = renderTemplate(sectionContent, config);

      readmeParts.push(sectionContent.trim());
    }
  }

  return readmeParts.join('\n\n');
}

/**
 * Generate README content (legacy - kept for reference, not used)
 */
function _generateReadme(config: TemplateConfig): string {
  const projectName = config.projectName;
  const projectSlug = projectName.toLowerCase().replace(/\s+/g, '-');
  const dbName = projectSlug.replace(/-/g, '_');

  return `# ${projectName}

${config.description || 'A modern web application built with React Router, Prisma, and TypeScript.'}

${config.author ? `**Author:** ${config.author}\n` : ''}

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- ${config.database === 'postgresql' ? 'PostgreSQL' : 'SQLite'} (for database)
- pnpm (recommended) or npm

### Installation

1. **Install dependencies:**

\`\`\`bash
pnpm install
\`\`\`

2. **Set up environment variables:**

\`\`\`bash
# The .env file has been created with default values
# Update .env with your actual configuration values
# See .env.example for all available variables
\`\`\`

3. **Set up the database:**

${getDatabaseSetupInstructions(config, dbName)}

4. **Start the development server:**

\`\`\`bash
nx dev ${projectName}
\`\`\`

The application will be available at \`http://localhost:3000\`.

## 📦 Available Scripts

Run these commands from the **monorepo root**:

- \`nx dev ${projectName}\` - Start development server
- \`nx build ${projectName}\` - Build for production
- \`nx test ${projectName}\` - Run unit tests
- \`nx lint ${projectName}\` - Lint code

### Project-Specific Scripts

You can also run scripts directly from the project directory:

- \`nx run ${projectName}:prisma:studio\` - Open Prisma Studio (database GUI)
- \`nx run ${projectName}:prisma:migrate\` - Create and apply migrations
- \`nx run ${projectName}:prisma:gen\` - Generate Prisma Client
- \`nx run ${projectName}:prisma:seed\` - Seed the database
- \`nx run ${projectName}:test:e2e\` - Run end-to-end tests

## 🏗️ Project Structure

\`\`\`
${projectSlug}/
├── app/                    # Application code
│   ├── components/          # React components
│   ├── hooks/              # Custom React hooks
│   ├── routes/             # React Router routes
│   ├── utils/              # Utility functions
│   └── styles/             # Global styles
├── prisma/                 # Database schema and migrations
│   ├── schema.prisma       # Prisma schema
│   └── seed.ts             # Database seed file
├── server/                 # Server configuration
│   ├── index.ts            # Server entry point
│   └── utils/              # Server utilities
└── tests/                  # Test files
\`\`\`

## ⚙️ Configuration

${generateConfigSection(config)}

## 🎨 Customization

${generateCustomizationSection(config)}

## 🧪 Testing

- **Unit tests:** \`nx test ${projectName}\`
- **E2E tests:** \`nx run ${projectName}:test:e2e\`
- **Coverage:** Run tests with coverage flag

## 📋 Features

${generateFeaturesSection(config)}

## 🆘 Troubleshooting

### Database Connection Issues

- Verify \`DATABASE_URL\` in \`.env\` is correct
- ${config.database === 'postgresql' ? 'Ensure PostgreSQL is running\n- Check database exists: `psql -l`' : 'Ensure the SQLite database file path is correct'}

### Port Already in Use

- Change \`PORT\` in \`.env\` to a different port
- Or stop the process using port 3000

### Missing Dependencies

- Run \`pnpm install\` from the monorepo root
- Clear \`node_modules\` and reinstall if needed

### Prisma Client Not Generated

- Run \`nx run ${projectName}:prisma:gen\` to regenerate the Prisma client

## 📚 Learn More

- [React Router Documentation](https://reactrouter.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Nx Documentation](https://nx.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
`;
}

/**
 * Generate customization section for README
 * Note: For comprehensive customization documentation, see the base template README
 */
function generateCustomizationSection(config: TemplateConfig): string {
  const projectName = config.projectName;
  return `### Styling

This project uses Tailwind CSS for styling. Customize the design system in:

- \`app/styles/tailwind.css\` - Global styles and Tailwind configuration
- Theme colors can be customized in the Tailwind config

### Database

${
  config.database === 'postgresql'
    ? `- **Provider:** PostgreSQL
- **ORM:** Prisma
- **Schema:** \`prisma/schema.prisma\`
- **Migrations:** \`prisma/migrations/\`

To modify the database schema:
1. Edit \`prisma/schema.prisma\`
2. Create a migration: \`nx run ${projectName}:prisma:migrate\`
3. Apply the migration to your database`
    : `- **Provider:** SQLite
- **ORM:** Prisma
- **Schema:** \`prisma/schema.prisma\`
- **Database file:** \`prisma/data.db\`

To modify the database schema:
1. Edit \`prisma/schema.prisma\`
2. Push changes: \`nx run ${projectName}:prisma:deploy\`
3. Regenerate Prisma client: \`nx run ${projectName}:prisma:gen\``
}`;
}

/**
 * Generate database setup instructions
 */
function getDatabaseSetupInstructions(
  config: TemplateConfig,
  dbName: string,
): string {
  if (config.database === 'postgresql') {
    return `\`\`\`bash
# Create your PostgreSQL database
createdb ${dbName}

# Run migrations
nx run ${config.projectName}:prisma:migrate

# Generate Prisma client
nx run ${config.projectName}:prisma:gen

# Seed the database (optional)
nx run ${config.projectName}:prisma:seed
\`\`\``;
  } else {
    return `\`\`\`bash
# Deploy schema to SQLite database
nx run ${config.projectName}:prisma:deploy

# Generate Prisma client
nx run ${config.projectName}:prisma:gen

# Seed the database (optional)
nx run ${config.projectName}:prisma:seed
\`\`\``;
  }
}

/**
 * Generate configuration section for README
 */
function generateConfigSection(config: TemplateConfig): string {
  const sections: string[] = [];

  sections.push(`### Environment Variables

See \`.env.example\` for all available environment variables. Key variables:

- \`DATABASE_URL\` - ${config.database === 'postgresql' ? 'PostgreSQL' : 'SQLite'} connection string
- \`SESSION_SECRET\` - Secret for session encryption (auto-generated)
- \`HOST\` - Application host URL`);

  if (config.emailProvider !== 'none') {
    sections.push(`### Email Provider: ${config.emailProvider}`);

    if (config.emailProvider === 'resend') {
      sections.push(
        `- Set \`RESEND_API_KEY\` in your \`.env\` file
- Get your API key from [Resend](https://resend.com/api-keys)`,
      );
    } else if (config.emailProvider === 'sendgrid') {
      sections.push(
        `- Set \`SENDGRID_API_KEY\` in your \`.env\` file
- Get your API key from [SendGrid](https://app.sendgrid.com/settings/api_keys)`,
      );
    }
  } else {
    sections.push(
      `### Email Provider: None (Mock Mode)
- Email functionality is mocked for development
- Configure an email provider in the generator to enable real email sending`,
    );
  }

  if (config.storageProvider !== 'none') {
    sections.push(`### Storage Provider: ${config.storageProvider}`);

    if (config.storageProvider === 'firebase') {
      sections.push(
        `- Configure Firebase Storage variables in \`.env\`:
  - \`FIREBASE_PROJECT_ID\`
  - \`FIREBASE_STORAGE_BUCKET\`
  - \`FIREBASE_SERVICE_ACCOUNT_KEY\` (JSON string)`,
      );
    } else if (config.storageProvider === 's3') {
      sections.push(
        `- Configure AWS S3 variables in \`.env\`:
  - \`AWS_ACCESS_KEY_ID\`
  - \`AWS_SECRET_ACCESS_KEY\`
  - \`AWS_REGION\`
  - \`AWS_S3_BUCKET\``,
      );
    } else if (config.storageProvider === 'local') {
      sections.push(
        `- Files are stored locally in the \`public/uploads\` directory
- Ensure the directory has write permissions`,
      );
    }
  } else {
    sections.push(
      `### Storage Provider: None (Mock Mode)
- File upload functionality is mocked for development
- Configure a storage provider in the generator to enable real file storage`,
    );
  }

  if (config.monitoringProvider !== 'none') {
    sections.push(`### Monitoring Provider: ${config.monitoringProvider}`);

    if (config.monitoringProvider === 'sentry') {
      sections.push(
        `- Set \`SENTRY_DSN\` in your \`.env\` file
- Get your DSN from [Sentry](https://sentry.io/settings/projects/)
- Configure additional Sentry settings in \`app/utils/monitoring.client.tsx\``,
      );
    }
  } else {
    sections.push(
      `### Monitoring Provider: None
- Error monitoring is disabled
- Configure Sentry in the generator to enable error tracking`,
    );
  }

  if (config.deploymentTarget !== 'none') {
    sections.push(`### Deployment Target: ${config.deploymentTarget}`);

    if (config.deploymentTarget === 'fly.io') {
      sections.push(
        `- Configuration files: \`fly.toml\`, \`Dockerfile\`
- Deploy with: \`flyctl deploy\`
- See [Fly.io documentation](https://fly.io/docs) for setup`,
      );
    } else if (config.deploymentTarget === 'vercel') {
      sections.push(
        `- Deploy with: \`vercel deploy\`
- See [Vercel documentation](https://vercel.com/docs) for setup`,
      );
    } else if (config.deploymentTarget === 'railway') {
      sections.push(
        `- Deploy via Railway dashboard or CLI
- See [Railway documentation](https://docs.railway.app) for setup`,
      );
    } else if (config.deploymentTarget === 'docker') {
      sections.push(
        `- Build image: \`docker build -t ${config.projectName} .\`
- Run container: \`docker run -p 3000:3000 ${config.projectName}\``,
      );
    }
  }

  return sections.join('\n\n');
}

/**
 * Add post-installation tasks (database creation, Prisma generate, etc.)
 */
export async function addPostInstallTasks(
  _tree: Tree,
  projectRoot: string,
  config: TemplateConfig,
): Promise<GeneratorCallback[]> {
  const tasks: GeneratorCallback[] = [];

  // Task to create database before Prisma generate
  if (config.database === 'postgresql') {
    tasks.push(() => {
      try {
        const workspaceRoot = process.cwd();
        const fullProjectRoot = join(workspaceRoot, projectRoot);
        const dbName = config.projectName.toLowerCase().replace(/\s+/g, '_');

        console.log(`\n🗄️  Creating PostgreSQL database '${dbName}'...`);

        // Try to create database (ignore error if it already exists)
        try {
          execSync(`createdb ${dbName}`, {
            cwd: fullProjectRoot,
            stdio: 'pipe',
            env: { ...process.env },
          });
          console.log(`✅ Database '${dbName}' created successfully`);
        } catch (createError) {
          const errorMessage =
            createError instanceof Error
              ? createError.message
              : String(createError);
          // Database might already exist, which is fine
          if (errorMessage.includes('already exists')) {
            console.log(
              `ℹ️  Database '${dbName}' already exists, skipping creation`,
            );
          } else {
            console.warn(
              `⚠️  Failed to create database. You may need to create it manually: createdb ${dbName}`,
            );
            console.warn(`   Error: ${errorMessage}`);
          }
        }
      } catch (error) {
        console.warn(
          `⚠️  Database creation failed. You may need to create the database manually.`,
        );
        console.warn(
          `   Error: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    });
  }
  // SQLite doesn't need explicit database creation - the file is created on first connection

  // Task to generate Prisma client after database is created
  tasks.push(() => {
    try {
      // Use absolute path from workspace root
      const workspaceRoot = process.cwd();
      const fullProjectRoot = join(workspaceRoot, projectRoot);
      const prismaSchemaPath = join(fullProjectRoot, 'prisma/schema.prisma');

      if (existsSync(prismaSchemaPath)) {
        console.log(
          `\n📦 Generating Prisma client for ${config.projectName}...`,
        );
        execSync('npx prisma generate --sql', {
          cwd: fullProjectRoot,
          stdio: 'inherit',
          env: { ...process.env },
        });
        console.log(`✅ Prisma client generated successfully\n`);
      }
    } catch (error) {
      console.warn(
        `⚠️  Failed to generate Prisma client. You may need to run 'npx prisma generate' manually.`,
      );
      console.warn(
        `   Error: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  });

  return tasks;
}

/**
 * Generate features section
 */
function generateFeaturesSection(config: TemplateConfig): string {
  if (config.features.length === 0) {
    return `No additional features were enabled during generation.

To add features later, you can manually integrate them or regenerate the project with feature flags.`;
  }

  const featureDescriptions: Record<string, string> = {
    notifications: 'User notifications system with real-time updates',
    admin: 'Admin dashboard and management tools',
    search: 'Full-text search functionality',
    'activity-logging': 'Activity tracking and logging system',
    reporting: 'Reporting and analytics features',
    moderation: 'Content moderation tools',
    invitations: 'User invitation system',
    mfa: 'Multi-factor authentication support',
  };

  const featureList = config.features
    .map((feature) => {
      const description = featureDescriptions[feature] || feature;
      return `- **${feature}** - ${description}`;
    })
    .join('\n');

  return `The following features are enabled in this project:

${featureList}

Each feature includes its own routes, components, and database models. See the \`app/routes\` directory for feature-specific code.`;
}

// Workspace configuration update functions

/**
 * Update workspace configuration to include the new project directory
 */
export function updateWorkspaceConfiguration(
  tree: Tree,
  directory: string,
): void {
  const packageManager = detectPackageManager(tree.root);

  if (packageManager === 'pnpm') {
    updatePnpmWorkspace(tree, directory);
  } else if (packageManager === 'npm' || packageManager === 'yarn') {
    updateNpmYarnWorkspace(tree, directory);
  }
}

/**
 * Update pnpm-workspace.yaml to include the directory
 */
function updatePnpmWorkspace(tree: Tree, directory: string): void {
  const workspacePath = 'pnpm-workspace.yaml';

  if (!tree.exists(workspacePath)) {
    // Create new pnpm-workspace.yaml
    tree.write(
      workspacePath,
      `packages:
  - "${directory}/*"
`,
    );
    return;
  }

  const content = tree.read(workspacePath, 'utf-8');
  if (!content) {
    return;
  }

  // Parse YAML-like structure (simple parsing for our use case)
  const lines = content.split('\n');
  const packagesIndex = lines.findIndex((line) =>
    line.trim().startsWith('packages:'),
  );

  if (packagesIndex === -1) {
    // No packages section, add it
    const newContent = `${content.trim()}\npackages:\n  - "${directory}/*"\n`;
    tree.write(workspacePath, newContent);
    return;
  }

  // Check if directory pattern already exists
  const directoryPattern = `"${directory}/*"`;
  const hasPattern = lines.some(
    (line) =>
      line.includes(directoryPattern) || line.includes(`'${directory}/*'`),
  );

  if (hasPattern) {
    return; // Already exists
  }

  // Find the last package entry to add after it
  let lastPackageIndex = packagesIndex;
  for (let i = packagesIndex + 1; i < lines.length; i++) {
    if (lines[i].trim().startsWith('-')) {
      lastPackageIndex = i;
    } else if (lines[i].trim() && !lines[i].trim().startsWith('#')) {
      break;
    }
  }

  // Insert the new package entry
  const indent = lines[lastPackageIndex]?.match(/^(\s*)/)?.[1] || '  ';
  const newLine = `${indent}- "${directory}/*"`;
  lines.splice(lastPackageIndex + 1, 0, newLine);

  tree.write(workspacePath, lines.join('\n'));
}

/**
 * Update package.json workspaces field for npm/yarn
 */
function updateNpmYarnWorkspace(tree: Tree, directory: string): void {
  const packageJsonPath = 'package.json';

  if (!tree.exists(packageJsonPath)) {
    return;
  }

  updateJson(tree, packageJsonPath, (json) => {
    if (!json.workspaces) {
      json.workspaces = [];
    }

    const workspacePattern = `${directory}/*`;
    if (!json.workspaces.includes(workspacePattern)) {
      json.workspaces.push(workspacePattern);
      // Sort workspaces for consistency
      json.workspaces.sort();
    }

    return json;
  });
}
