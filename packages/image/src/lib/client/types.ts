import type {
  FullImageConfig,
  ImageLoaderProps,
  ImageProps,
  StaticImageData,
} from '../shared/schema';

type ImageLoader = (props: ImageLoaderProps) => string;

type PlaceholderValue = 'blur' | 'empty';

type LoadingValue = 'lazy' | 'eager' | undefined;

type LayoutValue = 'fill' | 'fixed' | 'intrinsic' | 'responsive' | undefined;

type OnLoadingComplete = (result: {
  naturalWidth: number;
  naturalHeight: number;
}) => void;

type OnLoad = (event: {
  naturalWidth: number;
  naturalHeight: number;
  target: HTMLImageElement;
}) => void;

type OnError = (event: { target: HTMLImageElement }) => void;

interface StaticRequire {
  default: StaticImageData;
}

type StaticImport = StaticRequire | StaticImageData;

type ImgElementWithDataProp = HTMLImageElement & {
  'data-loaded-src': string | undefined;
};

type ImageElementProps = Omit<ImageProps, 'src'> & {
  srcString: string;
  imgAttributes: {
    src: string;
    srcSet: string | undefined;
    sizes: string | undefined;
  };
  widthInt: number | undefined;
  qualityInt: number | undefined;
  layout: LayoutValue;
  imgStyle: React.CSSProperties;
  blurStyle: React.CSSProperties;
  isLazy: boolean;
  loading: LoadingValue;
  config: FullImageConfig;
  unoptimized: boolean;
  placeholder: PlaceholderValue;
  onLoadingCompleteRef: React.RefObject<OnLoadingComplete | undefined>;
  setBlurComplete: (b: boolean) => void;
  setIntersection: (img: HTMLImageElement | null) => void;
  noscriptSizes: string | undefined;
};

export type {
  ImageElementProps,
  ImageLoader,
  ImgElementWithDataProp,
  LayoutValue,
  LoadingValue,
  OnError,
  OnLoad,
  OnLoadingComplete,
  PlaceholderValue,
  StaticImport,
  StaticRequire,
};
