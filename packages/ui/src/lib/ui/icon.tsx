import { cn } from '@veraclins-dev/utils';

import { useIcon } from '../icons';
import { type IconName } from '../icons/name';

import { ComposedTooltip } from './tooltip';
import { Typography } from './typography';

/**
 * Size class names for different icon sizes.
 * Maps size keys to their corresponding Tailwind CSS classes.
 */
const sizeClassName = {
  font: 'size-[1em]',
  xs: 'size-4',
  sm: 'size-5',
  md: 'size-6',
  lg: 'size-8',
  xl: 'size-10',
} as const;

/** Available size options for icons */
type Size = keyof typeof sizeClassName;

/**
 * Gap class names for different icon sizes when used with children.
 * Maps size keys to their corresponding Tailwind CSS gap classes.
 */
const childrenSizeClassName = {
  font: 'gap-1.5',
  xs: 'gap-1.5',
  sm: 'gap-1.5',
  md: 'gap-2',
  lg: 'gap-2',
  xl: 'gap-3',
} satisfies Record<Size, string>;

/**
 * Props for the Icon component.
 * Extends SVG props with additional icon-specific properties.
 */
export type IconProps = React.SVGProps<SVGSVGElement> & {
  /** Name of the icon to display */
  name: IconName;
  /** Size of the icon */
  size?: Size;
  /** Optional tooltip text to show on hover */
  tooltip?: string;
  /** Path to the sprite sheet containing the icon */
  href?: string;
};

/**
 * Internal component that handles the actual icon rendering.
 * Supports both standalone icons and icons with children.
 *
 * @param props - Props for the icon component
 * @returns An SVG element with the specified icon
 */
const Component = ({
  name,
  size = 'font',
  className,
  children,
  href = '/icons/sprite.svg',
  ...props
}: Omit<IconProps, 'tooltip'>) => {
  if (children) {
    return (
      <Typography
        component="span"
        className={`inline-flex items-center ${childrenSizeClassName[size]}`}
      >
        <Component
          name={name}
          size={size}
          className={className}
          href={href}
          {...props}
        />
        {children}
      </Typography>
    );
  }
  return (
    <svg
      {...props}
      className={cn(sizeClassName[size], 'inline self-center', className)}
    >
      <use href={`${href}#${name}`} />
    </svg>
  );
};

/**
 * Icon component that renders an SVG icon from a sprite sheet.
 * Supports different sizes, tooltips, and can be used with or without text.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Icon name="check" />
 *
 * // With size
 * <Icon name="check" size="lg" />
 *
 * // With tooltip
 * <Icon name="info" tooltip="More information" />
 *
 * // With text
 * <Icon name="check">Completed</Icon>
 *
 * // With custom styling
 * <Icon name="star" className="text-yellow-500" />
 * ```
 *
 * @param props - Props for the Icon component
 * @returns An SVG icon with optional tooltip and text
 */
function Icon({ tooltip, ...props }: IconProps) {
  const { sprite } = useIcon();

  return tooltip ? (
    <ComposedTooltip
      Trigger={Component}
      TriggerProps={{ ...props, href: sprite }}
      content={tooltip}
    />
  ) : (
    <Component {...props} href={sprite} />
  );
}

export { Icon };
