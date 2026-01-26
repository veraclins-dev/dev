#!/usr/bin/env node

import { Command } from 'commander'
import { readFileSync } from 'fs'
import { dirname,join } from 'path'
import { fileURLToPath } from 'url'

import { generateProject } from './generator.js'
import { prompt } from './prompts.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const packageJson = JSON.parse(
	readFileSync(join(__dirname, '../package.json'), 'utf-8'),
)

const program = new Command()

program
	.name('create-veraclins-app')
	.description('Create a new Veraclins-based application')
	.version(packageJson.version)
	.argument('[project-name]', 'Name of the project')
	.option('--auth <providers>', 'OAuth providers (comma-separated: github,google,facebook,twitter)')
	.option('--features <features>', 'Features to include (comma-separated: notifications,admin,search,activity-logging,multi-tenant,invitations,reporting)')
	.option('--database <type>', 'Database type (postgresql|sqlite)', 'postgresql')
	.option('--email <provider>', 'Email provider (resend|sendgrid|none)', 'resend')
	.option('--storage <provider>', 'Storage provider (firebase|s3|local)', 'firebase')
	.option('--deployment <target>', 'Deployment target (fly.io|vercel|railway|none)', 'fly.io')
	.option('--package-manager <pm>', 'Package manager (npm|pnpm|yarn)', 'npm')
	.option('--skip-install', 'Skip dependency installation', false)
	.action(async (projectName: string | undefined, options) => {
		try {
			const config = await prompt(projectName, options)
			await generateProject(config)
		} catch (error) {
			if (error instanceof Error) {
				console.error('\n❌ Error:', error.message)
				process.exit(1)
			}
			throw error
		}
	})

program.parse()
