export interface StarterAppGeneratorSchema {
  name: string;
  description?: string;
  features?: string[];
  database?: 'postgresql' | 'sqlite';
  emailProvider?: 'resend' | 'sendgrid' | 'none';
  storageProvider?: 'firebase' | 's3' | 'local' | 'none';
  monitoringProvider?: 'sentry' | 'none';
  deploymentTarget?: 'fly.io' | 'vercel' | 'railway' | 'docker' | 'none';
}
