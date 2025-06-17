import {
  type FullImageConfig,
  fullImageConfigSchema,
  type ImageConfig,
} from './schema';

export const imageConfigDefault: ImageConfig = {
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  path: '/resources/image',
  minimumCacheTTL: 60,
  formats: ['image/webp'],
  contentSecurityPolicy: `script-src 'none'; frame-src 'none'; sandbox;`,
  remotePatterns: [],
  unoptimized: false,
  dangerouslyAllowSVG: false,
};

function parseEnvArray(envValue: string | undefined): number[] | undefined {
  if (!envValue) return undefined;
  try {
    return envValue.split(',').map(Number);
  } catch {
    return undefined;
  }
}

function parseEnvBoolean(envValue: string | undefined): boolean | undefined {
  if (envValue === undefined) return undefined;
  return envValue.toLowerCase() === 'true';
}

function getEnvConfig(): Partial<ImageConfig> {
  const deviceSizes = parseEnvArray(process.env.IMAGE_DEVICE_SIZES);
  const imageSizes = parseEnvArray(process.env.IMAGE_SIZES);

  return {
    deviceSizes,
    imageSizes,
    path: process.env.IMAGE_PATH,
    minimumCacheTTL: process.env.IMAGE_MINIMUM_CACHE_TTL
      ? parseInt(process.env.IMAGE_MINIMUM_CACHE_TTL, 10)
      : undefined,
    formats: process.env.IMAGE_FORMATS?.split(','),
    contentSecurityPolicy: process.env.IMAGE_CONTENT_SECURITY_POLICY,
    remotePatterns: process.env.IMAGE_REMOTE_PATTERNS
      ? JSON.parse(process.env.IMAGE_REMOTE_PATTERNS)
      : undefined,
    dangerouslyAllowSVG: parseEnvBoolean(
      process.env.IMAGE_DANGEROUSLY_ALLOW_SVG,
    ),
  };
}

export function validateConfig(config: Partial<ImageConfig>): FullImageConfig {
  try {
    const mergedConfig = {
      ...imageConfigDefault,
      ...config,
    };
    const allSizes = [
      ...mergedConfig.deviceSizes,
      ...mergedConfig.imageSizes,
    ].sort((a, b) => a - b);
    return fullImageConfigSchema.parse({
      ...mergedConfig,
      allSizes,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Invalid image configuration: ${error.message}`);
    }
    throw error;
  }
}

export function getImageConfig(config?: Partial<ImageConfig>): FullImageConfig {
  const envConfig = getEnvConfig();
  return validateConfig({ ...envConfig, ...config });
}
