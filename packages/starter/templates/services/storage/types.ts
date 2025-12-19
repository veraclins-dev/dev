// ============================================================================
// STORAGE SERVICE TYPES
// ============================================================================

export type StorageProvider = 'firebase' | 's3' | 'local' | 'none'

export interface UploadFileOptions {
	file: File | Blob
	filename: string
	path?: string
	contentType?: string
	public?: boolean
}

export interface UploadFileResult {
	url: string
	path: string
}

export interface StorageProviderInterface {
	uploadFile(options: UploadFileOptions): Promise<UploadFileResult>
	deleteFile(path: string): Promise<void>
	getPublicUrl(path: string): string
}
