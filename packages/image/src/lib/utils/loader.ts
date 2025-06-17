import {
  type FullImageConfig,
  type ImageConfig,
  type ImageLoaderProps,
  imageLoaderPropsSchema,
} from './schema';
import { normalizePathTrailingSlash } from './utils';

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
}: {
  config: FullImageConfig;
  src: string;
  unoptimized: boolean;
  layout: string | undefined;
  width?: number;
  quality?: number;
  sizes?: string;
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
