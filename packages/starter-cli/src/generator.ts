import chalk from 'chalk';
import { execa } from 'execa';
import { copy, ensureDir, pathExists, readFile, writeFile } from 'fs-extra';
import ora from 'ora';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

import { renderTemplate } from './template-utils.js';
import type { TemplateConfig } from './types.js';

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

async function includeFeatureModule(
  projectPath: string,
  feature: string,
  config: TemplateConfig,
  templatePath: string,
) {
  const featurePath = join(templatePath, 'features', feature);
  if (await pathExists(featurePath)) {
    await copyFeatureFiles(projectPath, featurePath, config);
    await mergePrismaSchema(projectPath, featurePath);
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

async function mergePrismaSchema(projectPath: string, featurePath: string) {
  const featureSchemaPath = join(featurePath, 'prisma', 'schema.prisma');
  const mainSchemaPath = join(projectPath, 'prisma', 'schema.prisma');

  if (await pathExists(featureSchemaPath)) {
    const featureSchema = await readFile(featureSchemaPath, 'utf-8');
    const mainSchema = await readFile(mainSchemaPath, 'utf-8');

    const updatedSchema = mainSchema + '\n\n' + featureSchema;
    await writeFile(mainSchemaPath, updatedSchema);
  }
}

async function configureServices(
  projectPath: string,
  config: TemplateConfig,
  templatePath: string,
) {
  const servicesPath = join(templatePath, 'services');

  if (config.emailProvider !== 'none') {
    const emailPath = join(servicesPath, 'email', `${config.emailProvider}.ts`);
    if (await pathExists(emailPath)) {
      const targetPath = join(projectPath, 'app', 'utils', 'email.server.ts');
      await copy(emailPath, targetPath);
    }
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
  const packageJsonPath = join(projectPath, 'package.json');
  if (await pathExists(packageJsonPath)) {
    const content = await readFile(packageJsonPath, 'utf-8');
    const rendered = renderTemplate(content, config);
    await writeFile(packageJsonPath, rendered);
  }

  const readmePath = join(projectPath, 'README.md');
  if (await pathExists(readmePath)) {
    const content = await readFile(readmePath, 'utf-8');
    const rendered = renderTemplate(content, config);
    await writeFile(readmePath, rendered);
  }
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
