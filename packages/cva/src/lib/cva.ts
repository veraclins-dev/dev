/**
 * Adapted from https://github.com/joe-bell/cva/blob/main/packages/cva/src/index.ts
 */
import { clsx } from 'clsx';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

type AtLeastOne<
  T,
  U = { [K in keyof Required<T>]: Pick<Required<T>, K> },
> = Partial<T> & U[keyof U];
/* Types
  ============================================ */

// When compiling with `declaration: true`, many projects experience the dreaded
// TS2742 error. To combat this, we copy clsx's types manually.
// Should this project move to JSDoc, this workaround would no longer be needed.

export type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | bigint
  | null
  | boolean
  | undefined;
export type ClassDictionary = Record<string, any>;
export type ClassArray = ClassValue[];

type ResponsiveValue<T> = T | AtLeastOne<{ [key in Breakpoint]?: T }>;

/* Utils
  ---------------------------------- */

type OmitUndefined<T> = T extends undefined ? never : T;
type StringToBoolean<T> = T extends 'true' | 'false' ? boolean : T;
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

export type VariantProps<Component extends (...args: any) => any> = Omit<
  OmitUndefined<Parameters<Component>[0]>,
  'class' | 'className'
>;

/* compose
  ---------------------------------- */

export interface Compose {
  <T extends ReturnType<CVA>[]>(
    ...components: [...T]
  ): (
    props?: (
      | UnionToIntersection<
          {
            [K in keyof T]: VariantProps<T[K]>;
          }[number]
        >
      | undefined
    ) &
      CVAClassProp,
  ) => string;
}

/* cx
  ---------------------------------- */

export interface CX {
  (...inputs: ClassValue[]): string;
}

export type CXOptions = Parameters<CX>;
export type CXReturn = ReturnType<CX>;

/* cva
  ============================================ */

type CVAConfigBase = { base?: ClassValue };

type CVAVariantShape = Record<string, Record<string, ClassValue>>;

type CVAVariantSchema<V extends CVAVariantShape, R extends CVAVariantShape> = {
  [Variant in keyof V]?: StringToBoolean<keyof V[Variant]> | undefined;
} & {
  [Variant in keyof R]?: ResponsiveValue<StringToBoolean<keyof R[Variant]>>;
};

type CVAClassProp =
  | {
      class?: ClassValue;
      className?: never;
    }
  | {
      class?: never;
      className?: ClassValue;
    };

export interface CVA {
  <
    _ extends "cva's generic parameters are restricted to internal use only.",
    V,
    R extends CVAVariantShape = CVAVariantShape,
  >(
    config: V extends CVAVariantShape
      ? R extends CVAVariantShape
        ? CVAConfigBase & {
            variants?: V;
            responsive?: R;
            compoundVariants?: (V extends CVAVariantShape
              ? (
                  | CVAVariantSchema<V, R>
                  | ({
                      [Variant in keyof V]?:
                        | StringToBoolean<keyof V[Variant]>
                        | StringToBoolean<keyof V[Variant]>[]
                        | undefined;
                    } & {
                      [Variant in keyof R]?:
                        | StringToBoolean<keyof R[Variant]>
                        | StringToBoolean<keyof R[Variant]>[]
                        | undefined;
                    })
                ) &
                  CVAClassProp
              : CVAClassProp)[];
            defaultVariants?: CVAVariantSchema<V, R>;
          }
        : CVAConfigBase & {
            variants?: V;
            responsive?: R;
            compoundVariants?: (V extends CVAVariantShape
              ? (
                  | CVAVariantSchema<V, R>
                  | {
                      [Variant in keyof V]?:
                        | StringToBoolean<keyof V[Variant]>
                        | StringToBoolean<keyof V[Variant]>[]
                        | undefined;
                    }
                ) &
                  CVAClassProp
              : CVAClassProp)[];
            defaultVariants?: CVAVariantSchema<V, R>;
          }
      : CVAConfigBase & {
          variants?: never;
          responsive?: never;
          compoundVariants?: never;
          defaultVariants?: never;
        },
  ): (
    props?: V extends CVAVariantShape
      ? CVAVariantSchema<V, R> & CVAClassProp
      : CVAClassProp,
  ) => string;
}

