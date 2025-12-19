import type { Tree } from '@nx/devkit';
import { updateJson } from '@nx/devkit';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { copyDirectoryToTree, getTemplateSourcePath } from './file-utils.js';
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
      // Include all base files except node_modules and .gitkeep
      // Also skip env.example - it will be handled separately as .env.example
      return (
        !filePath.includes('node_modules') &&
        !filePath.endsWith('.gitkeep') &&
        filePath !== 'env.example'
      );
    },
    (content) => {
      // Render template variables
      return renderTemplate(content, config);
    },
  );

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
    // Debug: list what files were actually created
    const files = tree.children(projectRoot);
    throw new Error(
      `package.json not found at ${packageJsonPath}\n` +
        `Project root: ${projectRoot}\n` +
        `Files in project root: ${files.join(', ')}`,
    );
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
  // Check for both env.example and .env.example (template might have either)
  const oldEnvExamplePath = join(projectRoot, 'env.example');
  const envExamplePath = join(projectRoot, '.env.example');
  const envPath = join(projectRoot, '.env');

  let envExampleContent: string | null = null;

  // First, check if we need to read from the template source
  const templateSourcePath = await getTemplateSourcePath();
  const templateEnvExamplePath = join(templateSourcePath, 'base/env.example');
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
 */
export async function updateReadme(
  tree: Tree,
  projectRoot: string,
  config: TemplateConfig,
): Promise<void> {
  const readmePath = join(projectRoot, 'README.md');

  if (!tree.exists(readmePath)) {
    // Create a new README if it doesn't exist
    const readmeContent = generateReadme(config);
    tree.write(readmePath, readmeContent);
  } else {
    // Update existing README with post-generation instructions
    const existingContent = tree.read(readmePath, 'utf-8');
    if (existingContent) {
      const updatedContent =
        existingContent + '\n\n' + generatePostGenerationInstructions(config);
      tree.write(readmePath, updatedContent);
    }
  }
}

/**
 * Generate README content
 */
function generateReadme(config: TemplateConfig): string {
  const projectName = config.projectName;
  const projectSlug = projectName.toLowerCase().replace(/\s+/g, '-');

  return `# ${projectName}

${config.description || 'A modern web application built with React Router, Prisma, and TypeScript.'}

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- PostgreSQL (for database)
- pnpm (recommended) or npm

### Installation

1. **Install dependencies:**

\`\`\`bash
pnpm install
\`\`\`

2. **Set up environment variables:**

\`\`\`bash
cp .env.example .env
# Edit .env with your configuration
\`\`\`

3. **Set up the database:**

\`\`\`bash
# Create your PostgreSQL database
createdb ${projectSlug}

# Run migrations
pnpm prisma:migrate

# Generate Prisma client
pnpm prisma:gen

# Seed the database (optional)
pnpm prisma:seed
\`\`\`

4. **Start the development server:**

\`\`\`bash
pnpm dev
\`\`\`

The application will be available at \`http://localhost:3000\`.

## 📦 Available Scripts

- \`pnpm dev\` - Start development server
- \`pnpm build\` - Build for production
- \`pnpm start\` - Start production server
- \`pnpm test\` - Run tests
- \`pnpm test:e2e\` - Run end-to-end tests
- \`pnpm lint\` - Lint code
- \`pnpm typecheck\` - Type check TypeScript

## 🗄️ Database

This project uses Prisma as the ORM. Key commands:

- \`pnpm prisma:studio\` - Open Prisma Studio (database GUI)
- \`pnpm prisma:migrate\` - Create and apply migrations
- \`pnpm prisma:gen\` - Generate Prisma Client

## 🏗️ Project Structure

\`\`\`
${projectSlug}/
├── app/              # Application code (routes, components, utilities)
├── prisma/           # Database schema and migrations
├── server/           # Server configuration and middleware
├── public/           # Static assets
\`\`\`

## 📝 Configuration

### Environment Variables

See \`.env.example\` for all available environment variables. Key variables:

- \`DATABASE_URL\` - PostgreSQL connection string
- \`SESSION_SECRET\` - Secret for session encryption
- \`HOST\` - Application host URL

${generateConfigSection(config)}

## 🧪 Testing

- **Unit tests:** \`pnpm test\`
- **E2E tests:** \`pnpm test:e2e\`
- **Coverage:** \`pnpm coverage\`

## 📚 Learn More

- [React Router Documentation](https://reactrouter.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Nx Documentation](https://nx.dev)
`;
}

