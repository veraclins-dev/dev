import { z } from '@veraclins-dev/utils';

export const remotePatternSchema = z.object({
  protocol: z.string().optional(),
  hostname: z.string(),
  port: z.string().optional(),
  pathname: z.string().optional(),
});

export const imageConfigSchema = z.object({
  deviceSizes: z.array(z.number()).min(1),
  imageSizes: z.array(z.number()).min(1),
  path: z.string(),
  minimumCacheTTL: z.number().min(0),
  formats: z.array(z.string()).min(1),
  contentSecurityPolicy: z.string(),
  dangerouslyAllowSVG: z.boolean().optional(),
  remotePatterns: z.array(remotePatternSchema).optional(),
});

export const fullImageConfigSchema = imageConfigSchema.extend({
  allSizes: z.array(z.number()).min(1),
});

export const imageLoaderPropsSchema = z.object({
  src: z.string().min(1),
  width: z.number().positive(),
  quality: z.number().min(1).max(100).optional(),
});

export const staticImageDataSchema = z.object({
  src: z.string().min(1),
  height: z.number().positive(),
  width: z.number().positive(),
  blurDataURL: z.string().optional(),
});

export const imagePropsSchema = z.object({
  src: z.union([z.string(), staticImageDataSchema]),
  alt: z.string().optional(),
  className: z.string().optional(),
  style: z.any().optional(),
  width: z.union([z.number(), z.string()]).optional(),
  height: z.union([z.number(), z.string()]).optional(),
  layout: z.enum(['fill', 'fixed', 'intrinsic', 'responsive']).optional(),
  quality: z.union([z.number(), z.string()]).optional(),
  priority: z.boolean().optional(),
  loading: z.enum(['lazy', 'eager']).optional(),
  placeholder: z.enum(['blur', 'empty']).optional(),
  blurDataURL: z.string().optional(),
  unoptimized: z.boolean().optional(),
  objectFit: z
    .enum(['contain', 'cover', 'fill', 'none', 'scale-down'])
    .optional(),
  objectPosition: z.string().optional(),
  sizes: z.string().optional(),
  fill: z.boolean().optional(),
  fetchPriority: z.enum(['high', 'low', 'auto']).optional(),
  lazyRoot: z.any().optional(),
  lazyBoundary: z.string().optional(),
  onLoad: z.function().args(z.any()).returns(z.void()).optional(),
  onError: z.function().args(z.any()).returns(z.void()).optional(),
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
});

export type ImageConfig = z.infer<typeof imageConfigSchema>;
export type FullImageConfig = z.infer<typeof fullImageConfigSchema>;
export type ImageLoaderProps = z.infer<typeof imageLoaderPropsSchema>;
export type StaticImageData = z.infer<typeof staticImageDataSchema>;
export type ImageProps = z.infer<typeof imagePropsSchema>;
