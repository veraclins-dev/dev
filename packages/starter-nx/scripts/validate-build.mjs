#!/usr/bin/env node

/**
 * Validates that the built package contains all required files
 * and that the generator is properly configured.
 */

import { existsSync, readFileSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get the dist directory path
// From packages/starter/scripts/validate-build.mjs
// Go up to workspace root (../../../), then to dist/packages/starter
const workspaceRoot = join(__dirname, '../../..');
const distPath = join(workspaceRoot, 'dist/packages/starter');

const errors = [];
const warnings = [];

function checkFile(path, description) {
  const fullPath = join(distPath, path);
  if (!existsSync(fullPath)) {
    errors.push(`Missing required file: ${path}`);
    return false;
  }

  const stats = statSync(fullPath);
  if (stats.size === 0) {
    warnings.push(`Empty file: ${path}`);
  }

  return true;
}

function checkDirectory(path, description) {
  const fullPath = join(distPath, path);
  if (!existsSync(fullPath)) {
    errors.push(`Missing required directory: ${path}`);
    return false;
  }

  const stats = statSync(fullPath);
  if (!stats.isDirectory()) {
    errors.push(`Expected directory but found file: ${path}`);
    return false;
  }

  return true;
}

function validatePackageJson() {
  const packageJsonPath = join(distPath, 'package.json');
  if (!existsSync(packageJsonPath)) {
    errors.push('Missing package.json');
    return false;
  }

  try {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

    // Check required fields
    if (!packageJson.name) {
      errors.push('package.json missing "name" field');
    }
    if (!packageJson.version) {
      errors.push('package.json missing "version" field');
    }
    if (!packageJson.generators) {
      errors.push('package.json missing "generators" field');
    }
    if (!packageJson.exports) {
      errors.push('package.json missing "exports" field');
    }

    // Check exports includes required paths
    if (packageJson.exports) {
      if (!packageJson.exports['.']) {
        errors.push('package.json exports missing "." entry');
      }
      if (!packageJson.exports['./package.json']) {
        errors.push('package.json exports missing "./package.json" entry');
      }
      if (!packageJson.exports['./generators.json']) {
        errors.push('package.json exports missing "./generators.json" entry');
      }
    }

    return true;
  } catch (error) {
    errors.push(`Failed to parse package.json: ${error.message}`);
    return false;
  }
}

function validateGeneratorsJson() {
  const generatorsJsonPath = join(distPath, 'generators.json');
  if (!existsSync(generatorsJsonPath)) {
    errors.push('Missing generators.json');
    return false;
  }

  try {
    const generatorsJson = JSON.parse(readFileSync(generatorsJsonPath, 'utf-8'));

    if (!generatorsJson.generators) {
      errors.push('generators.json missing "generators" field');
      return false;
    }

    if (!generatorsJson.generators.app) {
      errors.push('generators.json missing "app" generator');
      return false;
    }

    const appGenerator = generatorsJson.generators.app;

    // Check factory path exists
    if (appGenerator.factory) {
      const factoryPath = join(distPath, appGenerator.factory);
      if (!existsSync(factoryPath)) {
        errors.push(`Generator factory file not found: ${appGenerator.factory}`);
      }
    } else {
      errors.push('Generator missing "factory" field');
    }

    // Check schema path exists
    if (appGenerator.schema) {
      const schemaPath = join(distPath, appGenerator.schema);
      if (!existsSync(schemaPath)) {
        errors.push(`Generator schema file not found: ${appGenerator.schema}`);
      }
    } else {
      errors.push('Generator missing "schema" field');
    }

    return true;
  } catch (error) {
    errors.push(`Failed to parse generators.json: ${error.message}`);
    return false;
  }
}

function validateTemplates() {
  const templatesPath = join(distPath, 'templates');
  if (!existsSync(templatesPath)) {
    errors.push('Missing templates directory');
    return false;
  }

  // Check for base template
  const basePath = join(templatesPath, 'base');
  if (!existsSync(basePath)) {
    errors.push('Missing templates/base directory');
    return false;
  }

  // Check for key base files
  const requiredBaseFiles = [
    'package.json',
    'prisma/schema.prisma',
    'app/root.tsx',
  ];

  for (const file of requiredBaseFiles) {
    const filePath = join(basePath, file);
    if (!existsSync(filePath)) {
      warnings.push(`Missing base template file: ${file}`);
    }
  }

  return true;
}

console.log('🔍 Validating build output...\n');

// Check if dist directory exists
if (!existsSync(distPath)) {
  console.error('❌ Build output directory not found:', distPath);
  console.error('   Run "nx build starter" first');
  process.exit(1);
}

// Validate package.json
console.log('📦 Validating package.json...');
validatePackageJson();

// Validate generators.json
console.log('⚙️  Validating generators.json...');
validateGeneratorsJson();

// Check required files
console.log('📄 Checking required files...');
// Note: index.js and index.d.ts are in src/ based on build output
checkFile('src/index.js', 'Main entry point');
checkFile('src/index.d.ts', 'TypeScript definitions');
checkFile('generators.json', 'Generators configuration');
checkFile('package.json', 'Package manifest');

// Check required directories
console.log('📁 Checking required directories...');
checkDirectory('src', 'Source directory');
checkDirectory('src/generators', 'Generators directory');
checkDirectory('src/generators/app', 'App generator directory');
checkDirectory('templates', 'Templates directory');

// Validate templates
console.log('📋 Validating templates...');
validateTemplates();

// Report results
console.log('\n' + '='.repeat(50));
if (errors.length > 0) {
  console.error('\n❌ Validation failed with', errors.length, 'error(s):\n');
  errors.forEach((error, index) => {
    console.error(`  ${index + 1}. ${error}`);
  });
  process.exit(1);
} else {
  console.log('\n✅ Build validation passed!');
  if (warnings.length > 0) {
    console.log('\n⚠️  Warnings:');
    warnings.forEach((warning, index) => {
      console.warn(`  ${index + 1}. ${warning}`);
    });
  }
  console.log('\n📦 Package is ready for publishing');
  process.exit(0);
}