/* defineConfig
  ---------------------------------- */

export interface DefineConfigOptions {
  hooks?: {
    /**
     * Returns the completed string of concatenated classes/classNames.
     */
    onComplete?: (className: string) => string;
  };
}

export interface DefineConfig {
  (options?: DefineConfigOptions): {
    compose: Compose;
    cx: CX;
    cva: CVA;
  };
}

/* Exports
  ============================================ */

const falsyToString = <T>(value: T) =>
  typeof value === 'boolean' ? `${value}` : value === 0 ? '0' : value;

export const defineConfig: DefineConfig = (options) => {
  const cx: CX = (...inputs) => {
    if (typeof options?.hooks?.onComplete !== 'undefined')
      return options?.hooks.onComplete(clsx(inputs));

    return clsx(inputs);
  };

  const cva: CVA = (config) => (props) => {
    if (config?.variants == null && config?.responsive == null)
      return cx(config?.base, props?.class, props?.className);

    const { variants, responsive, defaultVariants } = config;

    // Handle regular variants
    const getVariantClassNames = variants
      ? Object.keys(variants).map((variant: keyof typeof variants) => {
          const variantProp = props?.[variant as keyof typeof props];
          const defaultVariantProp = defaultVariants?.[variant];

          const variantKey = (falsyToString(variantProp) ||
            falsyToString(
              defaultVariantProp,
            )) as keyof (typeof variants)[typeof variant];

          return variants[variant][variantKey];
        })
      : [];

    // Handle responsive variants
    const getResponsiveClassNames = responsive
      ? Object.keys(responsive).map((variant: keyof typeof responsive) => {
          const variantProp = props?.[variant as keyof typeof props];
          const defaultVariantProp =
            defaultVariants?.[variant as keyof typeof defaultVariants];

          // Handle responsive props
          if (
            typeof variantProp === 'object' &&
            variantProp !== null &&
            !Array.isArray(variantProp)
          ) {
            // Generate responsive classes dynamically
            const responsiveClasses = Object.entries(
              variantProp as Record<string, unknown>,
            ).map(([breakpoint, value]) => {
              const variantKey = falsyToString(
                value,
              ) as keyof (typeof responsive)[typeof variant];
              if (breakpoint === 'xs') {
                return responsive[variant][variantKey];
              }
              return `${breakpoint}:${responsive[variant][variantKey]}`;
            });
            return clsx(responsiveClasses);
          }

          // Handle regular props (fallback to default)
          const variantKey = (falsyToString(variantProp) ||
            falsyToString(
              defaultVariantProp,
            )) as keyof (typeof responsive)[typeof variant];

          return responsive[variant][variantKey];
        })
      : [];

    const defaultsAndProps = {
      ...defaultVariants,
      // remove `undefined` props
      ...(props &&
        Object.entries(props).reduce<typeof props>(
          (acc, [key, value]) =>
            typeof value === 'undefined' ? acc : { ...acc, [key]: value },
          {} as typeof props,
        )),
    };

    const getCompoundVariantClassNames = config?.compoundVariants?.reduce(
      (acc, { class: cvClass, className: cvClassName, ...cvConfig }) =>
        Object.entries(cvConfig).every(([cvKey, cvSelector]) => {
          const selector =
            defaultsAndProps[cvKey as keyof typeof defaultsAndProps];

          return Array.isArray(cvSelector)
            ? cvSelector.includes(selector)
            : selector === cvSelector;
        })
          ? [...acc, cvClass, cvClassName]
          : acc,
      [] as ClassValue[],
    );

    return cx(
      config?.base,
      getVariantClassNames,
      getCompoundVariantClassNames,
      getResponsiveClassNames,
      props?.class,
      props?.className,
    );
  };

  const compose: Compose =
    (...components) =>
    (props) => {
      const propsWithoutClass = Object.fromEntries(
        Object.entries(props || {}).filter(
          ([key]) => !['class', 'className'].includes(key),
        ),
      );

      return cx(
        components.map((component) => component(propsWithoutClass)),
        props?.class,
        props?.className,
      );
    };

  return {
    compose,
    cva,
    cx,
  };
};

export const { compose, cva, cx } = defineConfig();
