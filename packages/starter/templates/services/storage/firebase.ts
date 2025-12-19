// ============================================================================
// FIREBASE STORAGE PROVIDER
// ============================================================================

import { initializeApp } from 'firebase/app'
import {
	type StorageError,
	getStorage,
	ref,
	uploadBytes,
	getDownloadURL,
	deleteObject,
} from 'firebase/storage'
import {
	type UploadFileOptions,
	type UploadFileResult,
	type StorageProviderInterface,
} from './types'

export interface FirebaseConfig {
	apiKey: string
	authDomain: string
	projectId: string
	storageBucket: string
	messagingSenderId: string
	appId: string
	measurementId?: string
	storageRoot?: string
}

export class FirebaseStorageProvider implements StorageProviderInterface {
	private config: FirebaseConfig
	private app: ReturnType<typeof initializeApp> | null = null

	constructor(config: FirebaseConfig) {
		this.config = config
	}

	private getApp() {
		if (!this.app) {
			const { storageRoot, ...firebaseConfig } = this.config
			this.app = initializeApp(firebaseConfig)
		}
		return this.app
	}

	private getStorage() {
		return getStorage(this.getApp())
	}

	async uploadFile(options: UploadFileOptions): Promise<UploadFileResult> {
		try {
			const storage = this.getStorage()
			const filePath = options.path
				? `${options.path}/${options.filename}`
				: `uploads/${options.filename}`
			const storageRef = ref(storage, filePath)

			await uploadBytes(storageRef, options.file, {
			contentType: options.contentType || options.file.type,
		})

			const url = await getDownloadURL(storageRef)

			return {
				url,
				path: filePath,
			}
		} catch (error) {
			const err = error as StorageError
			console.error('Firebase upload error:', err)
			throw new Error(`Failed to upload file: ${err.message}`)
		}
	}

	async deleteFile(path: string): Promise<void> {
		try {
			const storage = this.getStorage()
			const storageRef = ref(storage, path)
			await deleteObject(storageRef)
		} catch (error) {
			const err = error as StorageError
			console.error('Firebase delete error:', err)
			throw new Error(`Failed to delete file: ${err.message}`)
		}
	}

	getPublicUrl(path: string): string {
		const encodedPath = encodeURIComponent(path)
		const storageRoot = this.config.storageRoot || 'https://firebasestorage.googleapis.com/v0/b/'
		return `${storageRoot}${this.config.storageBucket}/o/${encodedPath}?alt=media`
	}
}
