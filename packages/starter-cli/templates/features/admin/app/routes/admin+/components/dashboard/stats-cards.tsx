import { useMemo } from 'react';

import { Box, Icon, type IconName,Typography } from '@veraclins-dev/ui';
import { cn, endOfPeriod } from '@veraclins-dev/utils';

import { type DateRangeValue } from '../../../../common/types';
import { Card } from '../../../../components/card';
import { detectPeriodFromValue } from '../../../../components/dates/select';
import { Link } from '../../../../components/link';
import { calculateGrowthType } from '../../api/utils';

type IconColor =
  | 'primary'
  | 'success'
  | 'warning'
  | 'secondary'
  | 'destructive'
  | 'neutral'
  | 'info';

type Priority = 'high' | 'medium' | 'low';

const iconColorMap = {
  primary: 'text-primary',
  success: 'text-success',
  warning: 'text-warning',
  secondary: 'text-secondary',
  destructive: 'text-destructive',
  neutral: 'text-neutral',
  info: 'text-info',
};

const getIconColor = (color?: IconColor) => {
  if (!color) return 'text-primary';
  return iconColorMap[color];
};

const iconBgColorMap = {
  primary: 'bg-primary/30',
  success: 'bg-success/30',
  warning: 'bg-warning/30',
  secondary: 'bg-secondary/30',
  destructive: 'bg-destructive/30',
  neutral: 'bg-neutral/30',
  info: 'bg-info/30',
};

const getIconBgColor = (color?: IconColor) => {
  if (!color) return 'bg-primary/30';
  return iconBgColorMap[color];
};

const priorityConfig = {
  high: {
    cardClass: 'border-2 shadow-lg',
    titleClass: 'font-bold',
    valueClass: 'text-2xl font-bold',
  },
  medium: {
    cardClass: 'border shadow-md',
    titleClass: 'font-semibold',
    valueClass: 'text-xl font-semibold',
  },
  low: {
    cardClass: 'border shadow-sm',
    titleClass: 'font-medium',
    valueClass: 'text-lg font-medium',
  },
};

export interface StatCard {
  title: string;
  value: string | number;
  growth: number;
  period: DateRangeValue;
  icon?: IconName;
  iconColor?: IconColor;
  link?: string;
  isLoading?: boolean;
  priority: Priority;
  alert?: string;
  description?: string;
  /** Optional compact metrics displayed inside the card for quick totals */
  extras?: Array<{
    label: string;
    value: string | number;
    icon?: IconName;
    color?: IconColor;
  }>;
}

interface StatsCardsProps {
  /**
   * Primary (high-signal) stats. These are rendered first.
   */
  stats: StatCard[];
}

const growthTypeMap = {
  positive: {
    direction: 'up from',
    icon: 'arrow-trending-up',
    color: 'text-success',
  },
  negative: {
    direction: 'down from',
    icon: 'arrow-trending-down',
    color: 'text-destructive',
  },
  neutral: {
    direction: 'up from',
    icon: 'arrow-right',
    color: 'text-secondary',
  },
} as const;

export function StatsCards({ stats }: StatsCardsProps) {
  const orderedStats = useMemo(() => {
    const priorityOrder: Record<Priority, number> = {
      high: 0,
      medium: 1,
      low: 2,
    };
    return [...stats].sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority],
    );
  }, [stats]);

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Box
        className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        display="grid"
        w="full"
        gap={4}
      >
        {orderedStats.map((stat) => (
          <StatCardContent key={stat.title} stat={stat} />
        ))}
      </Box>
    </Box>
  );
}

function StatCardContent({ stat }: { stat: StatCard }) {
  const growthType = calculateGrowthType(stat.growth);
  const trend = growthTypeMap[growthType];
  const priority = priorityConfig[stat.priority];
  const hasAlert = Boolean(stat.alert);

  return (
    <Card
      to={stat.link ?? ''}
      {...(stat.link && { component: Link, to: stat.link })}
      contentProps={{
        className: cn(
          'group/stats relative flex h-full w-full flex-col items-center gap-3 rounded-md transition-all duration-200',
          priority.cardClass,
          hasAlert && 'border-warning bg-warning/5',
        ),
      }}
      className="w-full transition-all duration-200 hover:scale-105"
    >
      <StatCardInner
        stat={stat}
        trend={trend}
        priority={priority}
        hasAlert={hasAlert}
      />
    </Card>
  );
}

