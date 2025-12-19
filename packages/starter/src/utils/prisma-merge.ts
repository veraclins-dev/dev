import type { Tree } from '@nx/devkit';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import type { TemplateConfig } from './template.js';

/**
 * Feature dependencies - some features require others
 */
export const FEATURE_DEPENDENCIES: Record<string, string[]> = {
  notifications: ['activity-logging'],
  admin: [],
  search: [],
  'activity-logging': [],
  reporting: [],
  moderation: [],
  invitations: [],
  mfa: [],
};

/**
 * Get all required features including dependencies
 */
export function getAllRequiredFeatures(features: string[]): string[] {
  const allFeatures = new Set<string>(features);

  for (const feature of features) {
    const deps = FEATURE_DEPENDENCIES[feature] || [];
    for (const dep of deps) {
      allFeatures.add(dep);
    }
  }

  return Array.from(allFeatures);
}

/**
 * Read Prisma schema from a file
 */
export function readPrismaSchema(filePath: string): string {
  return readFileSync(filePath, 'utf-8');
}

/**
 * Parse Prisma schema into sections (models, enums, etc.)
 * This is a simplified parser - for production, consider using @prisma/schema-parser
 */
export function parsePrismaSchema(schema: string): {
  models: string[];
  enums: string[];
  header: string;
  footer: string;
} {
  const lines = schema.split('\n');
  const models: string[] = [];
  const enums: string[] = [];
  let header = '';
  const footer = '';
  let currentSection: 'header' | 'model' | 'enum' | 'footer' = 'header';
  let currentBlock: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith('model ')) {
      if (currentSection === 'header' && currentBlock.length > 0) {
        header = currentBlock.join('\n');
      }
      currentSection = 'model';
      currentBlock = [line];
    } else if (trimmed.startsWith('enum ')) {
      if (currentSection === 'model' && currentBlock.length > 0) {
        models.push(currentBlock.join('\n'));
      }
      currentSection = 'enum';
      currentBlock = [line];
    } else if (trimmed === '}' && currentSection !== 'header') {
      currentBlock.push(line);
      if (currentSection === 'model') {
        models.push(currentBlock.join('\n'));
        currentSection = 'header';
      } else if (currentSection === 'enum') {
        enums.push(currentBlock.join('\n'));
        currentSection = 'header';
      }
      currentBlock = [];
    } else {
      if (currentSection === 'header') {
        currentBlock.push(line);
      } else {
        currentBlock.push(line);
      }
    }
  }

  if (currentSection === 'header' && currentBlock.length > 0) {
    header = currentBlock.join('\n');
  }

  return { models, enums, header, footer };
}

/**
 * Merge multiple Prisma schemas into one
 */
export function mergePrismaSchemas(schemas: string[]): string {
  const allModels: string[] = [];
  const allEnums: string[] = [];
  let header = '';

  for (const schema of schemas) {
    const parsed = parsePrismaSchema(schema);
    if (parsed.header && !header) {
      header = parsed.header;
    }
    allModels.push(...parsed.models);
    allEnums.push(...parsed.enums);
  }

  // Remove duplicates (simple check by model/enum name)
  const uniqueModels = new Map<string, string>();
  const uniqueEnums = new Map<string, string>();

  for (const model of allModels) {
    const modelName = model.match(/^model\s+(\w+)/)?.[1];
    if (modelName) {
      uniqueModels.set(modelName, model);
    }
  }

  for (const enumDef of allEnums) {
    const enumName = enumDef.match(/^enum\s+(\w+)/)?.[1];
    if (enumName) {
      uniqueEnums.set(enumName, enumDef);
    }
  }

  // Combine into final schema
  const finalSchema = [
    header,
    '',
    ...Array.from(uniqueModels.values()),
    '',
    ...Array.from(uniqueEnums.values()),
  ].join('\n');

  return finalSchema;
}

/**
 * Generate the final Prisma schema by merging base and feature schemas
 */
export function generatePrismaSchema(
  tree: Tree,
  templateSourcePath: string,
  config: TemplateConfig,
  targetPath: string,
): void {
  const allFeatures = getAllRequiredFeatures(config.features);
  const schemas: string[] = [];

  // Read base schema
  const baseSchemaPath = join(templateSourcePath, 'base/prisma/schema.prisma');
  const baseSchema = readPrismaSchema(baseSchemaPath);
  schemas.push(baseSchema);

  // Read feature schemas
  for (const feature of allFeatures) {
    const featureSchemaPath = join(
      templateSourcePath,
      `features/${feature}/prisma/schema.prisma`,
    );

    try {
      const featureSchema = readPrismaSchema(featureSchemaPath);
      schemas.push(featureSchema);
    } catch (_error) {
      // Feature might not have a schema (e.g., mfa uses existing Verification model)
      console.warn(`No schema found for feature: ${feature}`);
    }
  }

  // Merge schemas
  const mergedSchema = mergePrismaSchemas(schemas);

  // Apply template variables
  const renderedSchema = mergedSchema
    .replace(/\{\{DATABASE\}\}/g, config.database)
    .replace(/\{\{PROJECT_NAME\}\}/g, config.projectName);

  // Write to tree
  tree.write(targetPath, renderedSchema);
}
