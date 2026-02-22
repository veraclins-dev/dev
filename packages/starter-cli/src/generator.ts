import chalk from 'chalk';
import { execa } from 'execa';
import fsExtra from 'fs-extra';
import { randomBytes } from 'node:crypto';
import ora from 'ora';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

import { renderTemplate } from './template-utils.js';
import type { TemplateConfig } from './types.js';

const { copy, ensureDir, pathExists, readFile, writeFile } = fsExtra;

/** Back-relations to inject into User model when a feature is included */
const FEATURE_USER_RELATIONS: Record<string, string[]> = {
  notifications: [
    '  activitiesAsActor      Activity[]              @relation("activitiesAsActor")',
    '  receiverActivities     Activity[]              @relation("receiverActivities")',
    '  notifications          Notification[]',
    '  notificationPreferences NotificationPreference[]',
  ],
  invitations: [
    '  inviteeInvitations Invitation[] @relation("invitee")',
    '  inviterInvitations Invitation[] @relation("inviter")',
  ],
  reporting: [
    '  reportedReports Report[] @relation("ReportedBy")',
    '  resolvedReports Report[] @relation("ResolvedBy")',
  ],
  moderation: [
    '  userViolations             UserViolation[]',
    '  assignedModerationQueues   ModerationQueue[]   @relation("AssignedModerator")',
    '  resolvedModerationQueues   ModerationQueue[]   @relation("ResolvedModerator")',
  ],
};

/** Back-relations to inject into AuditLog model when a feature is included */
const FEATURE_AUDITLOG_RELATIONS: Record<string, string[]> = {
  moderation: ['  userViolations UserViolation[]'],
};

function generateSecureSecret(): string {
  return randomBytes(32).toString('base64');
}

