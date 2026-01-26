import { Box, Typography } from '@veraclins-dev/ui';
import { getDateRange } from '@veraclins-dev/utils';

import { type PageHandle } from '../../../common/types';
import { getPageTitle } from '../../../utils/misc';
import { getQueryParams } from '../../../utils/misc';
import { DashboardLayout } from '../components/dashboard/dashboard-layout';
import { PeriodSelect } from '../components/dashboard/period-select';
import { type StatCard } from '../components/dashboard/stats-cards';

import { type Route } from './+types/_index';

export const handle: PageHandle = {
  breadcrumb: 'Overview',
  header: 'Dashboard Overview',
  description: 'Monitor your platform metrics and analytics',
};

export async function loader({ request }: Route.LoaderArgs) {
  const { from, to } = getQueryParams(request);
  const period = getDateRange({
    from: from ? new Date(from) : 'Last 7 days',
    to: to ? new Date(to) : undefined,
  });

  // TODO: Add your project-specific analytics here
  // Example:
  // const userStats = await getUserStats(period)
  // const contentStats = await getContentStats(period)

  // Placeholder stats - replace with your actual data
  const stats: StatCard[] = [
    {
      title: 'Total Users',
      value: 0,
      growth: 0,
      period,
      icon: 'users',
      iconColor: 'primary',
      priority: 'high',
    },
    {
      title: 'Active Users',
      value: 0,
      growth: 0,
      period,
      icon: 'user-check',
      iconColor: 'success',
      priority: 'high',
    },
  ];

  return {
    stats,
    period,
  };
}

export const meta: Route.MetaFunction = () => [
  { title: getPageTitle('Admin Dashboard') },
];

export default function DashboardOverview({
  loaderData: { stats },
}: Route.ComponentProps) {
  return (
    <DashboardLayout
      stats={stats}
      header={
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h1">Dashboard Overview</Typography>
          <PeriodSelect />
        </Box>
      }
    >
      <Box>
        <Typography variant="body1" className="text-foreground/70">
          Add your custom dashboard content here. Use the stat cards above to
          display key metrics, and add charts, tables, or other analytics
          components below.
        </Typography>
      </Box>
    </DashboardLayout>
  );
}
