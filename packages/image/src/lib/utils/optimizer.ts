import { mediaType } from '@hapi/accept';
import fs from 'fs';
import { imageSize } from 'image-size';
// @ts-expect-error no types for is-animated
import isAnimated from 'is-animated';
import path from 'path';
import sharp from 'sharp';

import { getImageConfig } from './config';
import { type FullImageConfig } from './schema';

export enum MimeType {
  svg = 'image/svg+xml',
  jpeg = 'image/jpeg',
  png = 'image/png',
  gif = 'image/gif',
  webp = 'image/webp',
  bmp = 'image/bmp',
  tiff = 'image/tiff',
  avif = 'image/avif',
}

const AVIF = 'image/avif';
const WEBP = 'image/webp';
const PNG = 'image/png';
const JPEG = 'image/jpeg';
const GIF = 'image/gif';
const SVG = 'image/svg+xml';
const ANIMATABLE_TYPES = [WEBP, PNG, GIF];
const VECTOR_TYPES = [SVG];
const BLUR_IMG_SIZE = 8;

interface ImageParamsResult {
  href: string;
  isAbsolute: boolean;
  isStatic?: boolean;
  width: number;
  quality: number;
  mimeType: string;
  sizes: number[];
  minimumCacheTTL: number;
}

export interface OptimizeImageParams {
  buffer: Buffer;
  contentType: string;
  width: number;
  quality: number;
  mimeType: string;
}

export interface OptimizeImageResult {
  buffer: Buffer;
  contentType: string;
  maxAge: number;
}

export class ImageError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode >= 400 ? statusCode : 500;
  }
}

export function getSupportedMimeType(options: string[], accept = ''): string {
  const mimeType = mediaType(accept, options);
  return accept.includes(mimeType) ? mimeType : '';
}

export function validateParams(
  req: Request,
  isDev: boolean,
): ImageParamsResult | { errorMessage: string } {
  const config = getImageConfig();
  const { deviceSizes, imageSizes, minimumCacheTTL, formats } = config;
  const url = new URL(req.url);
  const w = url.searchParams.get('w');
  const q = url.searchParams.get('q');
  const src = url.searchParams.get('url');
  let href: string;

  if (!src) {
    return { errorMessage: '"src" parameter is required' };
  } else if (Array.isArray(src)) {
    return { errorMessage: '"src" parameter cannot be an array' };
  }

  let isAbsolute: boolean;

  if (src.startsWith('/')) {
    href = src;
    isAbsolute = false;
  } else {
    let hrefParsed: URL;

    try {
      hrefParsed = new URL(src);
      href = hrefParsed.toString();
      isAbsolute = true;
    } catch (err) {
      console.warn('Invalid URL:', src, err);
      return { errorMessage: '"src" parameter is invalid' };
    }

    if (!['http:', 'https:'].includes(hrefParsed.protocol)) {
      return { errorMessage: '"src" parameter is invalid' };
    }
  }

  if (!w) {
    return { errorMessage: '"w" parameter (width) is required' };
  } else if (Array.isArray(w)) {
    return { errorMessage: '"w" parameter (width) cannot be an array' };
  }

  if (!q) {
    return { errorMessage: '"q" parameter (quality) is required' };
  } else if (Array.isArray(q)) {
    return { errorMessage: '"q" parameter (quality) cannot be an array' };
  }

  const width = parseInt(w, 10);

  if (!width || isNaN(width)) {
    return {
      errorMessage: '"w" parameter (width) must be a number greater than 0',
    };
  }

  const sizes = [...(deviceSizes || []), ...(imageSizes || [])];

  if (isDev) {
    sizes.push(BLUR_IMG_SIZE);
  }

  if (!sizes.includes(width)) {
    return {
      errorMessage: `"w" parameter (width) of ${width} is not allowed`,
    };
  }

  const quality = parseInt(q);

  if (isNaN(quality) || quality < 1 || quality > 100) {
    return {
      errorMessage:
        '"q" parameter (quality) must be a number between 1 and 100',
    };
  }

  const mimeType = getSupportedMimeType(
    formats || [],
    req.headers.get('accept') ?? '',
  );

  return {
    href,
    sizes,
    isAbsolute,
    width,
    quality,
    mimeType,
    minimumCacheTTL,
  };
}

