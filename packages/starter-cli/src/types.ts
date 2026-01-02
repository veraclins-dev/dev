export interface TemplateConfig {
	projectName: string
	description: string
	author?: string
	authProviders: string[]
	features: string[]
	database: 'postgresql' | 'sqlite'
	emailProvider: 'resend' | 'sendgrid' | 'none'
	storageProvider: 'firebase' | 's3' | 'local'
	deploymentTarget: 'fly.io' | 'vercel' | 'railway' | 'none'
	packageManager: 'npm' | 'pnpm' | 'yarn'
	skipInstall?: boolean
}

export interface CliOptions {
	auth?: string
	features?: string
	database?: string
	email?: string
	storage?: string
	deployment?: string
	packageManager?: string
	skipInstall?: boolean
}