function generateEnvContent(config: TemplateConfig): string {
  const projectName = config.projectName
    .replace(/[^a-z0-9_]/gi, '_')
    .toLowerCase();
  const databaseUrl =
    config.database === 'sqlite'
      ? 'file:./dev.db'
      : `postgresql://postgres@localhost:5432/${projectName}`;

  const lines: string[] = [
    '# Core (generated – update DATABASE_URL and add real secrets for production)',
    'NODE_ENV=development',
    `DATABASE_URL=${databaseUrl}`,
    `SESSION_SECRET=${generateSecureSecret()}`,
    `HONEYPOT_SECRET=${generateSecureSecret()}`,
    'HOST=http://localhost:3000',
    `APP_NAME=${config.projectName}`,
    'PORT=3000',
    '',
  ];

  if (config.emailProvider !== 'none') {
    lines.push('# Email');
    if (config.emailProvider === 'resend') {
      lines.push('RESEND_API_KEY=', 'EMAIL_FROM=noreply@example.com', '');
    } else {
      lines.push('SENDGRID_API_KEY=', 'EMAIL_FROM=noreply@example.com', '');
    }
  }

  const oauthProviders = config.authProviders ?? [];
  if (oauthProviders.length > 0) {
    lines.push('# OAuth (optional – add keys when enabling providers)');
    if (oauthProviders.includes('github')) {
      lines.push('GIT_AUTH_CLIENT_ID=', 'GIT_AUTH_CLIENT_SECRET=', '');
    }
    if (oauthProviders.includes('google')) {
      lines.push('GOOGLE_CLIENT_ID=', 'GOOGLE_CLIENT_SECRET=', '');
    }
    if (oauthProviders.includes('facebook')) {
      lines.push('FACEBOOK_CLIENT_ID=', 'FACEBOOK_CLIENT_SECRET=', '');
    }
    if (oauthProviders.includes('twitter')) {
      lines.push('TWITTER_CONSUMER_KEY=', 'TWITTER_CONSUMER_SECRET=', '');
    }
  }

  if (config.storageProvider !== 'local') {
    lines.push('# Storage');
    if (config.storageProvider === 'firebase') {
      lines.push(
        'FIREBASE_API_KEY=',
        'FIREBASE_AUTH_DOMAIN=',
        'FIREBASE_PROJECT_ID=',
        'FIREBASE_STORAGE_BUCKET=',
        'FIREBASE_MESSAGING_SENDER_ID=',
        'FIREBASE_APP_ID=',
        'FIREBASE_STORAGE_ROOT=',
        '',
      );
    } else {
      lines.push(
        'AWS_ACCESS_KEY_ID=',
        'AWS_SECRET_ACCESS_KEY=',
        'AWS_REGION=',
        'AWS_S3_BUCKET=',
        '',
      );
    }
  }

  lines.push('# Monitoring (optional)', 'SENTRY_DSN=', '');

  return lines.join('\n').trimEnd();
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function getTemplateSourcePath(): Promise<string> {
  // Only check for bundled templates in the CLI package
  const possiblePaths = [
    resolve(__dirname, '../templates'),
    resolve(__dirname, '../../templates'),
    resolve(process.cwd(), 'node_modules/create-veraclins-app/templates'),
  ];

  for (const templatePath of possiblePaths) {
    if (await pathExists(templatePath)) {
      return templatePath;
    }
  }

  throw new Error(
    `Template source not found. Tried:\n${possiblePaths.map((p) => `  - ${p}`).join('\n')}\n` +
      'The CLI package may be corrupted or templates were not bundled.\n' +
      'Templates should be copied from packages/starter-templates/templates during build.\n' +
      'Please reinstall the package or report this issue.',
  );
}

export async function generateProject(config: TemplateConfig) {
  const spinner = ora('Creating project...').start();

  try {
    const projectPath = resolve(process.cwd(), config.projectName);

    if (await pathExists(projectPath)) {
      spinner.fail(`Directory ${config.projectName} already exists`);
      process.exit(1);
    }

    spinner.text = 'Creating project directory...';
    await ensureDir(projectPath);

    spinner.text = 'Locating template source...';
    const templatePath = await getTemplateSourcePath();
    spinner.text = 'Copying base template...';
    await copyBaseTemplate(projectPath, templatePath);
    await ensureGitignore(projectPath, templatePath);

    if (config.features.length > 0) {
      spinner.text = 'Including feature modules...';
      for (const feature of config.features) {
        await includeFeatureModule(projectPath, feature, config, templatePath);
      }
    }

    spinner.text = 'Configuring services...';
    await configureServices(projectPath, config, templatePath);

    spinner.text = 'Configuring deployment...';
    await configureDeployment(projectPath, config, templatePath);

    spinner.text = 'Rendering template variables...';
    await renderTemplateVariables(projectPath, config);

    spinner.text = 'Adding optional dependencies...';
    await addOptionalDependencies(projectPath, config);

    spinner.text = 'Applying database and schema options...';
    await applyDatabaseToPrismaSchema(projectPath, config);

    spinner.text = 'Creating .env file...';
    await writeEnvFile(projectPath, config);

    spinner.text = 'Initializing git repository...';
    await initGitRepoIfNeeded(projectPath);

    if (!config.skipInstall) {
      spinner.text = 'Installing dependencies...';
      await installDependencies(projectPath, config);
    }

    spinner.succeed('Project created successfully!');

    console.log('\n' + chalk.green('✨ Next steps:'));
    console.log(chalk.cyan(`  cd ${config.projectName}`));
    if (config.skipInstall) {
      console.log(chalk.cyan(`  ${config.packageManager} install`));
    }
    console.log(chalk.cyan(`  ${config.packageManager} run setup`));
    console.log(chalk.cyan(`  ${config.packageManager} run prisma:migrate`));
    console.log(chalk.cyan(`  ${config.packageManager} run dev`));
    console.log('');
  } catch (error) {
    spinner.fail('Failed to create project');
    if (error instanceof Error) {
      console.error(chalk.red('\n❌ Error:'), error.message);
    }
    throw error;
  }
}

async function copyBaseTemplate(projectPath: string, templatePath: string) {
  const basePath = join(templatePath, 'base');
  if (await pathExists(basePath)) {
    await copy(basePath, projectPath, {
      filter: (src) => !src.includes('.gitkeep'),
    });
  } else {
    throw new Error(`Template source not found at ${basePath}`);
  }
}

const DEFAULT_GITIGNORE = `# Dependencies
node_modules

# Build outputs
build
public/build
server-build
.cache

# Environment (never commit secrets)
.env
.env.local
.env.*.local

# Database
postgres-data
*.db
*.db-journal

# Testing & coverage
coverage
playwright-report
test-results

# IDE and OS
.DS_Store
.idea
.vscode
*.log

# Misc
*.tsbuildinfo
`;

/** Write .gitignore into the project so generated apps always have it (template copy may omit dotfiles in some setups). */
async function ensureGitignore(projectPath: string, templatePath: string) {
  const templateGitignore = join(templatePath, 'base', '.gitignore');
  const content = (await pathExists(templateGitignore))
    ? await readFile(templateGitignore, 'utf-8')
    : DEFAULT_GITIGNORE;
  await writeFile(join(projectPath, '.gitignore'), content);
}

async function includeFeatureModule(
  projectPath: string,
  feature: string,
  config: TemplateConfig,
  templatePath: string,
) {
  const featurePath = join(templatePath, 'features', feature);
  if (await pathExists(featurePath)) {
    await copyFeatureFiles(projectPath, featurePath, config);
    await mergePrismaSchema(projectPath, featurePath, feature);
  } else {
    console.warn(
      chalk.yellow(`⚠️  Feature module "${feature}" not found, skipping...`),
    );
  }
}

async function copyFeatureFiles(
  projectPath: string,
  featurePath: string,
  _config: TemplateConfig,
) {
  const appPath = join(featurePath, 'app');
  if (await pathExists(appPath)) {
    const targetAppPath = join(projectPath, 'app');
    await copy(appPath, targetAppPath, {
      overwrite: true,
    });
  }
}

async function mergePrismaSchema(
  projectPath: string,
  featurePath: string,
  feature: string,
) {
  const featureSchemaPath = join(featurePath, 'prisma', 'schema.prisma');
  const mainSchemaPath = join(projectPath, 'prisma', 'schema.prisma');

  if (!(await pathExists(featureSchemaPath))) {
    return;
  }

  let mainSchema = await readFile(mainSchemaPath, 'utf-8');
  const featureSchema = await readFile(featureSchemaPath, 'utf-8');

  const userRels = FEATURE_USER_RELATIONS[feature];
  if (userRels?.length) {
    const block = `${userRels.join('\n')}\n\n  `;
    mainSchema = mainSchema.replace(
      /\n\s{2}@@index\(\[email\]\)/,
      () => `\n${block}@@index([email])`,
    );
  }

  const auditRels = FEATURE_AUDITLOG_RELATIONS[feature];
  if (auditRels?.length) {
    const block = `${auditRels.join('\n')}\n\n  `;
    mainSchema = mainSchema.replace(
      /(\s{2}actor User @relation\(fields: \[actorId\], references: \[id\], onDelete: Cascade\)\n)(\n\s{2}@@index\(\[entityType, entityId\]\))/,
      `$1${block}$2`,
    );
  }

  await writeFile(mainSchemaPath, `${mainSchema}\n\n${featureSchema}`);
}

async function applyDatabaseToPrismaSchema(
  projectPath: string,
  config: TemplateConfig,
) {
  const schemaPath = join(projectPath, 'prisma', 'schema.prisma');
  if (!(await pathExists(schemaPath))) {
    return;
  }
  let schema = await readFile(schemaPath, 'utf-8');
  if (config.database === 'sqlite') {
    schema = schema.replace(
      /provider\s*=\s*"postgresql"/,
      'provider = "sqlite"',
    );
    schema = schema.replace(/"fullTextSearchPostgres"/, '"fullTextSearch"');
    schema = schema.replace(/ @db\.JsonB/g, '');
    schema = schema.replace(
      /@default\(dbgenerated\("\(NOW\(\) \+ '1 year'::interval\)"\)\)/g,
      "@default(dbgenerated(\"datetime('now', '+1 year')\"))",
    );
  }
  await writeFile(schemaPath, schema);
}

async function configureServices(
  projectPath: string,
  config: TemplateConfig,
  templatePath: string,
) {
  const servicesPath = join(templatePath, 'services');

  // Base template app/utils/email.server.ts already exports sendEmail (Resend).
  // Do not overwrite it with provider class files that do not export sendEmail.
  if (config.emailProvider !== 'none') {
    // Optional: add provider-specific config or env here; keep base email.server.ts.
  }

  if (config.storageProvider !== 'local') {
    const storagePath = join(
      servicesPath,
      'storage',
      `${config.storageProvider}.ts`,
    );
    if (await pathExists(storagePath)) {
      const targetPath = join(
        projectPath,
        'app',
        'services',
        `${config.storageProvider}.server.ts`,
      );
      await ensureDir(dirname(targetPath));
      await copy(storagePath, targetPath);
    }
  }
}

async function configureDeployment(
  projectPath: string,
  config: TemplateConfig,
  templatePath: string,
) {
  if (config.deploymentTarget === 'none') {
    return;
  }

  const configsPath = join(templatePath, 'configs', config.deploymentTarget);
  if (await pathExists(configsPath)) {
    await copy(configsPath, projectPath, {
      overwrite: true,
    });
  }
}

async function renderTemplateVariables(
  projectPath: string,
  config: TemplateConfig,
) {
  const filesToRender = [
    'package.json',
    'README.md',
    'prisma/schema.prisma',
    '.env.example',
    'app/components/footer.tsx',
    'app/routes/_marketing+/index.tsx',
  ];
  for (const rel of filesToRender) {
    const filePath = join(projectPath, rel);
    if (await pathExists(filePath)) {
      const content = await readFile(filePath, 'utf-8');
      let rendered = renderTemplate(content, config);
      // Template uses static name for Nx inference; replace with project name in generated app
      if (rel === 'package.json') {
        rendered = rendered.replace(
          /"veraclins-template-base"/g,
          JSON.stringify(config.projectName),
        );
      }
      await writeFile(filePath, rendered);
    }
  }
}

/** Add dependencies required by selected optional services (e.g. firebase when storage is firebase). */
async function addOptionalDependencies(
  projectPath: string,
  config: TemplateConfig,
) {
  const pkgPath = join(projectPath, 'package.json');
  if (!(await pathExists(pkgPath))) return;

  const pkg = JSON.parse(await readFile(pkgPath, 'utf-8')) as {
    dependencies?: Record<string, string>;
  };
  if (!pkg.dependencies) pkg.dependencies = {};

  if (config.storageProvider === 'firebase') {
    pkg.dependencies['firebase'] = '^12.8.0';
  }

  await writeFile(pkgPath, JSON.stringify(pkg, null, 2));
}

async function writeEnvFile(projectPath: string, config: TemplateConfig) {
  const envPath = join(projectPath, '.env');
  const content = generateEnvContent(config);
  await writeFile(envPath, content);
}

async function initGitRepoIfNeeded(projectPath: string) {
  if (await pathExists(join(projectPath, '.git'))) {
    return;
  }

  try {
    const { exitCode } = await execa('git', ['rev-parse', '--git-dir'], {
      cwd: projectPath,
      reject: false,
    });
    if (exitCode === 0) {
      return;
    }
  } catch {
    // Not a git repo, continue to init
  }

  await execa('git', ['init'], { cwd: projectPath, stdio: 'pipe' });
}

async function installDependencies(
  projectPath: string,
  config: TemplateConfig,
) {
  await execa(config.packageManager, ['install'], {
    cwd: projectPath,
    stdio: 'inherit',
  });
}
