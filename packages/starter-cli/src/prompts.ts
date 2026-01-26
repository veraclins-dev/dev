import inquirer from 'inquirer'

import type { CliOptions, TemplateConfig } from './types.js'

export async function prompt(
	projectName?: string,
	options?: CliOptions,
): Promise<TemplateConfig> {
	const answers = await inquirer.prompt([
		{
			type: 'input',
			name: 'projectName',
			message: 'What is the name of your project?',
			default: projectName || 'my-app',
			validate: (input: string) => {
				if (!/^[a-z0-9-]+$/.test(input)) {
					return 'Project name must be lowercase alphanumeric with hyphens'
				}
				return true
			},
		},
		{
			type: 'input',
			name: 'description',
			message: 'Describe your application:',
			default: 'A Veraclins-based application',
		},
		{
			type: 'input',
			name: 'author',
			message: 'Author name:',
			default: 'Veraclins Tech Solutions',
		},
		{
			type: 'checkbox',
			name: 'authProviders',
			message: 'Select OAuth providers:',
			choices: [
				{ name: 'GitHub', value: 'github' },
				{ name: 'Google', value: 'google' },
				{ name: 'Facebook', value: 'facebook' },
				{ name: 'Twitter/X', value: 'twitter' },
			],
			default: options?.auth?.split(',').filter(Boolean) || [],
		},
		{
			type: 'checkbox',
			name: 'features',
			message: 'Select features to include:',
			choices: [
				{ name: 'Notifications', value: 'notifications' },
				{ name: 'Admin Dashboard', value: 'admin' },
				{ name: 'Search', value: 'search' },
				{ name: 'Activity Logging', value: 'activity-logging' },
				{ name: 'Multi-tenant', value: 'multi-tenant' },
				{ name: 'Invitations', value: 'invitations' },
				{ name: 'Reporting & Moderation', value: 'reporting' },
			],
			default: options?.features?.split(',').filter(Boolean) || [],
		},
		{
			type: 'list',
			name: 'database',
			message: 'Select database:',
			choices: [
				{ name: 'PostgreSQL', value: 'postgresql' },
				{ name: 'SQLite', value: 'sqlite' },
			],
			default: options?.database || 'postgresql',
		},
		{
			type: 'list',
			name: 'emailProvider',
			message: 'Select email provider:',
			choices: [
				{ name: 'Resend', value: 'resend' },
				{ name: 'SendGrid', value: 'sendgrid' },
				{ name: 'None', value: 'none' },
			],
			default: options?.email || 'resend',
		},
		{
			type: 'list',
			name: 'storageProvider',
			message: 'Select storage provider:',
			choices: [
				{ name: 'Firebase Storage', value: 'firebase' },
				{ name: 'AWS S3', value: 's3' },
				{ name: 'Local Storage', value: 'local' },
			],
			default: options?.storage || 'firebase',
		},
		{
			type: 'list',
			name: 'deploymentTarget',
			message: 'Select deployment target:',
			choices: [
				{ name: 'Fly.io', value: 'fly.io' },
				{ name: 'Vercel', value: 'vercel' },
				{ name: 'Railway', value: 'railway' },
				{ name: 'None', value: 'none' },
			],
			default: options?.deployment || 'fly.io',
		},
		{
			type: 'list',
			name: 'packageManager',
			message: 'Select package manager:',
			choices: ['npm', 'pnpm', 'yarn'],
			default: options?.packageManager || 'npm',
		},
	])

	return {
		projectName: answers.projectName,
		description: answers.description,
		author: answers.author,
		authProviders: answers.authProviders,
		features: answers.features,
		database: answers.database,
		emailProvider: answers.emailProvider,
		storageProvider: answers.storageProvider,
		deploymentTarget: answers.deploymentTarget,
		packageManager: answers.packageManager,
		skipInstall: options?.skipInstall || false,
	}
}
