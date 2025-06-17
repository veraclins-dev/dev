import {
	type FullImageConfig,
	fullImageConfigSchema,
	type ImageConfig,
} from './schema'

export const imageConfigDefault: ImageConfig = {
	deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
	imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
	path: '/resources/image',
	minimumCacheTTL: 60,
	formats: ['image/webp'],
	contentSecurityPolicy: `script-src 'none'; frame-src 'none'; sandbox;`,
}

export function validateConfig(config: Partial<ImageConfig>): FullImageConfig {
	try {
		const mergedConfig = {
			...imageConfigDefault,
			...config,
		}
		const allSizes = [
			...mergedConfig.deviceSizes,
			...mergedConfig.imageSizes,
		].sort((a, b) => a - b)
		return fullImageConfigSchema.parse({
			...mergedConfig,
			allSizes,
		})
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(`Invalid image configuration: ${error.message}`)
		}
		throw error
	}
}

export function getImageConfig(config?: Partial<ImageConfig>): FullImageConfig {
	return validateConfig(config || {})
}
