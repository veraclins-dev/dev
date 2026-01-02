import type { TemplateConfig } from './types.js'

export function renderTemplate(content: string, config: TemplateConfig): string {
	let rendered = content

	const variables: Record<string, string> = {
		PROJECT_NAME: config.projectName,
		PROJECT_DESCRIPTION: config.description,
		AUTHOR: config.author || 'Veraclins Tech Solutions',
		PACKAGE_MANAGER: config.packageManager,
		DATABASE: config.database,
		EMAIL_PROVIDER: config.emailProvider,
		STORAGE_PROVIDER: config.storageProvider,
		MONITORING_PROVIDER: 'sentry',
		DEPLOYMENT_TARGET: config.deploymentTarget,
	}

	for (const [key, value] of Object.entries(variables)) {
		const regex = new RegExp(`{{${key}}}`, 'g')
		rendered = rendered.replace(regex, value)
	}

	return rendered
}

export function shouldIncludeFile(
	filePath: string,
	config: TemplateConfig,
): boolean {
	if (filePath.includes('features/')) {
		const featureName = filePath.split('features/')[1]?.split('/')[0]
		return featureName ? config.features.includes(featureName) : false
	}

	if (filePath.includes('services/email/')) {
		const provider = filePath.split('email/')[1]?.split('.')[0]
		return provider === config.emailProvider
	}

	if (filePath.includes('services/storage/')) {
		const provider = filePath.split('storage/')[1]?.split('.')[0]
		return provider === config.storageProvider
	}

	if (filePath.includes('configs/')) {
		const target = filePath.split('configs/')[1]?.split('/')[0]
		return target === config.deploymentTarget
	}

	return true
}