export async function imageOptimizer(
  req: Request,
  params: ImageParamsResult,
): Promise<{ buffer: Buffer; contentType: string; maxAge: number }> {
  let upstreamBuffer: Buffer;
  let upstreamType: string | null;
  let maxAge = 31536000;
  const { isAbsolute, href, width, mimeType, quality } = params;
  const config = getImageConfig();

  if (isAbsolute) {
    const upstreamRes = await fetch(href);
    if (!upstreamRes.ok) {
      console.error('upstream image response failed', upstreamRes.status);
      throw new ImageError(
        upstreamRes.status,
        '"url" parameter is valid but upstream response is invalid',
      );
    }

    upstreamBuffer = Buffer.from(await upstreamRes.arrayBuffer());
    upstreamType =
      detectContentType(upstreamBuffer) ??
      upstreamRes.headers.get('Content-Type');
    maxAge = getMaxAge(upstreamRes.headers.get('Cache-Control'));
  } else {
    try {
      upstreamBuffer = await fsResolver(href);
      upstreamType = detectContentType(upstreamBuffer) ?? mimeType;
    } catch (err) {
      console.error('upstream image response failed for', href, err);
      throw new ImageError(
        500,
        '"url" parameter is valid but upstream response is invalid',
      );
    }
  }

  if (upstreamType) {
    const vector = VECTOR_TYPES.includes(upstreamType);
    const animate =
      ANIMATABLE_TYPES.includes(upstreamType) && isAnimated(upstreamBuffer);

    if (vector || animate) {
      return { buffer: upstreamBuffer, contentType: upstreamType, maxAge };
    }
    if (!upstreamType.startsWith('image/')) {
      console.error(
        "The requested resource isn't a valid image for",
        href,
        'received',
        upstreamType,
      );
      throw new ImageError(400, "The requested resource isn't a valid image.");
    }
  }

  let contentType: string;

  if (mimeType) {
    contentType = mimeType;
  } else if (
    upstreamType?.startsWith('image/') &&
    getExtension(upstreamType) &&
    upstreamType !== WEBP &&
    upstreamType !== AVIF
  ) {
    contentType = upstreamType;
  } else {
    contentType = PNG;
  }

  try {
    // Begin sharp transformation logic
    const transformer = sharp(upstreamBuffer);

    transformer.rotate();

    const { width: metaWidth } = await transformer.metadata();

    if (metaWidth && metaWidth > width) {
      transformer.resize(width);
    }

    if (contentType === AVIF) {
      if (transformer.avif) {
        const avifQuality = quality - 15;
        transformer.avif({
          quality: Math.max(avifQuality, 0),
          chromaSubsampling: '4:2:0', // same as webp
        });
      } else {
        console.warn(
          "Warning: Your installed version of the 'sharp' package does not support AVIF images. Run 'yarn add sharp@latest' to upgrade to the latest version.",
        );
        transformer.webp({ quality });
      }
    } else if (contentType === WEBP) {
      transformer.webp({ quality });
    } else if (contentType === PNG) {
      transformer.png({ quality });
    } else if (contentType === JPEG) {
      transformer.jpeg({ quality });
    }

    const optimizedBuffer = await transformer.toBuffer();
    // End sharp transformation logic
    if (optimizedBuffer) {
      return {
        buffer: optimizedBuffer,
        contentType,
        maxAge: Math.max(maxAge, config.minimumCacheTTL),
      };
    } else {
      throw new ImageError(500, 'Unable to optimize buffer');
    }
  } catch (e) {
    console.warn('Error during image optimization', e);
    if (upstreamBuffer && upstreamType) {
      // If we fail to optimize, fallback to the original image
      return {
        buffer: upstreamBuffer,
        contentType: upstreamType,
        maxAge: config.minimumCacheTTL,
      };
    } else {
      throw new ImageError(
        500,
        'Unable to optimize image and unable to fallback to upstream image',
      );
    }
  }
}

function parseCacheControl(str: string | null): Map<string, string> {
  const map = new Map<string, string>();
  if (!str) {
    return map;
  }
  for (const directive of str.split(',')) {
    let [key, value] = directive.trim().split('=');
    key = key?.toLowerCase();
    if (value) {
      value = value.toLowerCase();
    }
    if (key && value) {
      map.set(key, value);
    }
  }
  return map;
}

