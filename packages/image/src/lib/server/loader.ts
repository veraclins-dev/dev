import { type CacheEntry, type CacheParams, ImageCache } from './cache';
import { imageOptimizer, validateParams } from './optimizer';
import { badImageResponse, getIntOrNull } from './utils';

export interface ImageLoaderOptions {
  /**
   * Directory path for image cache storage
   * @default '.cache/images'
   */
  cacheDir?: string;
  /**
   * Whether to run in development mode (affects validation)
   * @default process.env.NODE_ENV === 'development'
   */
  isDev?: boolean;
  /**
   * Base path for resolving local file paths
   * In production builds, this should point to the build output directory (e.g., 'build/client')
   * @default '' (resolves relative to current working directory)
   */
  basePath?: string;
}

/**
 * Server-side image loader that handles HTTP requests for image optimization.
 * This function:
 * 1. Extracts image parameters from the request URL
 * 2. Checks the cache for existing optimized images
 * 3. Validates and optimizes images if not cached
 * 4. Returns optimized images with proper HTTP headers
 *
 * @param request - The incoming HTTP request
 * @param options - Configuration options for the image loader
 * @returns A Response object with the optimized image or an error response
 *
 * @example
 * ```ts
 * // In a Remix/React Router route handler
 * export async function loader({ request }: LoaderFunctionArgs) {
 *   return imageLoader(request);
 * }
 * ```
 */
export async function imageLoader(
  request: Request,
  options: ImageLoaderOptions = {},
): Promise<Response> {
  const {
    cacheDir = '.cache/images',
    isDev = process.env.NODE_ENV === 'development',
    basePath = '',
  } = options;
  const url = new URL(request.url);

  const src = url.searchParams.get('url');
  if (!src) {
    return badImageResponse();
  }

  const width = getIntOrNull(url.searchParams.get('w')) || 0;
  const quality = getIntOrNull(url.searchParams.get('q')) || 75;
  const fit = url.searchParams.get('fit') || 'fill';

  const cache = new ImageCache(cacheDir);

  const cacheParams: CacheParams = {
    href: src,
    width,
    quality,
    mimeType: 'image/webp',
    method: request.method,
    fit,
  };

  const cachedEntry = await cache.get(cacheParams);
  if (cachedEntry) {
    return new Response(cachedEntry.buffer as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': cachedEntry.contentType,
        'Cache-Control': `public, max-age=${cachedEntry.maxAge}, immutable`,
        'Content-Length': cachedEntry.buffer?.length?.toFixed(0),
        ...(cachedEntry.etag && { ETag: cachedEntry.etag }),
      },
    });
  }

  try {
    const params = validateParams(request, isDev);
    if ('errorMessage' in params) {
      return badImageResponse(params.errorMessage);
    }

    const { buffer, contentType, maxAge, etag } = await imageOptimizer(
      request,
      params,
      basePath,
    );

    const cacheEntry: CacheEntry = {
      buffer,
      contentType,
      maxAge: maxAge || 31536000,
      etag: etag || '',
    };

    await cache.set(cacheParams, cacheEntry);

    return new Response(buffer as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': `public, max-age=${maxAge || 31536000}, immutable`,
        'Content-Length': buffer?.length?.toFixed(0),
        ...(etag && { ETag: etag }),
      },
    });
  } catch (error) {
    console.error(error);
    return badImageResponse();
  }
}