/**
 * Generate configuration section for README
 */
function generateConfigSection(config: TemplateConfig): string {
  const sections: string[] = [];

  if (config.emailProvider !== 'none') {
    sections.push(`### Email Provider: ${config.emailProvider}`);
    if (config.emailProvider === 'resend') {
      sections.push('- Set `RESEND_API_KEY` in your `.env` file');
    } else if (config.emailProvider === 'sendgrid') {
      sections.push('- Set `SENDGRID_API_KEY` in your `.env` file');
    }
  }

  if (config.storageProvider !== 'none') {
    sections.push(`### Storage Provider: ${config.storageProvider}`);
    if (config.storageProvider === 'firebase') {
      sections.push('- Configure Firebase Storage variables in `.env`');
    } else if (config.storageProvider === 's3') {
      sections.push('- Configure AWS S3 variables in `.env`');
    }
  }

  if (config.monitoringProvider !== 'none') {
    sections.push(`### Monitoring Provider: ${config.monitoringProvider}`);
    if (config.monitoringProvider === 'sentry') {
      sections.push('- Set `SENTRY_DSN` in your `.env` file');
    }
  }

  if (config.features.length > 0) {
    sections.push(`### Enabled Features: ${config.features.join(', ')}`);
  }

  return sections.length > 0 ? sections.join('\n\n') : '';
}

/**
 * Generate post-generation instructions
 */
function generatePostGenerationInstructions(config: TemplateConfig): string {
  return `## 🎯 Next Steps

After generating this project, follow these steps:

1. **Install dependencies:**
   \`\`\`bash
   pnpm install
   \`\`\`

2. **Configure environment:**
   - Copy \`.env.example\` to \`.env\`
   - Update \`.env\` with your actual configuration values
   - Generate secure secrets for \`SESSION_SECRET\`, \`INTERNAL_COMMAND_TOKEN\`, and \`HONEYPOT_SECRET\`

3. **Set up database:**
   \`\`\`bash
   # Create database
   createdb ${config.projectName.toLowerCase().replace(/\s+/g, '_')}

   # Run migrations
   pnpm prisma:migrate

   # Generate Prisma client
   pnpm prisma:gen
   \`\`\`

4. **Start development:**
   \`\`\`bash
   pnpm dev
   \`\`\`

5. **Verify installation:**
   - Open \`http://localhost:3000\`
   - Check that the application loads correctly

## 📋 Configuration Checklist

- [ ] Environment variables configured in \`.env\`
- [ ] Database created and migrations applied
- [ ] Prisma client generated
- [ ] ${config.emailProvider !== 'none' ? `Email provider (${config.emailProvider}) configured` : 'Email provider configured (if needed)'}
- [ ] ${config.storageProvider !== 'none' ? `Storage provider (${config.storageProvider}) configured` : 'Storage provider configured (if needed)'}
- [ ] ${config.monitoringProvider !== 'none' ? `Monitoring provider (${config.monitoringProvider}) configured` : 'Monitoring provider configured (if needed)'}
${config.features.length > 0 ? `- [ ] Enabled features verified: ${config.features.join(', ')}` : ''}

## 🆘 Troubleshooting

### Database Connection Issues
- Verify \`DATABASE_URL\` in \`.env\` is correct
- Ensure PostgreSQL is running
- Check database exists: \`psql -l\`

### Port Already in Use
- Change \`PORT\` in \`.env\` to a different port
- Or stop the process using port 3000

### Missing Dependencies
- Run \`pnpm install\` again
- Clear \`node_modules\` and reinstall if needed
`;
}
