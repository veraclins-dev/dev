import type { names } from '@nx/devkit';

// ============================================================================
// SHARED TYPE DEFINITIONS
// ============================================================================

export type DatabaseType = 'postgresql' | 'sqlite';
export type EmailProvider = 'resend' | 'sendgrid' | 'none';
export type StorageProvider = 'firebase' | 's3' | 'local' | 'none';
export type MonitoringProvider = 'sentry' | 'none';
export type DeploymentTarget =
  | 'fly.io'
  | 'vercel'
  | 'railway'
  | 'docker'
  | 'none';

// ============================================================================
// GENERATOR SCHEMA
// ============================================================================

export interface StarterAppGeneratorSchema {
  name: string;
  directory?: string;
  description?: string;
  author?: string;
  features?: string[];
  database?: DatabaseType;
  emailProvider?: EmailProvider;
  storageProvider?: StorageProvider;
  monitoringProvider?: MonitoringProvider;
  deploymentTarget?: DeploymentTarget;
  skipInstall?: boolean;
  skipFormat?: boolean;
}

// ============================================================================
// NORMALIZED SCHEMA
// ============================================================================

export interface NormalizedSchema extends StarterAppGeneratorSchema {
  projectName: string;
  projectRoot: string;
  importPath: string;
  names: ReturnType<typeof names>;
  features: string[];
  database: DatabaseType;
  emailProvider: EmailProvider;
  storageProvider: StorageProvider;
  monitoringProvider: MonitoringProvider;
  deploymentTarget: DeploymentTarget;
  description: string;
}
