import { type ImageProps } from './schema';

export interface ImageElementProps extends ImageProps {
  imgAttributes: {
    src: string;
    srcSet: string | undefined;
    sizes: string | undefined;
  };
  widthInt?: number;
  qualityInt?: number;
  layout: ImageProps['layout'];
  className?: string;
  imgStyle?: React.CSSProperties;
  blurStyle?: React.CSSProperties;
  isLazy: boolean;
  placeholder: ImageProps['placeholder'];
  loading?: ImageProps['loading'];
  srcString: string;
  config: any; // TODO: Add proper type
  unoptimized: boolean;
  onLoadingCompleteRef: React.MutableRefObject<ImageProps['onLoadingComplete']>;
  setBlurComplete: (b: boolean) => void;
  setIntersection: (img: HTMLImageElement) => void;
  onLoad?: ImageProps['onLoad'];
  onError?: ImageProps['onError'];
  noscriptSizes?: string;
  alt?: string;
}
