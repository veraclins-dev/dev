import { Typography } from '@veraclins-dev/ui'

import { Card, type CardProps } from '#app/components/card'

interface EmptyProps extends Pick<CardProps, 'className' | 'elevated'> {
  message?: React.ReactNode
  action?: React.ReactNode
  title?: React.ReactNode
}

export function Empty({
  title,
  message,
  action,
  className,
  ...props
}: EmptyProps) {
  return (
    <Card
      minHeight={40}
      w="full"
      flex="1"
      contentProps={{ justify: 'center', items: 'center' }}
      className={className}
      {...props}
    >
      <Typography variant="h3" className="text-center">
        {title}
      </Typography>
      <Typography variant="body2" className="text-foreground/80 text-center">
        {message}
      </Typography>
      {action}
    </Card>
  )
}
