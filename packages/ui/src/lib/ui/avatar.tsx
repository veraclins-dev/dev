import * as AvatarPrimitive from '@radix-ui/react-avatar';

import { cn } from '@veraclins-dev/utils';
import { getSizeClasses, type Size } from '@veraclins-dev/utils';

import { type IconName } from '../icons/name';
import { type WithTooltip } from '../types';

import { Icon } from './icon';
import { ComposedTooltip } from './tooltip';

/**
 * Avatar component for displaying user profile images with fallback support.
 * This component uses Radix UI's Avatar primitives for accessibility and
 * customization.
 * @param props - Props for the Avatar component.
 * @returns The Avatar component.
 */
function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        'relative flex size-8 shrink-0 overflow-hidden rounded-full',
        className,
      )}
      {...props}
    />
  );
}

/**
 * AvatarImage component for displaying the user's profile image.
 * Falls back to AvatarFallback if the image fails to load.
 *
 * @example
 * ```tsx
 * <Avatar>
 *   <AvatarImage src="/path/to/image.jpg" alt="User avatar" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * ```
 */
function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn('aspect-square size-full', className)}
      {...props}
    />
  );
}

/**
 * AvatarFallback component that displays when the AvatarImage fails to load
 * or while it's loading. Typically shows initials or a placeholder.
 *
 * @example
 * ```tsx
 * <Avatar>
 *   <AvatarImage src="/path/to/image.jpg" alt="User avatar" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * ```
 */
function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        'bg-neutral flex size-full items-center justify-center rounded-full',
        className,
      )}
      {...props}
    />
  );
}

/**
 * Props for the ComposedAvatar component
 */
export interface ComposedAvatarProps
  extends WithTooltip<Omit<React.ComponentProps<typeof Avatar>, 'className'>> {
  /**
   * The source URL of the avatar image.
   */
  src?: string;
  /**
   * The alt text for the avatar image.
   */
  alt?: string;
  /**
   * The size of the avatar.
   * @default 8
   */
  size?: Size;
  /**
   * Whether the avatar should be square instead of circular.
   * @default false
   */
  square?: boolean;
  /**
   * The icon to display in the fallback.
   * @default "user"
   */
  icon?: IconName;
  /**
   * The fallback content to display when the image fails to load.
   * If not provided, will use the icon prop or initials from alt text.
   */
  fallback?: React.ReactNode;
  /**
   * Additional CSS class name for the avatar.
   */
  className?: string;
}

function Comp({
  src,
  alt,
  size = 8,
  square,
  icon = 'user',
  tooltip,
  fallback,
  className,
  ...props
}: ComposedAvatarProps) {
  const classes = getSizeClasses(size, 'max');

  return (
    <Avatar
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full',
        square && 'rounded-md',
        classes,
        className,
      )}
      {...props}
    >
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback className={square ? 'rounded-md' : ''}>
        {fallback ?? <Icon name={icon} className={cn('p-1', classes)} />}
      </AvatarFallback>
    </Avatar>
  );
}

/**
 * A composed avatar component that combines Avatar, AvatarImage, and AvatarFallback
 * with enhanced functionality like tooltips, fallback icons, and size customization.
 *
 * @example
 * ```tsx
 * <ComposedAvatar
 *   src="/path/to/image.jpg"
 *   alt="John Doe"
 *   size={8}
 *   tooltip="John Doe"
 * />
 * ```
 */
function ComposedAvatar({ tooltip, ...props }: ComposedAvatarProps) {
  if (tooltip) {
    return (
      <ComposedTooltip Trigger={Comp} content={tooltip} TriggerProps={props} />
    );
  }

  return <Comp {...props} />;
}

export { Avatar, AvatarFallback, AvatarImage, ComposedAvatar };