function LoadingOverlay() {
  return (
    <Box className="absolute inset-0 flex items-center justify-center rounded-md bg-transparent">
      <Box className="border-foreground h-6 w-6 animate-spin rounded-full border-b-3" />
    </Box>
  );
}

function AlertIndicator() {
  return (
    <Box className="bg-warning absolute -top-1 -right-1 h-3 w-3 animate-pulse rounded-full" />
  );
}

function StatCardHeader({
  stat,
  priority,
}: {
  stat: StatCard;
  priority: (typeof priorityConfig)[keyof typeof priorityConfig];
}) {
  return (
    <Box className="flex w-full items-center justify-between gap-2">
      <Box className="flex h-full flex-col justify-between gap-2">
        <Typography variant="body2" className={cn(priority.titleClass)}>
          {stat.title}
        </Typography>
        <Typography variant="h1" className={cn(priority.valueClass)}>
          {stat.value}
        </Typography>
        {stat.description && (
          <Typography variant="caption" className="text-foreground/80">
            {stat.description}
          </Typography>
        )}
      </Box>
      {stat.icon && (
        <Box
          className={cn(
            'flex items-center justify-center rounded-lg p-2',
            getIconBgColor(stat.iconColor),
          )}
        >
          <Icon
            name={stat.icon}
            className={cn('size-12', getIconColor(stat.iconColor))}
          />
        </Box>
      )}
    </Box>
  );
}

function GrowthIndicator({
  stat,
  trend,
  detectedPeriod,
}: {
  stat: StatCard;
  trend: (typeof growthTypeMap)[keyof typeof growthTypeMap];
  detectedPeriod: string;
}) {
  return (
    <Box className="flex w-full flex-col items-start">
      <Box display="flex" items="center" justify="center" gap={1}>
        <Icon name={trend.icon} size="sm" className={trend.color} />
        <Typography
          variant="caption"
          className={cn('leading-normal font-semibold', trend.color)}
        >
          {stat.growth}%
        </Typography>
        <Typography variant="caption" className="lowercase">
          {trend.direction} {detectedPeriod}
        </Typography>
      </Box>
    </Box>
  );
}

function StatExtras({ extras }: { extras: StatCard['extras'] }) {
  if (!extras || extras.length === 0) return null;

  return (
    <Box className="mt-3 w-full rounded-md">
      <Box className="grid grid-cols-1 gap-1">
        {extras.map((extra) => (
          <Box key={extra.label} className="flex items-center justify-between">
            <Box className="flex items-center gap-1">
              {extra.icon && (
                <Icon
                  name={extra.icon}
                  size="sm"
                  className={getIconColor(extra.color)}
                />
              )}
              <Typography variant="caption" className="text-foreground/80">
                {extra.label}
              </Typography>
            </Box>
            <Typography variant="caption" className="font-semibold">
              {extra.value}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function AlertMessage({ alert }: { alert?: string }) {
  if (!alert) return null;

  return (
    <Box className="bg-warning/10 mt-2 rounded-md p-2">
      <Typography variant="caption" className="text-warning font-medium">
        ⚠️ {alert}
      </Typography>
    </Box>
  );
}

function StatCardInner({
  stat,
  trend,
  priority,
  hasAlert,
}: {
  stat: StatCard;
  trend: (typeof growthTypeMap)[keyof typeof growthTypeMap];
  priority: (typeof priorityConfig)[keyof typeof priorityConfig];
  hasAlert: boolean;
}) {
  const detectedPeriod =
    detectPeriodFromValue({
      from: stat.period.from ?? 'Last 7 days',
      to: stat.period.to ?? endOfPeriod('Today').toISOString(),
    }) ?? 'previous period';

  return (
    <>
      {stat.isLoading && <LoadingOverlay />}
      {hasAlert && <AlertIndicator />}

      <Box className="flex w-full flex-col gap-1">
        <StatCardHeader stat={stat} priority={priority} />
        <GrowthIndicator
          stat={stat}
          trend={trend}
          detectedPeriod={detectedPeriod}
        />
        <StatExtras extras={stat.extras} />
        <AlertMessage alert={stat.alert} />
      </Box>
    </>
  );
}
