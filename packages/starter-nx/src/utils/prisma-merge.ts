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
 * Parse Prisma schema into sections (generators, datasource, models, enums, etc.)
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
  const headerLines: string[] = [];
  const footer = '';
  let currentSection: 'header' | 'model' | 'enum' | 'generator' | 'datasource' =
    'header';
  let currentBlock: string[] = [];
  let braceCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Track braces for multi-line blocks
    braceCount += (line.match(/\{/g) || []).length;
    braceCount -= (line.match(/\}/g) || []).length;

    if (trimmed.startsWith('generator ')) {
      // Save previous header content
      if (currentSection === 'header' && currentBlock.length > 0) {
        headerLines.push(...currentBlock);
        currentBlock = [];
      }
      currentSection = 'generator';
      currentBlock = [line];
    } else if (trimmed.startsWith('datasource ')) {
      // Save previous generator if any
      if (currentSection === 'generator' && currentBlock.length > 0) {
        headerLines.push(...currentBlock);
        currentBlock = [];
      }
      currentSection = 'datasource';
      currentBlock = [line];
    } else if (trimmed.startsWith('model ')) {
      // Save previous section to header
      if (
        (currentSection === 'header' ||
          currentSection === 'generator' ||
          currentSection === 'datasource') &&
        currentBlock.length > 0
      ) {
        headerLines.push(...currentBlock);
        currentBlock = [];
      }
      // Save previous model if we were in model section
      if (currentSection === 'model' && currentBlock.length > 0) {
        models.push(currentBlock.join('\n'));
        currentBlock = [];
      }
      currentSection = 'model';
      currentBlock = [line];
    } else if (trimmed.startsWith('enum ')) {
      // Save previous model
      if (currentSection === 'model' && currentBlock.length > 0) {
        models.push(currentBlock.join('\n'));
        currentBlock = [];
      }
      currentSection = 'enum';
      currentBlock = [line];
    } else if (trimmed === '}' && braceCount === 0) {
      // End of a block
      currentBlock.push(line);
      if (currentSection === 'model') {
        models.push(currentBlock.join('\n'));
        currentSection = 'header';
      } else if (currentSection === 'enum') {
        enums.push(currentBlock.join('\n'));
        currentSection = 'header';
      } else if (
        currentSection === 'generator' ||
        currentSection === 'datasource'
      ) {
        headerLines.push(...currentBlock);
        currentSection = 'header';
      }
      currentBlock = [];
    } else {
      // Continue current block
      currentBlock.push(line);
    }
  }

  // Save any remaining header content
  if (
    (currentSection === 'header' ||
      currentSection === 'generator' ||
      currentSection === 'datasource') &&
    currentBlock.length > 0
  ) {
    headerLines.push(...currentBlock);
  }

  const header = headerLines.join('\n');

  return { models, enums, header, footer };
}

/**
 * Merge multiple Prisma schemas into one
 */
export function mergePrismaSchemas(schemas: string[]): string {
  const allModels: string[] = [];
  const allEnums: string[] = [];
  let header = '';

  // Always use header from first schema (base schema) which contains generator/datasource
  if (schemas.length > 0) {
    const parsed = parsePrismaSchema(schemas[0]);
    header = parsed.header || '';

    // Ensure header is not empty - if it is, there's a parsing issue
    if (!header.trim()) {
      console.warn(
        'Warning: Prisma schema header is empty. Generator and datasource blocks may be missing.',
      );
    }
  }

  // Collect models and enums from all schemas
  for (const schema of schemas) {
    const parsed = parsePrismaSchema(schema);
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
  // Ensure header is included and properly formatted
  const parts: string[] = [];

  // Always include header (should contain generator and datasource blocks)
  if (header) {
    // Preserve original header formatting (don't trim, just remove trailing newlines)
    const trimmedHeader = header.replace(/\n+$/, '');
    if (trimmedHeader) {
      parts.push(trimmedHeader);
      parts.push('');
    }
  }

  if (uniqueModels.size > 0) {
    parts.push(...Array.from(uniqueModels.values()));
    parts.push('');
  }

  if (uniqueEnums.size > 0) {
    parts.push(...Array.from(uniqueEnums.values()));
  }

  return parts.join('\n');
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
  // Replace database provider (handle both "postgresql" and "{{DATABASE}}" placeholders)
  let renderedSchema = mergedSchema
    .replace(
      /provider\s*=\s*"\{\{DATABASE\}\}"/g,
      `provider = "${config.database}"`,
    )
    .replace(/provider\s*=\s*"postgresql"/g, `provider = "${config.database}"`)
    .replace(/\{\{DATABASE\}\}/g, config.database)
    .replace(/\{\{PROJECT_NAME\}\}/g, config.projectName);

  // Remove url field from datasource block (Prisma 7 doesn't need it - uses env automatically)
  // Match datasource block and remove any url = env(...) or url = "..." lines
  renderedSchema = renderedSchema.replace(
    /(datasource\s+db\s*\{[^}]*?)(\s*url\s*=\s*(?:env\([^)]+\)|"[^"]+")\s*,?\s*\n?)([^}]*\})/g,
    (_match, before, _urlLine, after) => {
      // Remove the url line and clean up formatting
      const cleanedAfter = after.trim();
      return before + (cleanedAfter ? '\n' : '') + cleanedAfter;
    },
  );

  // Write to tree
  tree.write(targetPath, renderedSchema);
}
