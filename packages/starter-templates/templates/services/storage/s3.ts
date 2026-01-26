// ============================================================================
// AWS S3 STORAGE PROVIDER
// ============================================================================

import {
	DeleteObjectCommand,
	GetObjectCommand,
	PutObjectCommand,
	S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

import {
	type StorageProviderInterface,
	type UploadFileOptions,
	type UploadFileResult,
} from './types'

export interface S3Config {
	accessKeyId: string
	secretAccessKey: string
	region: string
	bucket: string
	endpoint?: string
}

export class S3StorageProvider implements StorageProviderInterface {
	private client: S3Client
	private bucket: string

	constructor(config: S3Config) {
		this.client = new S3Client({
			region: config.region,
			credentials: {
				accessKeyId: config.accessKeyId,
				secretAccessKey: config.secretAccessKey,
			},
			...(config.endpoint && { endpoint: config.endpoint }),
		})
		this.bucket = config.bucket
	}

	async uploadFile(options: UploadFileOptions): Promise<UploadFileResult> {
		try {
			const filePath = options.path
				? `${options.path}/${options.filename}`
				: `uploads/${options.filename}`

			const arrayBuffer = await options.file.arrayBuffer()
			const buffer = Buffer.from(arrayBuffer)

			const command = new PutObjectCommand({
				Bucket: this.bucket,
				Key: filePath,
				Body: buffer,
				ContentType: options.contentType || options.file.type,
				...(options.public && { ACL: 'public-read' }),
			})

			await this.client.send(command)

			// Generate public URL
			const url = options.public
				? `https://${this.bucket}.s3.${this.client.config.region}.amazonaws.com/${filePath}`
				: await this.getSignedUrl(filePath)

			return {
				url,
				path: filePath,
			}
		} catch (error) {
			console.error('S3 upload error:', error)
			throw new Error(`Failed to upload file: ${error instanceof Error ? error.message : 'Unknown error'}`)
		}
	}

	async deleteFile(path: string): Promise<void> {
		try {
			const command = new DeleteObjectCommand({
				Bucket: this.bucket,
				Key: path,
			})
			await this.client.send(command)
		} catch (error) {
			console.error('S3 delete error:', error)
			throw new Error(`Failed to delete file: ${error instanceof Error ? error.message : 'Unknown error'}`)
		}
	}

	private async getSignedUrl(path: string): Promise<string> {
		const command = new GetObjectCommand({
			Bucket: this.bucket,
			Key: path,
		})
		return getSignedUrl(this.client, command, { expiresIn: 3600 })
	}

	getPublicUrl(path: string): string {
		return `https://${this.bucket}.s3.${this.client.config.region}.amazonaws.com/${path}`
	}
}
