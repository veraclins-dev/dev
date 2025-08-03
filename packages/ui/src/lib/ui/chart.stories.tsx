import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Pie,
  PieChart as RechartsPieChart,
  Sector,
  XAxis,
} from 'recharts';
import { type PieSectorDataItem } from 'recharts/types/polar/Pie';
import { expect, within } from 'storybook/test';

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from './chart';

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--primary)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--primary)',
  },
} satisfies ChartConfig;

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

const pieChartData = [
  { browser: 'chrome', visitors: 275, fill: '#4285F4' },
  { browser: 'safari', visitors: 200, fill: '#FFCA28' },
  { browser: 'firefox', visitors: 187, fill: '#FF5722' },
  { browser: 'edge', visitors: 173, fill: '#00BFAE' },
  { browser: 'other', visitors: 90, fill: '#9E9E9E' },
];
const meta: Meta<typeof ChartContainer> = {
  component: ChartContainer,
  title: 'Base/Chart',
};
export default meta;
type Story = StoryObj<typeof ChartContainer>;

export const Primary: Story = {
  args: {},
  render: () => {
    return (
      <ChartContainer config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 0,
            right: 10,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
            hide
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Area
            dataKey="mobile"
            type="natural"
            fill="#65dfc9"
            fillOpacity={0.6}
            stroke="#65dfc9"
            stackId="a"
          />
          <Area
            dataKey="desktop"
            type="natural"
            fill="var(--color-desktop)"
            fillOpacity={0.4}
            stroke="var(--color-desktop)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    );
  },
};

export const PieChart: Story = {
  args: {},
  render: () => {
    return (
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[350px] min-h-80 xl:min-h-[350px]"
      >
        <RechartsPieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={pieChartData}
            dataKey="visitors"
            nameKey="browser"
            innerRadius={60}
            strokeWidth={5}
            activeIndex={1}
            activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
              <Sector {...props} outerRadius={outerRadius + 10} />
            )}
          />
        </RechartsPieChart>
      </ChartContainer>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ChartContainer!/gi)).toBeTruthy();
  },
};
