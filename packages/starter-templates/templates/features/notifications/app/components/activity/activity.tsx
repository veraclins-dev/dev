import { createMarkup } from '@veraclins-dev/react-utils'
import {
  Box,
  Button,
  type ButtonProps,
  type IconName,
  ITEM_CLASSES,
  Typography,
} from '@veraclins-dev/ui'
import { cn, formatDateTime, formatRelativeTime } from '@veraclins-dev/utils'

import { Avatar } from '#app/components/avatar'
import { Link } from '#app/components/link'

interface ActivityProps {
  message: string | undefined
  icon: IconName
  profileImage: string | null | undefined
  createdAt: Date | string
  isRead?: boolean
  showTime?: boolean
}

export function Activity({
  message,
  icon,
  profileImage,
  createdAt,
  isRead,
  showTime,
}: ActivityProps) {
  return (
    <>
      <Box className="relative h-14 w-14">
        <Avatar size={14} src={profileImage} alt="Actor Image" />
        <Avatar
          className="p-0.5"
          containerClass="absolute -bottom-1 -right-1"
          icon={icon}
          size={7}
        />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        gap={1}
        className="relative h-fit flex-1"
      >
        <p
          className={cn(
            'line-clamp-2',
            isRead ? 'font-light' : 'font-semibold',
          )}
          dangerouslySetInnerHTML={createMarkup(message ?? '')}
        />
        <Typography className="first-letter:uppercase">
          {showTime ? formatDateTime(createdAt) : formatRelativeTime(createdAt)}
        </Typography>
      </Box>
    </>
  )
}

export function ActivityLink({
  children,
  targetLink = '',
  onClick,
}: {
  children: React.ReactNode
  targetLink?: string
  onClick?: () => void
}) {
  return (
    <Link
      className={cn(
        'group/activity relative flex w-full items-center justify-start gap-3 rounded-md border-b-0 px-2 py-2',
        ITEM_CLASSES,
      )}
      to={targetLink}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}

export function ActionItem({
  className,
  variant = 'plain',
  ...props
}: ButtonProps) {
  const handleClick: ButtonProps['onClick'] = (e) => {
    e?.stopPropagation()
    props.onClick?.(e)
  }
  return (
    <Button
      {...props}
      onClick={handleClick}
      variant={variant}
      className={cn(ITEM_CLASSES, 'flex w-full justify-start px-2', className)}
    />
  )
}
