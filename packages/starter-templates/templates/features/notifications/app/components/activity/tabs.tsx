import { Box, Button } from '@veraclins-dev/ui'
import { humanize } from '@veraclins-dev/utils'

import { Card } from '#app/components/card'

export function Tabs<T extends string = string>({
  tabs,
  activeTab,
  onTabChange,
  heading,
  className,
  plain,
}: {
  tabs: readonly T[]
  activeTab: T
  onTabChange: (tab: T) => void
  heading?: string
  className?: string
  plain?: boolean
}) {
  return (
    <Card
      className={className}
      title={heading}
      contentProps={{ ...(plain ? { p: 0, pt: 2 } : { pt: 2 }) }}
      headerProps={{ ...(plain ? { p: 0 } : {}) }}
    >
      <Box display="flex" gap={2} mt={2}>
        {tabs.map((tab) => (
          <Button
            key={tab}
            variant="soft"
            color={tab === activeTab ? 'primary' : 'neutral'}
            onClick={() => onTabChange(tab)}
          >
            {tab === 'all' ? 'All' : humanize(tab)}
          </Button>
        ))}
      </Box>
    </Card>
  )
}
