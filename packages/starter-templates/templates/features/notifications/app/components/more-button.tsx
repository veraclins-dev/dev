import { Button, type ButtonProps, Icon } from '@veraclins-dev/ui'
import { cn } from '@veraclins-dev/utils'

export function MoreButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      {...props}
      variant="soft"
      position="relative"
      w="fit"
      px={2}
      py={1}
      className={cn('cursor-pointer', className)}
    >
      <Icon name="dots-horizontal" size="md" />
    </Button>
  )
}
