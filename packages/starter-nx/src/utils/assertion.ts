import type {
  DatabaseType,
  DeploymentTarget,
  EmailProvider,
  MonitoringProvider,
  StorageProvider,
} from '../generators/app/schema.js';
import type { StarterAppGeneratorSchema } from '../generators/app/schema.js';

const VALID_FEATURES = [
  'notifications',
  'admin',
  'search',
  'activity-logging',
  'reporting',
  'moderation',
  'invitations',
  'mfa',
] as const;

const VALID_EMAIL_PROVIDERS: readonly EmailProvider[] = [
  'resend',
  'sendgrid',
  'none',
] as const;

const VALID_STORAGE_PROVIDERS: readonly StorageProvider[] = [
  'firebase',
  's3',
  'local',
  'none',
] as const;

const VALID_MONITORING_PROVIDERS: readonly MonitoringProvider[] = [
  'sentry',
  'none',
] as const;

const VALID_DATABASES: readonly DatabaseType[] = [
  'postgresql',
  'sqlite',
] as const;

const VALID_DEPLOYMENT_TARGETS: readonly DeploymentTarget[] = [
  'fly.io',
  'vercel',
  'railway',
  'docker',
  'none',
] as const;

export type Feature = (typeof VALID_FEATURES)[number];

/**
 * Type-safe helper to check if a value is in a readonly array
 * Uses iteration to avoid type casting issues with includes()
 */
function isInArray<T extends string>(
  value: unknown,
  array: readonly T[],
): value is T {
  if (typeof value !== 'string') {
    return false;
  }
  for (const item of array) {
    if (item === value) {
      return true;
    }
  }
  return false;
}

/**
 * Type guard to check if a value is a valid feature
 */
function isValidFeature(value: unknown): value is Feature {
  return isInArray(value, VALID_FEATURES);
}

/**
 * Type guard to check if a value is a valid email provider
 */
function isValidEmailProvider(value: unknown): value is EmailProvider {
  if (value === undefined) return false;
  return isInArray(value, VALID_EMAIL_PROVIDERS);
}

/**
 * Type guard to check if a value is a valid storage provider
 */
function isValidStorageProvider(value: unknown): value is StorageProvider {
  if (value === undefined) return false;
  return isInArray(value, VALID_STORAGE_PROVIDERS);
}

/**
 * Type guard to check if a value is a valid monitoring provider
 */
function isValidMonitoringProvider(
  value: unknown,
): value is MonitoringProvider {
  if (value === undefined) return false;
  return isInArray(value, VALID_MONITORING_PROVIDERS);
}

/**
 * Type guard to check if a value is a valid database type
 */
function isValidDatabase(value: unknown): value is DatabaseType {
  if (value === undefined) return false;
  return isInArray(value, VALID_DATABASES);
}

/**
 * Type guard to check if a value is a valid deployment target
 */
function isValidDeploymentTarget(value: unknown): value is DeploymentTarget {
  if (value === undefined) return false;
  return isInArray(value, VALID_DEPLOYMENT_TARGETS);
}

/**
 * Assert that a feature name is valid
 */
export function assertValidFeature(
  feature: string,
): asserts feature is Feature {
  if (!isValidFeature(feature)) {
    throw new Error(
      `Invalid feature: "${feature}". Valid features are: ${VALID_FEATURES.join(', ')}`,
    );
  }
}

/**
 * Assert that all features are valid
 */
export function assertValidFeatures(
  features: string[],
): asserts features is Feature[] {
  for (const feature of features) {
    assertValidFeature(feature);
  }
}

/**
 * Assert that email provider is valid
 */
export function assertValidEmailProvider(
  provider: EmailProvider | undefined,
): asserts provider is EmailProvider | undefined {
  if (provider !== undefined && !isValidEmailProvider(provider)) {
    throw new Error(
      `Invalid email provider: "${provider}". Valid providers are: ${VALID_EMAIL_PROVIDERS.join(', ')}`,
    );
  }
}

/**
 * Assert that storage provider is valid
 */
export function assertValidStorageProvider(
  provider: StorageProvider | undefined,
): asserts provider is StorageProvider | undefined {
  if (provider !== undefined && !isValidStorageProvider(provider)) {
    throw new Error(
      `Invalid storage provider: "${provider}". Valid providers are: ${VALID_STORAGE_PROVIDERS.join(', ')}`,
    );
  }
}

/**
 * Assert that monitoring provider is valid
 */
export function assertValidMonitoringProvider(
  provider: MonitoringProvider | undefined,
): asserts provider is MonitoringProvider | undefined {
  if (provider !== undefined && !isValidMonitoringProvider(provider)) {
    throw new Error(
      `Invalid monitoring provider: "${provider}". Valid providers are: ${VALID_MONITORING_PROVIDERS.join(', ')}`,
    );
  }
}

/**
 * Assert that database type is valid
 */
export function assertValidDatabase(
  database: DatabaseType | undefined,
): asserts database is DatabaseType | undefined {
  if (database !== undefined && !isValidDatabase(database)) {
    throw new Error(
      `Invalid database: "${database}". Valid databases are: ${VALID_DATABASES.join(', ')}`,
    );
  }
}

/**
 * Assert that deployment target is valid
 */
export function assertValidDeploymentTarget(
  target: DeploymentTarget | undefined,
): asserts target is DeploymentTarget | undefined {
  if (target !== undefined && !isValidDeploymentTarget(target)) {
    throw new Error(
      `Invalid deployment target: "${target}". Valid targets are: ${VALID_DEPLOYMENT_TARGETS.join(', ')}`,
    );
  }
}

/**
 * Validate all options in the schema
 */
export function assertValidOptions(options: StarterAppGeneratorSchema): void {
  // Validate features
  if (options.features) {
    assertValidFeatures(options.features);
  }

  // Validate providers - these are already typed correctly from the schema
  assertValidEmailProvider(options.emailProvider);
  assertValidStorageProvider(options.storageProvider);
  assertValidMonitoringProvider(options.monitoringProvider);
  assertValidDatabase(options.database);
  assertValidDeploymentTarget(options.deploymentTarget);
}
