import {
  type FullImageConfig,
  type ImageConfig,
  type ImageLoaderProps,
  imageLoaderPropsSchema,
  normalizePathTrailingSlash,
} from '../../shared';

/**
 * Client-side image loader that generates URLs for image optimization requests.
 *
 * This function generates URLs that are consumed by the server-side `imageLoader`
 * from `@veraclins-dev/image/server`. The generated URLs follow this format:
 *
 * ```
 * {config.path}?url={encodedSrc}&w={width}&q={quality}
 * ```
 *
 * The server-side loader handles these requests by:
 * 1. Extracting parameters from the URL
 * 2. Checking cache for existing optimized images
 * 3. Validating and optimizing images if not cached
 * 4. Returning optimized images with proper HTTP headers
 *
 * @param props - Image loader properties
 * @param props.src - The source image URL
 * @param props.width - The desired image width
 * @param props.quality - The image quality (1-100, defaults to 75)
 * @param props.config - Image configuration containing the optimization path
 * @returns A URL string pointing to the image optimization endpoint
 *
 * @example
 * ```tsx
 * const url = imageLoader({
 *   src: 'https://example.com/image.jpg',
 *   width: 800,
 *   quality: 85,
 *   config: { path: '/api/image' }
 * });
 * // Returns: '/api/image?url=https%3A%2F%2Fexample.com%2Fimage.jpg&w=800&q=85'
 * ```
 *
 * @see {@link https://github.com/veraclins-dev/image/blob/main/packages/image/src/lib/server/loader.ts | Server-side imageLoader} for the request handler
 */
export function imageLoader({
  src,
  width,
  quality,
  config,
}: ImageLoaderProps & { config: ImageConfig }): string {
  try {
    imageLoaderPropsSchema.parse({ src, width, quality });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Invalid image loader props: ${error.message}`);
    }
    throw error;
  }

  if (src.startsWith('//')) {
    throw new Error(
      `Failed to parse src "${src}" on \`Image.tsx\`, protocol-relative URL (//) must be changed to an absolute URL (http:// or https://)`,
    );
  }

  if (src.endsWith('.svg')) {
    // Special case to make svg serve as-is to avoid proxying
    // through the built-in Image Optimization API.
    return src;
  }

  // Generate URL that matches the format expected by the server-side imageLoader
  // Server expects: ?url={src}&w={width}&q={quality}&fit={fit}
  // Note: 'fit' parameter defaults to 'fill' on the server side
  const value = `${normalizePathTrailingSlash(
    config.path,
  )}?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
  return value;
}

export function getWidths(
  { deviceSizes, allSizes }: Pick<FullImageConfig, 'deviceSizes' | 'allSizes'>,
  width: number | undefined,
  layout: string | undefined,
  sizes: string | undefined,
): { widths: number[]; kind: 'w' | 'x' } {
  if (sizes && (layout === 'fill' || layout === 'responsive')) {
    // Find all the "vw" percent sizes used in the sizes prop
    const viewportWidthRe = /(^|\s)(1?\d?\d)vw/g;
    const percentSizes = [];
    for (let match; (match = viewportWidthRe.exec(sizes)); match) {
      const [, , size] = match;
      size && percentSizes.push(parseInt(size));
    }
    if (percentSizes.length) {
      const smallestRatio = Math.min(...percentSizes) * 0.01;
      return {
        widths: allSizes.filter(
          (s) => s >= (deviceSizes[0] || 0) * smallestRatio,
        ),
        kind: 'w',
      };
    }
    return { widths: allSizes, kind: 'w' };
  }
  if (
    typeof width !== 'number' ||
    layout === 'fill' ||
    layout === 'responsive'
  ) {
    return { widths: deviceSizes, kind: 'w' };
  }

  const widths = [
    ...new Set(
      [width, width * 2]
        .map(
          (w) => allSizes.find((p) => p >= w) || allSizes[allSizes.length - 1],
        )
        .filter(Boolean),
    ),
  ];
  return { widths, kind: 'x' };
}

export function generateImgAttrs({
  config,
  src,
  unoptimized,
  layout,
  width,
  quality,
  sizes,
}: ImageLoaderProps & {
  config: FullImageConfig;
  src: string;
  unoptimized: boolean;
  sizes: string | undefined;
}): {
  src: string;
  srcSet: string | undefined;
  sizes: string | undefined;
} {
  if (unoptimized) {
    return { src, srcSet: undefined, sizes: undefined };
  }

  const { widths, kind } = getWidths(config, width, layout, sizes);
  const last = widths.length - 1;

  return {
    sizes: !sizes && kind === 'w' ? '100vw' : sizes,
    srcSet: widths
      .map(
        (w, i) =>
          `${imageLoader({ config, src, quality, width: w })} ${
            kind === 'w' ? w : i + 1
          }${kind}`,
      )
      .join(', '),
    src: imageLoader({ config, src, quality, width: widths[last] as number }),
  };
}
