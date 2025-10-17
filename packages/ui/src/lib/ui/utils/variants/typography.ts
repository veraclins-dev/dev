import { cva, type VariantProps } from '@veraclins-dev/cva';

import { styleProps } from './styles';

/** ::::::::: Typography ::::::::: */
const typographyVariants = cva({
  base: '',
  responsive: {
    ...styleProps,
  },
  variants: {
    variant: {
      h1: 'text-4xl font-bold leading-tight',
      h2: 'text-3xl font-bold leading-tight',
      h3: 'text-2xl font-semibold leading-snug',
      h4: 'text-xl font-semibold leading-snug',
      h5: 'text-lg font-medium leading-normal',
      h6: 'text-base font-medium leading-normal',
      subtitle1: 'text-base font-medium leading-normal',
      subtitle2: 'text-sm font-medium leading-normal',
      body1: 'text-base font-normal leading-relaxed',
      body2: 'text-sm font-normal leading-relaxed',
      caption: 'text-xs font-normal leading-normal',
      small: 'text-xxs font-normal leading-normal',
      overline: 'text-xs font-normal leading-normal uppercase tracking-wider',
      inherit: '',
    },
    align: {
      inherit: '',
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    gutterBottom: {
      true: 'mb-4',
      false: '',
    },
    noWrap: {
      true: 'truncate',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'body2',
    align: 'inherit',
    gutterBottom: false,
    noWrap: false,
  },
});

type TypographyVariants = VariantProps<typeof typographyVariants>;

export { type TypographyVariants, typographyVariants };
