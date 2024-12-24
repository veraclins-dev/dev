import { type SVGProps } from 'react';

import href from '@veraclins-dev/icons/sprite.svg';
import { cn } from '@veraclins-dev/utils';

import { type IconName } from '../../icons/name';

import { ComposedTooltip } from './tooltip';

const sizeClassName = {
  font: 'w-[1em] h-[1em]',
  xs: 'w-4 h-4',
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-10 h-10',
} as const;

type Size = keyof typeof sizeClassName;

const childrenSizeClassName = {
  font: 'gap-1.5',
  xs: 'gap-1.5',
  sm: 'gap-1.5',
  md: 'gap-2',
  lg: 'gap-2',
  xl: 'gap-3',
} satisfies Record<Size, string>;

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: Size;
  href?: string;
  tooltip?: string;
};

function Component({
  name,
  size = 'font',
  className,
  children,
  // href = href,
  ...props
}: Omit<IconProps, 'tooltip'>) {
  if (children) {
    return (
      <span
        className={`inline-flex items-center ${childrenSizeClassName[size]}`}
      >
        <Component name={name} size={size} className={className} {...props} />
        {children}
      </span>
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
}

/**
 * Renders an SVG icon. The icon defaults to the size of the font. To make it
 * align vertically with neighboring text, you can pass the text as a child of
 * the icon and it will be automatically aligned.
 * Alternatively, if you're not ok with the icon being to the left of the text,
 * you need to wrap the icon and text in a common parent and set the parent to
 * display "flex" (or "inline-flex") with "items-center" and a reasonable gap.
 */
function Icon({ tooltip, ...props }: IconProps) {
  return tooltip ? (
    <ComposedTooltip
      Trigger={Component}
      TriggerProps={props}
      content={tooltip}
    />
  ) : (
    <Component {...props} />
  );
}

export { Icon, type IconName };