export function detectContentType(buffer: Buffer): string | null {
  if ([0xff, 0xd8, 0xff].every((b, i) => buffer[i] === b)) {
    return JPEG;
  }
  if (
    [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every(
      (b, i) => buffer[i] === b,
    )
  ) {
    return PNG;
  }
  if ([0x47, 0x49, 0x46, 0x38].every((b, i) => buffer[i] === b)) {
    return GIF;
  }
  if (
    [0x52, 0x49, 0x46, 0x46, 0, 0, 0, 0, 0x57, 0x45, 0x42, 0x50].every(
      (b, i) => !b || buffer[i] === b,
    )
  ) {
    return WEBP;
  }
  if ([0x3c, 0x3f, 0x78, 0x6d, 0x6c].every((b, i) => buffer[i] === b)) {
    return SVG;
  }
  if (
    [0, 0, 0, 0, 0x66, 0x74, 0x79, 0x70, 0x61, 0x76, 0x69, 0x66].every(
      (b, i) => !b || buffer[i] === b,
    )
  ) {
    return AVIF;
  }
  return null;
}

function getMaxAge(str: string | null): number {
  const map = parseCacheControl(str);
  if (map) {
    let age = map.get('s-maxage') ?? map.get('max-age') ?? '';
    if (age.startsWith('"') && age.endsWith('"')) {
      age = age.slice(1, -1);
    }
    const n = parseInt(age, 10);
    if (!isNaN(n)) {
      return n;
    }
  }
  return 0;
}

export const fsResolver = async (src: string, basePath = 'public') => {
  const string = src.slice(1);
  const filePath = path.resolve(basePath, string);

  const buffer = fs.readFileSync(filePath);

  if (!buffer || buffer.byteLength < 2) {
    throw new ImageError(500, 'Invalid image retrieved from resolver!');
  }

  return buffer;
};

function getExtension(mimeType: string): string | null {
  const ext = mimeType.split('/')[1];
  return ext || null;
}

export async function optimizeImage(
  params: OptimizeImageParams,
  config: FullImageConfig,
): Promise<OptimizeImageResult> {
  const { buffer, contentType, width, quality, mimeType } = params;

  // Handle vector and animated images
  if (VECTOR_TYPES.includes(contentType)) {
    return { buffer, contentType, maxAge: config.minimumCacheTTL };
  }

  if (ANIMATABLE_TYPES.includes(contentType) && isAnimated(buffer)) {
    return { buffer, contentType, maxAge: config.minimumCacheTTL };
  }

  if (!contentType.startsWith('image/')) {
    throw new ImageError(400, "The requested resource isn't a valid image.");
  }

  let finalContentType = mimeType;
  if (!finalContentType) {
    if (
      contentType.startsWith('image/') &&
      contentType !== WEBP &&
      contentType !== AVIF
    ) {
      finalContentType = contentType;
    } else {
      finalContentType = PNG;
    }
  }

  try {
    const transformer = sharp(buffer);
    transformer.rotate();

    const { width: metaWidth } = await transformer.metadata();

    if (metaWidth && metaWidth > width) {
      transformer.resize(width);
    }

    if (finalContentType === AVIF) {
      if (transformer.avif) {
        const avifQuality = quality - 15;
        transformer.avif({
          quality: Math.max(avifQuality, 0),
          chromaSubsampling: '4:2:0',
        });
      } else {
        console.warn(
          'Your installed version of the sharp package does not support AVIF images. Run "npm install sharp@latest" to upgrade.',
        );
        transformer.webp({ quality });
      }
    } else if (finalContentType === WEBP) {
      transformer.webp({ quality });
    } else if (finalContentType === PNG) {
      transformer.png({ quality });
    } else if (finalContentType === JPEG) {
      transformer.jpeg({ quality });
    }

    const optimizedBuffer = await transformer.toBuffer();

    if (optimizedBuffer) {
      return {
        buffer: optimizedBuffer,
        contentType: finalContentType,
        maxAge: config.minimumCacheTTL,
      };
    }

    throw new ImageError(500, 'Unable to optimize buffer');
  } catch (error) {
    console.warn('Error during image optimization:', error);
    return {
      buffer,
      contentType,
      maxAge: config.minimumCacheTTL,
    };
  }
}
