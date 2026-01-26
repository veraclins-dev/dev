import type {
  DatabaseType,
  DeploymentTarget,
  EmailProvider,
  MonitoringProvider,
  StorageProvider,
} from '../generators/app/schema.js';

// ============================================================================
// TEMPLATE CONFIGURATION TYPES
// ============================================================================

export interface TemplateConfig {
  projectName: string;
  description: string;
  author?: string;
  features: string[];
  database: DatabaseType;
  emailProvider: EmailProvider;
  storageProvider: StorageProvider;
  monitoringProvider: MonitoringProvider;
  deploymentTarget: DeploymentTarget;
}

// ============================================================================
// TEMPLATE RENDERING UTILITIES
// ============================================================================

export function renderTemplate(
  sourceContent: string,
  config: TemplateConfig,
): string {
  let rendered = sourceContent;

  const projectSlug = config.projectName.toLowerCase().replace(/\s+/g, '-');

  // Replace template variables
  rendered = rendered.replace(/\{\{PROJECT_NAME\}\}/g, config.projectName);
  rendered = rendered.replace(
    /\{\{PROJECT_DESCRIPTION\}\}/g,
    config.description || '',
  );
  rendered = rendered.replace(/\{\{PROJECT_SLUG\}\}/g, projectSlug);
  rendered = rendered.replace(/\{\{AUTHOR\}\}/g, config.author || 'Your Name');
  rendered = rendered.replace(/\{\{DATABASE\}\}/g, config.database);
  rendered = rendered.replace(
    /\{\{DATABASE_TYPE\}\}/g,
    config.database === 'postgresql' ? 'PostgreSQL' : 'SQLite',
  );
  // Replace database username placeholder with default 'postgres'
  rendered = rendered.replace(/<USERNAME>/g, 'postgres');
  rendered = rendered.replace(/\{\{EMAIL_PROVIDER\}\}/g, config.emailProvider);
  rendered = rendered.replace(
    /\{\{STORAGE_PROVIDER\}\}/g,
    config.storageProvider,
  );
  rendered = rendered.replace(
    /\{\{MONITORING_PROVIDER\}\}/g,
    config.monitoringProvider,
  );
  rendered = rendered.replace(
    /\{\{DEPLOYMENT_TARGET\}\}/g,
    config.deploymentTarget,
  );

  // Replace email provider specific variables
  if (config.emailProvider === 'resend') {
    rendered = rendered.replace(
      /\{\{RESEND_API_KEY\}\}/g,
      'YOUR_RESEND_API_KEY',
    );
  }
  if (config.emailProvider === 'sendgrid') {
    rendered = rendered.replace(
      /\{\{SENDGRID_API_KEY\}\}/g,
      'YOUR_SENDGRID_API_KEY',
    );
  }

  // Replace storage provider specific variables
  if (config.storageProvider === 'firebase') {
    rendered = rendered.replace(
      /\{\{FIREBASE_API_KEY\}\}/g,
      'YOUR_FIREBASE_API_KEY',
    );
    rendered = rendered.replace(
      /\{\{FIREBASE_PROJECT_ID\}\}/g,
      'YOUR_FIREBASE_PROJECT_ID',
    );
  }
  if (config.storageProvider === 's3') {
    rendered = rendered.replace(
      /\{\{AWS_ACCESS_KEY_ID\}\}/g,
      'YOUR_AWS_ACCESS_KEY_ID',
    );
    rendered = rendered.replace(
      /\{\{AWS_SECRET_ACCESS_KEY\}\}/g,
      'YOUR_AWS_SECRET_ACCESS_KEY',
    );
  }

  // Replace monitoring provider specific variables
  if (config.monitoringProvider === 'sentry') {
    rendered = rendered.replace(/\{\{SENTRY_DSN\}\}/g, 'YOUR_SENTRY_DSN');
  }

  // Replace deployment target specific variables
  if (config.deploymentTarget === 'fly.io') {
    rendered = rendered.replace(/\{\{PRIMARY_REGION\}\}/g, 'ams');
  }

  return rendered;
}

export function shouldIncludeFile(
  filePath: string,
  config: TemplateConfig,
): boolean {
  // Check if file is feature-specific
  const featurePatterns = [
    'features/notifications',
    'features/admin',
    'features/search',
    'features/activity-logging',
    'features/reporting',
    'features/moderation',
    'features/invitations',
    'features/mfa',
  ];

  for (const feature of featurePatterns) {
    if (filePath.includes(feature)) {
      const featureName = feature.replace('features/', '');
      return config.features.includes(featureName);
    }
  }

  // Check if file is service-specific
  if (filePath.includes('services/email')) {
    return config.emailProvider !== 'none';
  }
  if (filePath.includes('services/storage')) {
    return config.storageProvider !== 'none';
  }
  if (filePath.includes('services/monitoring')) {
    return config.monitoringProvider !== 'none';
  }

  // Check if file is deployment-specific
  if (filePath.includes('configs/')) {
    const deploymentPatterns = [
      'configs/fly.io',
      'configs/vercel',
      'configs/railway',
      'configs/docker',
    ];
    for (const pattern of deploymentPatterns) {
      if (filePath.includes(pattern)) {
        const target = pattern.replace('configs/', '');
        return config.deploymentTarget === target;
      }
    }
    return false;
  }

  // Include all base files
  return true;
}
