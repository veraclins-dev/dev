import { logger } from '@nx/devkit';

import type { NormalizedSchema } from '../schema.js';

/**
 * Show warnings for potentially problematic configurations
 */
export function showPossibleWarnings(
  options: NormalizedSchema,
): void {
  // Warn if notifications is selected without activity-logging
  // (Note: activity-logging is automatically added as a dependency,
  // but we can still warn the user)
  if (
    options.features.includes('notifications') &&
    !options.features.includes('activity-logging')
  ) {
    logger.warn(
      'The notifications feature requires activity-logging. ' +
        'It will be automatically added.',
    );
  }

  // Warn if using SQLite in production-like scenarios
  if (options.database === 'sqlite' && options.deploymentTarget !== 'none') {
    logger.warn(
      'SQLite is typically not recommended for production deployments. ' +
        'Consider using PostgreSQL for better scalability and reliability.',
    );
  }

  // Warn if no email provider is selected but features that need email are enabled
  if (
    options.emailProvider === 'none' &&
    (options.features.includes('notifications') ||
      options.features.includes('invitations'))
  ) {
    logger.warn(
      'Email provider is set to "none", but some selected features ' +
        '(notifications, invitations) may require email functionality.',
    );
  }
}

