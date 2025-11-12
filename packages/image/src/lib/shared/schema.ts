import { z } from '@veraclins-dev/utils';

// Zod v4: provide a runtime-validating function "schema" workaround
// Ref: https://github.com/colinhacks/zod/issues/4143#issuecomment-2845134912
const fnSchema = <T>(arity?: number) =>
  z.custom<T>((val): val is T => {
    if (typeof val !== 'function') return false;
    if (typeof arity === 'number') {
      const fn = val as (...args: unknown[]) => unknown;
      return fn.length === arity;
    }
    return true;
  });

export const remotePatternSchema = z.object({
  protocol: z.string().optional(),
  hostname: z.string(),
  port: z.string().optional(),
  pathname: z.string().optional(),
});

export const imageConfigSchema = z.object({
  deviceSizes: z.array(z.int().positive()),
  imageSizes: z.array(z.int().positive()),
  path: z.string(),
  formats: z.array(z.string()),
  minimumCacheTTL: z.int().min(0),
  dangerouslyAllowSVG: z.boolean(),
  contentSecurityPolicy: z.string(),
  contentDispositionType: z.enum(['inline', 'attachment']),
  remotePatterns: z.array(remotePatternSchema),
  unoptimized: z.boolean(),
  limitInputPixels: z.int().positive().optional(),
  sequentialRead: z.boolean().optional(),
  timeoutInSeconds: z.int().positive().optional(),
});

export const layoutSchema = z.enum([
  'fill',
  'fixed',
  'intrinsic',
  'responsive',
]);

export const fullImageConfigSchema = imageConfigSchema.extend({
  allSizes: z.array(z.number()).min(1),
});

export const imageLoaderPropsSchema = z.object({
  src: z.string(),
  width: z.int().positive().optional(),
  quality: z.int().min(1).max(100).optional(),
  format: z.string().optional(),
  layout: layoutSchema.optional(),
});

export const staticImageDataSchema = z.object({
  src: z.string(),
  height: z.int().positive(),
  width: z.int().positive(),
  blurDataURL: z.string().optional(),
  blurWidth: z.int().positive().optional(),
  blurHeight: z.int().positive().optional(),
});

export const imagePropsSchema = z.object({
  src: z.union([z.string(), staticImageDataSchema]),
  alt: z.string(),
  width: z.int().positive().optional(),
  className: z.string().optional(),
  height: z.int().positive().optional(),
  layout: layoutSchema.optional(),
  fill: z.boolean().optional(),
  loader: fnSchema<(props: ImageLoaderProps) => string>(1).optional(),
  quality: z.int().min(1).max(100).optional(),
  priority: z.boolean().optional(),
  loading: z.enum(['lazy', 'eager']).optional(),
  placeholder: z.enum(['blur', 'empty']).optional(),
  blurDataURL: z.string().optional(),
  unoptimized: z.boolean().optional(),
  objectFit: z
    .enum(['contain', 'cover', 'fill', 'none', 'scale-down'])
    .optional(),
  objectPosition: z.string().optional(),
  onLoad: fnSchema<(input: unknown) => void>(1).optional(),
  onError: fnSchema<(input: unknown) => void>(1).optional(),
  onLoadingComplete:
    fnSchema<(input: { naturalWidth: number; naturalHeight: number }) => void>(
      1,
    ).optional(),
  style: z.record(z.string(), z.any()).optional(),
  sizes: z.string().optional(),
  lazyRoot: z.any().optional(),
  lazyBoundary: z.string().optional(),
});

export type ImageConfig = z.infer<typeof imageConfigSchema>;
export type FullImageConfig = z.infer<typeof fullImageConfigSchema>;
export type ImageLoaderProps = z.infer<typeof imageLoaderPropsSchema>;
export type StaticImageData = z.infer<typeof staticImageDataSchema>;
export type ImageProps = z.infer<typeof imagePropsSchema>;
