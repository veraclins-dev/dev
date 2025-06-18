import { z } from '@veraclins-dev/utils';

export const remotePatternSchema = z.object({
  protocol: z.string().optional(),
  hostname: z.string(),
  port: z.string().optional(),
  pathname: z.string().optional(),
});

export const imageConfigSchema = z.object({
  deviceSizes: z.array(z.number().int().positive()),
  imageSizes: z.array(z.number().int().positive()),
  path: z.string(),
  formats: z.array(z.string()),
  minimumCacheTTL: z.number().int().min(0),
  dangerouslyAllowSVG: z.boolean(),
  contentSecurityPolicy: z.string(),
  contentDispositionType: z.enum(['inline', 'attachment']),
  remotePatterns: z.array(remotePatternSchema),
  unoptimized: z.boolean(),
  limitInputPixels: z.number().int().positive().optional(),
  sequentialRead: z.boolean().optional(),
  timeoutInSeconds: z.number().int().positive().optional(),
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
  width: z.number().int().positive().optional(),
  quality: z.number().int().min(1).max(100).optional(),
  format: z.string().optional(),
  layout: layoutSchema.optional(),
});

export const staticImageDataSchema = z.object({
  src: z.string(),
  height: z.number().int().positive(),
  width: z.number().int().positive(),
  blurDataURL: z.string().optional(),
  blurWidth: z.number().int().positive().optional(),
  blurHeight: z.number().int().positive().optional(),
});

export const imagePropsSchema = z.object({
  src: z.union([z.string(), staticImageDataSchema]),
  alt: z.string(),
  width: z.number().int().positive().optional(),
  className: z.string().optional(),
  height: z.number().int().positive().optional(),
  layout: layoutSchema.optional(),
  fill: z.boolean().optional(),
  loader: z.function().optional(),
  quality: z.number().int().min(1).max(100).optional(),
  priority: z.boolean().optional(),
  loading: z.enum(['lazy', 'eager']).optional(),
  placeholder: z.enum(['blur', 'empty']).optional(),
  blurDataURL: z.string().optional(),
  unoptimized: z.boolean().optional(),
  objectFit: z
    .enum(['contain', 'cover', 'fill', 'none', 'scale-down'])
    .optional(),
  objectPosition: z.string().optional(),
  onLoad: z.function().returns(z.void()).optional(),
  onError: z.function().returns(z.void()).optional(),
  onLoadingComplete: z
    .function()
    .args(
      z.object({
        naturalWidth: z.number(),
        naturalHeight: z.number(),
      }),
    )
    .returns(z.void())
    .optional(),
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
