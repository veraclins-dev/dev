// ============================================================================
// LOCAL STORAGE PROVIDER
// ============================================================================

import { writeFile, mkdir, unlink } from 'fs/promises'
import { join } from 'path'
import {
	type UploadFileOptions,
	type UploadFileResult,
	type StorageProviderInterface,
} from './types'

export interface LocalStorageConfig {
	uploadDir: string
	publicUrl: string
}

export class LocalStorageProvider implements StorageProviderInterface {
	private uploadDir: string
	private publicUrl: string

	constructor(config: LocalStorageConfig) {
		this.uploadDir = config.uploadDir
		this.publicUrl = config.publicUrl
	}

	async uploadFile(options: UploadFileOptions): Promise<UploadFileResult> {
		try {
			const filePath = options.path
				? `${options.path}/${options.filename}`
				: `uploads/${options.filename}`

			const fullPath = join(this.uploadDir, filePath)
			const dir = join(this.uploadDir, options.path || 'uploads')

			// Ensure directory exists
			await mkdir(dir, { recursive: true })

			// Convert file to buffer
			const arrayBuffer = await options.file.arrayBuffer()
			const buffer = Buffer.from(arrayBuffer)

			// Write file
			await writeFile(fullPath, buffer)

			// Generate public URL
			const url = `${this.publicUrl}/${filePath}`

			return {
				url,
				path: filePath,
			}
		} catch (error) {
			console.error('Local storage upload error:', error)
			throw new Error(`Failed to upload file: ${error instanceof Error ? error.message : 'Unknown error'}`)
		}
	}

	async deleteFile(path: string): Promise<void> {
		try {
			const fullPath = join(this.uploadDir, path)
			await unlink(fullPath)
		} catch (error) {
			console.error('Local storage delete error:', error)
			throw new Error(`Failed to delete file: ${error instanceof Error ? error.message : 'Unknown error'}`)
		}
	}

	getPublicUrl(path: string): string {
		return `${this.publicUrl}/${path}`
	}
}
