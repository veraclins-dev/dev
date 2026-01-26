// ============================================================================
// STORAGE SERVICE ABSTRACTION
// ============================================================================

import { type StorageProvider, type UploadFileOptions, type UploadFileResult } from './types'
import { FirebaseStorageProvider, type FirebaseConfig } from './firebase'
import { S3StorageProvider, type S3Config } from './s3'
import { LocalStorageProvider, type LocalStorageConfig } from './local'

let storageProviderInstance: {
	uploadFile: (options: UploadFileOptions) => Promise<UploadFileResult>
	deleteFile: (path: string) => Promise<void>
	getPublicUrl: (path: string) => string
} | null = null

export function initializeStorageProvider(
	provider: StorageProvider,
	config: FirebaseConfig | S3Config | LocalStorageConfig,
) {
	switch (provider) {
		case 'firebase':
			storageProviderInstance = new FirebaseStorageProvider(config as FirebaseConfig)
			break
		case 's3':
			storageProviderInstance = new S3StorageProvider(config as S3Config)
			break
		case 'local':
			storageProviderInstance = new LocalStorageProvider(config as LocalStorageConfig)
			break
		case 'none':
			storageProviderInstance = {
				async uploadFile() {
					console.warn('Storage provider not configured. File not uploaded.')
					return {
						url: '',
						path: '',
					}
				},
				async deleteFile() {
					console.warn('Storage provider not configured. File not deleted.')
				},
				getPublicUrl() {
					return ''
				},
			}
			break
		default:
			throw new Error(`Unknown storage provider: ${provider}`)
	}
}

export async function uploadFile(
	options: UploadFileOptions,
): Promise<UploadFileResult> {
	if (!storageProviderInstance) {
		throw new Error(
			'Storage provider not initialized. Call initializeStorageProvider() first.',
		)
	}

	return storageProviderInstance.uploadFile(options)
}

export async function deleteFile(path: string): Promise<void> {
	if (!storageProviderInstance) {
		throw new Error(
			'Storage provider not initialized. Call initializeStorageProvider() first.',
		)
	}

	return storageProviderInstance.deleteFile(path)
}

export function getPublicUrl(path: string): string {
	if (!storageProviderInstance) {
		throw new Error(
			'Storage provider not initialized. Call initializeStorageProvider() first.',
		)
	}

	return storageProviderInstance.getPublicUrl(path)
}

// Re-export types
export type { StorageProvider, UploadFileOptions, UploadFileResult } from './types'
