import {
  type FullImageConfig,
  fullImageConfigSchema,
  type ImageConfig,
} from './schema';

const defaultConfig: ImageConfig = {
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  path: '/resources/image',
  formats: ['image/webp', 'image/avif'],
  minimumCacheTTL: 60,
  dangerouslyAllowSVG: false,
  contentSecurityPolicy:
    "default-src 'self'; script-src 'none'; frame-src 'none'; sandbox;",
  contentDispositionType: 'inline',
  remotePatterns: [],
  unoptimized: false,
  limitInputPixels: 50 * 1024 * 1024, // 50MP
  sequentialRead: false,
  timeoutInSeconds: 7,
};

export function validateConfig(config: Partial<ImageConfig>): void {
  const result = fullImageConfigSchema.safeParse(config);
  if (!result.success) {
    throw new Error(`Invalid image config: ${result.error.message}`);
  }
}

function parseEnvArray(envValue: string | undefined): number[] | undefined {
  if (!envValue) {
    return undefined;
  }
  return envValue.split(',').map((item) => parseInt(item.trim(), 10));
}

export function getImageConfigFromEnv(): Partial<ImageConfig> {
  return {
    deviceSizes: parseEnvArray(process.env.IMAGE_DEVICE_SIZES),
    imageSizes: parseEnvArray(process.env.IMAGE_SIZES),
    path: process.env.IMAGE_PATH,
    formats: process.env.IMAGE_FORMATS?.split(',').map((f) => f.trim()),
    minimumCacheTTL: process.env.IMAGE_MINIMUM_CACHE_TTL
      ? parseInt(process.env.IMAGE_MINIMUM_CACHE_TTL, 10)
      : undefined,
    dangerouslyAllowSVG: process.env.IMAGE_DANGEROUSLY_ALLOW_SVG === 'true',
    contentSecurityPolicy: process.env.IMAGE_CONTENT_SECURITY_POLICY,
    contentDispositionType:
      (process.env.IMAGE_CONTENT_DISPOSITION_TYPE as 'inline' | 'attachment') ||
      'inline',
    limitInputPixels: process.env.IMAGE_LIMIT_INPUT_PIXELS
      ? parseInt(process.env.IMAGE_LIMIT_INPUT_PIXELS, 10)
      : undefined,
    sequentialRead: process.env.IMAGE_SEQUENTIAL_READ === 'true',
    timeoutInSeconds: process.env.IMAGE_TIMEOUT_SECONDS
      ? parseInt(process.env.IMAGE_TIMEOUT_SECONDS, 10)
      : undefined,
  };
}

export function getImageConfig(
  config: Partial<ImageConfig> = {},
): FullImageConfig {
  try {
    const envConfig = getImageConfigFromEnv();

    const mergedConfig = {
      ...defaultConfig,
      ...envConfig,
      ...config,
    };

    const fullConfig = {
      ...mergedConfig,
      allSizes: mergedConfig.deviceSizes.concat(mergedConfig.imageSizes),
    };

    validateConfig(fullConfig);

    return fullConfig;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Invalid image config: ${error.message}`);
    }
    throw error;
  }
}
