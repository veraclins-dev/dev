import { createHash } from 'crypto';

import {
  badImageResponse,
  getIntOrNull,
  ImageCache,
  imageOptimizer,
  validateParams,
} from '@veraclins-dev/image/server';

import { type Route } from './+types/image';

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);

  const src = url.searchParams.get('url');
  const extension = 'webp';
  if (!src) {
    return badImageResponse();
  }

  const width = getIntOrNull(url.searchParams.get('w')) || 0;
  const fit = url.searchParams.get('fit') || 'fill';
  const quality = getIntOrNull(url.searchParams.get('q')) || 75;

  const cache = new ImageCache('.cache/images');

  // Check cache first
  const cacheParams = {
    href: src,
    width,
    quality,
    mimeType: `image/${extension}`,
    method: request.method,
    fit,
  };

  const cachedEntry = await cache.get(cacheParams);
  if (cachedEntry) {
    return new Response(cachedEntry.buffer, {
      status: 200,
      headers: {
        'Content-Type': cachedEntry.contentType,
        'Cache-Control': `public, max-age=${cachedEntry.maxAge}, immutable`,
        'Content-Length': cachedEntry.buffer.length.toFixed(0),
        ...(cachedEntry.etag && { ETag: cachedEntry.etag }),
      },
    });
  }

  try {
    const status = 200;

    const params = validateParams(
      request,
      process.env.NODE_ENV === 'development',
    );
    if ('errorMessage' in params) {
      return badImageResponse(params.errorMessage);
    }

    const { buffer, contentType, maxAge } = await imageOptimizer(
      request,
      params,
    );

    // Cache the result
    const cacheEntry = {
      buffer,
      contentType,
      maxAge: maxAge || 31536000,
      etag: `"${createHash('md5').update(buffer).digest('hex')}"`,
    };

    await cache.set(cacheParams, cacheEntry);

    return new Response(buffer, {
      status,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': `public, max-age=${maxAge || 31536000}, immutable`,
        'Content-Length': buffer.length.toFixed(0),
        ETag: cacheEntry.etag,
      },
    }) as unknown as Response;
  } catch (error) {
    console.error(error);
    return badImageResponse();
  }
};
