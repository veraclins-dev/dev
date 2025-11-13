import {
  useEffect,
  useLayoutEffect as useReactLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { warnOnce } from '@veraclins-dev/utils';

import {
  emptyDataURL,
  getImageConfig,
  type ImageProps,
  imagePropsSchema,
  type StaticImageData,
} from '../../shared';
import { generateImgAttrs } from '../utils/loader';
import { useIntersection } from '../utils/use-intersection';
import {
  isStaticImport,
  isStaticRequire,
  loadedImageURLs,
} from '../utils/utils';

import { ImageElement } from './element';

const allImgs = new Map<
  string,
  { src: string; priority: boolean; placeholder: string }
>();

let perfObserver: PerformanceObserver | undefined;

export function Image({
  src,
  sizes,
  unoptimized = false,
  priority = false,
  loading,
  lazyRoot = null,
  lazyBoundary,
  className,
  quality,
  width,
  height,
  style,
  objectFit,
  objectPosition,
  onLoadingComplete,
  placeholder = 'empty',
  blurDataURL,
  ref,
  alt,
  ...all
}: ImageProps & { ref?: React.Ref<HTMLImageElement> }) {
  try {
    imagePropsSchema.parse({
      src,
      sizes,
      unoptimized,
      priority,
      loading,
      quality,
      width,
      height,
      placeholder,
      blurDataURL,
      alt,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Invalid image props: ${error.message}`);
    }
    throw error;
  }

  const config = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.imageConfig ?? getImageConfig();
    }
    return getImageConfig();
  }, []);

  const rest: Partial<ImageProps> = all;
  let layout: ImageProps['layout'] = sizes ? 'responsive' : 'intrinsic';
  if ('layout' in rest) {
    if (rest.layout) layout = rest.layout;
    delete rest.layout;
  }

  let staticSrc = '';
  if (isStaticImport(src)) {
    const staticImageData = isStaticRequire(src) ? src.default : src;

    if (!staticImageData.src) {
      throw new Error(
        `An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(
          staticImageData,
        )}`,
      );
    }
    blurDataURL = blurDataURL || staticImageData.blurDataURL;
    staticSrc = staticImageData.src;
    if (!layout || layout !== 'fill') {
      height = height || staticImageData.height;
      width = width || staticImageData.width;
      if (!staticImageData.height || !staticImageData.width) {
        throw new Error(
          `An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(
            staticImageData,
          )}`,
        );
      }
    }
  }

  src = typeof src === 'string' ? src : staticSrc;

  const widthInt = typeof width === 'number' ? width : undefined;
  const heightInt = typeof height === 'number' ? height : undefined;
  const qualityInt = typeof quality === 'number' ? quality : undefined;

  let isLazy =
    !priority && (loading === 'lazy' || typeof loading === 'undefined');
  if (src.startsWith('data:') || src.startsWith('blob:')) {
    unoptimized = true;
    isLazy = false;
  }
  if (typeof window !== 'undefined' && loadedImageURLs.has(src)) {
    isLazy = false;
  }

  const [blurComplete, setBlurComplete] = useState(false);
  const [setIntersection, isIntersected, resetIntersected] =
    useIntersection<HTMLImageElement>({
      rootRef: lazyRoot,
      rootMargin: lazyBoundary || '200px',
      disabled: !isLazy,
    });
  const isVisible = !isLazy || isIntersected;

  const wrapperStyle: React.CSSProperties = {
    boxSizing: 'border-box',
    display: 'block',
    overflow: 'hidden',
    width: 'initial',
    height: 'initial',
    background: 'none',
    opacity: 1,
    border: 0,
    margin: 0,
    padding: 0,
  };

  const sizerStyle: React.CSSProperties = {
    boxSizing: 'border-box',
    display: 'block',
    width: 'initial',
    height: 'initial',
    background: 'none',
    opacity: 1,
    border: 0,
    margin: 0,
    padding: 0,
  };

  let hasSizer = false;
  let sizerSvgUrl: string | undefined;
  const layoutStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    boxSizing: 'border-box',
    padding: 0,
    border: 'none',
    margin: 'auto',
    display: 'block',
    width: 0,
    height: 0,
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: '100%',
    maxHeight: '100%',
    objectFit,
    objectPosition,
  };

  if (!src) {
    throw new Error(
      `Image is missing required "src" property. Make sure you pass "src" in props to the "image" component. Received: ${JSON.stringify(
        { width, height, quality },
      )}`,
    );
  }

  if (layout === 'fill' && (width || height)) {
    warnOnce(
      `Image with src "${src}" and "layout='fill'" has unused properties assigned. Please remove "width" and "height".`,
    );
  }

  if (priority && loading === 'lazy') {
    throw new Error(
      `Image with src "${src}" has both "priority" and "loading='lazy'" properties. Only one should be used.`,
    );
  }

  if (sizes && layout !== 'fill' && layout !== 'responsive') {
    warnOnce(
      `Image with src "${src}" has "sizes" property but it will be ignored. Only use "sizes" with "layout='fill'", or "layout='responsive'"`,
    );
  }

  if (placeholder === 'blur') {
    if (layout !== 'fill' && (widthInt || 0) * (heightInt || 0) < 1600) {
      warnOnce(
        `Image with src "${src}" is smaller than 40x40. Consider removing the "placeholder='blur'" property to improve performance.`,
      );
    }
    if (!blurDataURL) {
      const VALID_BLUR_EXT = ['jpeg', 'png', 'webp', 'avif'];
      throw new Error(
        `Image with src "${src}" has "placeholder='blur'" property but is missing the "blurDataURL" property.
          Possible solutions:
            - Add a "blurDataURL" property, the contents should be a small Data URL to represent the image
            - Change the "src" property to a static import with one of the supported file types: ${VALID_BLUR_EXT.join(
              ',',
            )}
            - Remove the "placeholder" property, effectively no blur effect`,
      );
    }
  }

  if (style) {
    const overwrittenStyles = Object.keys(style).filter(
      (key) => key in layoutStyle,
    );
    if (overwrittenStyles.length) {
      warnOnce(
        `Image with src ${src} is assigned the following styles, which are overwritten by automatically-generated styles: ${overwrittenStyles.join(
          ', ',
        )}`,
      );
    }
  }

  const imgStyle = Object.assign({}, style, layoutStyle);
  const blurStyle =
    placeholder === 'blur' && !blurComplete
      ? {
          filter: 'blur(20px)',
          backgroundSize: objectFit || 'cover',
          backgroundImage: `url("${blurDataURL}")`,
          backgroundPosition: objectPosition || '0% 0%',
        }
      : {};

  if (layout === 'fill') {
    wrapperStyle.display = 'block';
    wrapperStyle.position = 'absolute';
    wrapperStyle.top = 0;
    wrapperStyle.left = 0;
    wrapperStyle.bottom = 0;
    wrapperStyle.right = 0;
  } else if (
    typeof widthInt !== 'undefined' &&
    typeof heightInt !== 'undefined'
  ) {
    const quotient = heightInt / widthInt;
    const paddingTop = isNaN(quotient) ? '100%' : `${quotient * 100}%`;
    if (layout === 'responsive') {
      wrapperStyle.display = 'block';
      wrapperStyle.position = 'relative';
      hasSizer = true;
      sizerStyle.paddingTop = paddingTop;
    } else if (layout === 'intrinsic') {
      wrapperStyle.display = 'inline-block';
      wrapperStyle.position = 'relative';
      wrapperStyle.maxWidth = '100%';
      hasSizer = true;
      sizerStyle.maxWidth = '100%';
      sizerSvgUrl = `data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27${widthInt}%27%20height=%27${heightInt}%27/%3e`;
    } else if (layout === 'fixed') {
      wrapperStyle.display = 'inline-block';
      wrapperStyle.position = 'relative';
      wrapperStyle.width = widthInt;
      wrapperStyle.height = heightInt;
    }
  } else {
    throw new Error(
      `Image with src "${src}" must use "width" and "height" properties or "layout='fill'" property.`,
    );
  }

  let imgAttributes: {
    src: string;
    srcSet: string | undefined;
    sizes: string | undefined;
  } = {
    src: emptyDataURL,
    srcSet: undefined,
    sizes: undefined,
  };

  if (isVisible) {
    imgAttributes = generateImgAttrs({
      config,
      src,
      unoptimized,
      layout,
      width: widthInt,
      quality: qualityInt,
      sizes,
    });
  }

  const srcString: string = src;

  if (typeof window !== 'undefined') {
    let fullUrl: URL;
    try {
      fullUrl = new URL(imgAttributes.src);
    } catch (_e) {
      fullUrl = new URL(imgAttributes.src, window.location.href);
    }
    allImgs.set(fullUrl.href, { src, priority, placeholder });
  }

  const useLayoutEffect =
    typeof window === 'undefined' ? useEffect : useReactLayoutEffect;
  const onLoadingCompleteRef = useRef(onLoadingComplete);

  const previousImageSrc = useRef<
    string | StaticImageData | { default: StaticImageData }
  >(src);
  useEffect(() => {
    onLoadingCompleteRef.current = onLoadingComplete;
  }, [onLoadingComplete]);

  useLayoutEffect(() => {
    if (previousImageSrc.current !== src) {
      resetIntersected();
      previousImageSrc.current = src;
    }
  }, [resetIntersected, src]);

  const imgElementArgs = {
    isLazy,
    imgAttributes,
    widthInt,
    qualityInt,
    layout,
    className,
    imgStyle,
    blurStyle,
    loading,
    config,
    unoptimized,
    placeholder,
    srcString,
    onLoadingCompleteRef,
    setBlurComplete,
    setIntersection,
    noscriptSizes: sizes,
    ref,
    alt,
    ...rest,
  };

  if (
    typeof window !== 'undefined' &&
    !perfObserver &&
    window.PerformanceObserver
  ) {
    perfObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        // @ts-expect-error - missing "LargestContentfulPaint" class with "element" prop
        const imgSrc = entry?.element?.src || '';
        const lcpImage = allImgs.get(imgSrc);
        if (
          lcpImage &&
          !lcpImage.priority &&
          lcpImage.placeholder !== 'blur' &&
          !lcpImage.src.startsWith('data:') &&
          !lcpImage.src.startsWith('blob:')
        ) {
          warnOnce(
            `Image with src "${lcpImage.src}" was detected as the Largest Contentful Paint (LCP). Please add the "priority" property if this image is above the fold.`,
          );
        }
      }
    });
    try {
      perfObserver.observe({
        type: 'largest-contentful-paint',
        buffered: true,
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <span style={wrapperStyle}>
      {hasSizer ? (
        <span style={sizerStyle}>
          {sizerSvgUrl ? (
            <img
              style={{
                display: 'block',
                maxWidth: '100%',
                width: 'initial',
                height: 'initial',
                background: 'none',
                opacity: 1,
                border: 0,
                margin: 0,
                padding: 0,
              }}
              alt=""
              aria-hidden={true}
              src={sizerSvgUrl}
            />
          ) : null}
        </span>
      ) : null}
      <ImageElement {...imgElementArgs} />
    </span>
  );
}
