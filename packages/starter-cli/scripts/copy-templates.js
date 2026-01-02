#!/usr/bin/env node

import { copy, pathExists } from 'fs-extra'
import { dirname,resolve } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const CLI_ROOT = resolve(__dirname, '..')
const TEMPLATE_SOURCE = resolve(CLI_ROOT, '../../../veraclins-template/template-source')
const TEMPLATE_DEST = resolve(CLI_ROOT, 'templates')

async function copyTemplates() {
	console.log('📦 Copying templates...')

	try {
		if (!(await pathExists(TEMPLATE_SOURCE))) {
			console.warn(
				`⚠️  Template source not found at ${TEMPLATE_SOURCE}\n` +
					'   Templates will not be included in the build.\n' +
					'   Make sure veraclins-template repository is available.',
			)
			return
		}

		await copy(TEMPLATE_SOURCE, TEMPLATE_DEST, {
			overwrite: true,
			filter: (src) => {
				return !src.includes('.git') && !src.includes('node_modules')
			},
		})

		console.log('✅ Templates copied successfully!')
	} catch (error) {
		console.error('❌ Failed to copy templates:', error.message)
		process.exit(1)
	}
}

copyTemplates()
