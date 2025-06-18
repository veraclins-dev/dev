import { useCallback } from 'react';

import { type ImageElementProps } from '../types';
import { generateImgAttrs } from '../utils/loader';
import { handleLoading } from '../utils/utils';

function ImageElement({
  imgAttributes,
  widthInt,
  qualityInt,
  layout,
  className,
  imgStyle,
  blurStyle,
  isLazy,
  placeholder,
  loading,
  srcString,
  config,
  unoptimized,
  onLoadingCompleteRef,
  setBlurComplete,
  setIntersection,
  onLoad,
  onError,
  noscriptSizes,
  alt,
  ref,
  ...rest
}: ImageElementProps & { ref?: React.Ref<HTMLImageElement> }) {
  loading = isLazy ? 'lazy' : loading;

  return (
    <>
      <img
        {...rest}
        {...imgAttributes}
        alt={alt}
        decoding="async"
        data-nimg={layout}
        className={className}
        style={{ ...imgStyle, ...blurStyle }}
        ref={useCallback(
          (img: HTMLImageElement & { 'data-loaded-src'?: string }) => {
            if (typeof ref === 'function') {
              ref(img);
            } else if (ref) {
              ref.current = img;
            }
            setIntersection(img);
            if (img?.complete) {
              handleLoading(
                img,
                srcString,
                layout,
                placeholder,
                onLoadingCompleteRef,
                setBlurComplete,
              );
            }
          },
          [
            ref,
            setIntersection,
            srcString,
            layout,
            placeholder,
            onLoadingCompleteRef,
            setBlurComplete,
          ],
        )}
        onLoad={(event) => {
          const img = event.currentTarget as HTMLImageElement & {
            'data-loaded-src'?: string;
          };
          handleLoading(
            img,
            srcString,
            layout,
            placeholder,
            onLoadingCompleteRef,
            setBlurComplete,
          );
          if (onLoad) {
            onLoad(event);
          }
        }}
        onError={(event) => {
          if (placeholder === 'blur') {
            setBlurComplete(true);
          }
          if (onError) {
            onError(event);
          }
        }}
      />
      {(isLazy || placeholder === 'blur') && (
        <noscript>
          <img
            {...rest}
            {...generateImgAttrs({
              config,
              src: srcString,
              unoptimized,
              layout,
              width: widthInt,
              quality: qualityInt,
              sizes: noscriptSizes,
            })}
            alt={alt}
            decoding="async"
            data-nimg={layout}
            style={imgStyle}
            className={className}
            loading={loading}
          />
        </noscript>
      )}
    </>
  );
}

export { ImageElement };
