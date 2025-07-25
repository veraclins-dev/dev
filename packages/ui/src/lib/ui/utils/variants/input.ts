import { type VariantProps } from '@veraclins-dev/cva';
import { cva } from '@veraclins-dev/cva';

import {
  CHECKBOX_CLASSES,
  INPUT_CLASSES,
  INPUT_CONTAINER_CLASSES,
  RADIO_GROUP_ITEM_CLASSES,
} from '../styles';

import { extractStyleProps, styleProps } from './styles';

const shared = {
  responsive: {
    ...styleProps,
  },
  variants: {
    inputSize: {
      sm: 'min-h-6 px-2 py-1',
      md: 'min-h-7 px-3 py-2',
      lg: 'min-h-8 px-4 py-3',
      xl: 'min-h-9 px-5 py-4',
    },
  },
  defaultVariants: {
    inputSize: 'md',
  },
} as const;

// Input variants
const inputVariants = cva({
  base: INPUT_CLASSES,
  ...shared,
});
const inputContainerVariants = cva({
  base: INPUT_CONTAINER_CLASSES,
  ...shared,
});

const checkboxVariants = cva({
  base: CHECKBOX_CLASSES,
  responsive: {
    ...styleProps,
  },
  variants: {
    checkboxSize: {
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6',
      xl: 'size-7',
    },
  },
  defaultVariants: {
    checkboxSize: 'md',
  },
});

const radioVariants = {
  responsive: {
    ...styleProps,
  },
  variants: {
    radioSize: {
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6',
      xl: 'size-7',
    },
  },
  defaultVariants: {
    radioSize: 'md',
  },
} as const;

const radioGroupItemVariants = cva({
  base: RADIO_GROUP_ITEM_CLASSES,
  ...radioVariants,
});

type InputVariants = VariantProps<typeof inputVariants>;

type CheckboxVariants = VariantProps<typeof checkboxVariants>;

type RadioGroupItemVariants = VariantProps<typeof radioGroupItemVariants>;

function extractInputVariants<T extends InputVariants>(props: T) {
  const { styleProps, others } = extractStyleProps(props);
  const otherProps = Object.keys(others).reduce(
    (acc, key) => {
      if (key in shared.variants) {
        acc[key as keyof InputVariants] = others[key as keyof typeof others];
      }
      return acc;
    },
    {} as Record<string, any>,
  );
  return {
    ...styleProps,
    ...otherProps,
  } as InputVariants;
}

function extractRadioGroupItemVariants<T extends RadioGroupItemVariants>(
  props: T,
) {
  const { styleProps, others } = extractStyleProps(props);
  const otherProps = Object.keys(others).reduce(
    (acc, key) => {
      if (key in radioVariants.variants) {
        acc[key as keyof RadioGroupItemVariants] =
          others[key as keyof typeof others];
      }
      return acc;
    },
    {} as Record<string, any>,
  );
  return {
    ...styleProps,
    ...otherProps,
  } as RadioGroupItemVariants;
}

export {
  type CheckboxVariants,
  checkboxVariants,
  extractInputVariants,
  extractRadioGroupItemVariants,
  inputContainerVariants,
  type InputVariants,
  inputVariants,
  type RadioGroupItemVariants,
  radioGroupItemVariants,
};
