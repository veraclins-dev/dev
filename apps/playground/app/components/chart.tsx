import { useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart as RechartsPieChart,
  Sector,
  XAxis,
  YAxis,
} from 'recharts';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  Icon,
  Typography,
} from '@veraclins-dev/ui';

import { PlaygroundBreadcrumb } from './playground-breadcrumb';

// Sample data for different chart types
const areaChartData = [
  { month: 'Jan', desktop: 186, mobile: 80 },
  { month: 'Feb', desktop: 305, mobile: 200 },
  { month: 'Mar', desktop: 237, mobile: 120 },
  { month: 'Apr', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'Jun', desktop: 214, mobile: 140 },
];

const lineChartData = [
  { month: 'Jan', revenue: 12000, expenses: 8000 },
  { month: 'Feb', revenue: 15000, expenses: 9000 },
  { month: 'Mar', revenue: 18000, expenses: 11000 },
  { month: 'Apr', revenue: 14000, expenses: 8500 },
  { month: 'May', revenue: 22000, expenses: 12000 },
  { month: 'Jun', revenue: 25000, expenses: 14000 },
];

const barChartData = [
  { category: 'Electronics', sales: 4500, target: 5000 },
  { category: 'Clothing', sales: 3200, target: 3500 },
  { category: 'Books', sales: 2800, target: 3000 },
  { category: 'Home', sales: 3800, target: 4000 },
  { category: 'Sports', sales: 2100, target: 2500 },
];

const pieChartData = [
  { browser: 'Chrome', visitors: 275, fill: '#4285F4' },
  { browser: 'Safari', visitors: 200, fill: '#FFCA28' },
  { browser: 'Firefox', visitors: 187, fill: '#FF5722' },
  { browser: 'Edge', visitors: 173, fill: '#00BFAE' },
  { browser: 'Other', visitors: 90, fill: '#9E9E9E' },
];

const donutChartData = [
  { category: 'Marketing', value: 35, fill: '#3B82F6' },
  { category: 'Development', value: 25, fill: '#10B981' },
  { category: 'Design', value: 20, fill: '#F59E0B' },
  { category: 'Sales', value: 15, fill: '#EF4444' },
  { category: 'Support', value: 5, fill: '#8B5CF6' },
];

export function ChartShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Chart configurations
  const areaChartConfig: ChartConfig = {
    desktop: {
      label: 'Desktop',
      color: 'var(--color-primary)',
    },
    mobile: {
      label: 'Mobile',
      color: 'var(--color-secondary)',
    },
  };

  const lineChartConfig: ChartConfig = {
    revenue: {
      label: 'Revenue',
      color: 'var(--color-success)',
    },
    expenses: {
      label: 'Expenses',
      color: 'var(--color-destructive)',
    },
  };

  const barChartConfig: ChartConfig = {
    sales: {
      label: 'Sales',
      color: 'var(--color-primary)',
    },
    target: {
      label: 'Target',
      color: 'var(--color-warning)',
    },
  };

  const pieChartConfig: ChartConfig = {
    Chrome: {
      label: 'Chrome',
      color: '#4285F4',
    },
    Safari: {
      label: 'Safari',
      color: '#FFCA28',
    },
    Firefox: {
      label: 'Firefox',
      color: '#FF5722',
    },
    Edge: {
      label: 'Edge',
      color: '#00BFAE',
    },
    Other: {
      label: 'Other',
      color: '#9E9E9E',
    },
  };

  const donutChartConfig: ChartConfig = {
    Marketing: {
      label: 'Marketing',
      color: '#3B82F6',
    },
    Development: {
      label: 'Development',
      color: '#10B981',
    },
    Design: {
      label: 'Design',
      color: '#F59E0B',
    },
    Sales: {
      label: 'Sales',
      color: '#EF4444',
    },
    Support: {
      label: 'Support',
      color: '#8B5CF6',
    },
  };

  const onPieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  return (
    <Box display="flex" flexDirection="column" gap={6}>
      <PlaygroundBreadcrumb currentPage="Charts" className="mb-4" />

      <Typography variant="h1" className="text-center">
        Chart Components
      </Typography>

      <Typography variant="body1" className="text-center mb-8">
        Data visualization components built on Recharts with theming, tooltips,
        and responsive design.
      </Typography>

      {/* Area Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Area Chart</CardTitle>
          <CardDescription>
            Stacked area chart showing cumulative data over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Area Chart */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Traffic by Device Type
              </Typography>
              <ChartContainer config={areaChartConfig}>
                <AreaChart
                  data={areaChartData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip
                    content={(props) => {
                      const totalTraffic =
                        props.payload?.reduce(
                          (sum, item) => sum + (item.value || 0),
                          0,
                        ) || 0;
                      return (
                        <ChartTooltipContent
                          indicator="dot"
                          {...props}
                          footer={
                            <Box className="flex items-center justify-between gap-3">
                              <Box
                                component="span"
                                className="text-foreground text-sm font-medium"
                              >
                                Total Traffic
                              </Box>
                              <Box
                                component="span"
                                className="text-foreground font-mono text-sm font-bold"
                              >
                                {totalTraffic.toLocaleString()}
                              </Box>
                            </Box>
                          }
                        />
                      );
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="mobile"
                    stackId="1"
                    stroke="var(--color-secondary)"
                    fill="var(--color-secondary)"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="desktop"
                    stackId="1"
                    stroke="var(--color-primary)"
                    fill="var(--color-primary)"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ChartContainer>
            </Box>

            {/* Area Chart with Custom Styling */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Custom Styled Area Chart
              </Typography>
              <ChartContainer config={areaChartConfig} className="h-64">
                <AreaChart
                  data={areaChartData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip
                    content={(props) => (
                      <ChartTooltipContent indicator="dot" {...props} />
                    )}
                  />
                  <Area
                    type="natural"
                    dataKey="mobile"
                    stackId="1"
                    stroke="var(--color-secondary)"
                    fill="var(--color-secondary)"
                    fillOpacity={0.4}
                  />
                  <Area
                    type="natural"
                    dataKey="desktop"
                    stackId="1"
                    stroke="var(--color-primary)"
                    fill="var(--color-primary)"
                    fillOpacity={0.4}
                  />
                </AreaChart>
              </ChartContainer>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Line Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Line Chart</CardTitle>
          <CardDescription>
            Line charts for showing trends and relationships over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Line Chart */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Revenue vs Expenses
              </Typography>
              <ChartContainer config={lineChartConfig}>
                <LineChart
                  accessibilityLayer
                  data={lineChartData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip
                    content={(props) => {
                      const revenue =
                        props.payload?.find(
                          (item) => item.dataKey === 'revenue',
                        )?.value || 0;
                      const expenses =
                        props.payload?.find(
                          (item) => item.dataKey === 'expenses',
                        )?.value || 0;
                      const profit = revenue - expenses;
                      return (
                        <ChartTooltipContent
                          indicator="dot"
                          {...props}
                          footer={
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="text-foreground text-sm font-medium">
                                  Net Profit
                                </span>
                                <span
                                  className={`font-mono text-sm font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}
                                >
                                  ${profit.toLocaleString()}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>Margin</span>
                                <span>
                                  {revenue > 0
                                    ? ((profit / revenue) * 100).toFixed(1)
                                    : 0}
                                  %
                                </span>
                              </div>
                            </div>
                          }
                        />
                      );
                    }}
                  />
                  <ChartLegend
                    content={({ payload, verticalAlign }) => (
                      <ChartLegendContent
                        payload={payload}
                        verticalAlign={verticalAlign}
                      />
                    )}
                    verticalAlign="bottom"
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-success)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="var(--color-destructive)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </Box>

            {/* Smooth Line Chart */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Smooth Line Chart
              </Typography>
              <ChartContainer config={lineChartConfig}>
                <LineChart
                  data={lineChartData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip
                    content={(props) => (
                      <ChartTooltipContent indicator="line" {...props} />
                    )}
                  />
                  <Line
                    type="natural"
                    dataKey="revenue"
                    stroke="var(--color-success)"
                    strokeWidth={3}
                    dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 5 }}
                  />
                  <Line
                    type="natural"
                    dataKey="expenses"
                    stroke="var(--color-destructive)"
                    strokeWidth={3}
                    dot={{
                      fill: 'var(--color-destructive)',
                      strokeWidth: 2,
                      r: 5,
                    }}
                  />
                </LineChart>
              </ChartContainer>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Bar Chart</CardTitle>
          <CardDescription>
            Bar charts for comparing categories and showing distributions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Bar Chart */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Sales by Category
              </Typography>
              <ChartContainer config={barChartConfig}>
                <BarChart
                  data={barChartData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <ChartTooltip
                    content={(props) => {
                      const avgSales =
                        props.payload?.reduce(
                          (sum, item) => sum + (item.value || 0),
                          0,
                        ) / (props.payload?.length || 1) || 0;
                      return (
                        <ChartTooltipContent
                          indicator="dot"
                          {...props}
                          footer={
                            <div className="flex items-center justify-between">
                              <span className="text-foreground text-sm font-medium">
                                Average Sales
                              </span>
                              <span className="text-foreground font-mono text-sm font-bold">
                                ${avgSales.toLocaleString()}
                              </span>
                            </div>
                          }
                        />
                      );
                    }}
                  />
                  <Bar dataKey="sales" fill="var(--color-primary)" />
                </BarChart>
              </ChartContainer>
            </Box>

            {/* Grouped Bar Chart */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Sales vs Target
              </Typography>
              <ChartContainer config={barChartConfig}>
                <BarChart
                  data={barChartData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis
                    dataKey="category"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip
                    content={(props) => (
                      <ChartTooltipContent indicator="dot" {...props} />
                    )}
                  />
                  <Bar dataKey="sales" fill="var(--color-primary)" />
                  <Bar dataKey="target" fill="var(--color-warning)" />
                </BarChart>
              </ChartContainer>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Pie Charts */}
      <Card>
        <CardHeader>
          <CardTitle>Pie & Donut Charts</CardTitle>
          <CardDescription>
            Circular charts for showing proportions and percentages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Browser Usage
              </Typography>
              <ChartContainer
                config={pieChartConfig}
                className="mx-auto aspect-square max-h-[350px] min-h-80"
              >
                <RechartsPieChart>
                  <ChartTooltip
                    defaultIndex={activeIndex}
                    content={(props) => (
                      <ChartTooltipContent hideLabel {...props} />
                    )}
                  />
                  <Pie
                    data={pieChartData}
                    dataKey="visitors"
                    nameKey="browser"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    labelLine={false}
                    activeShape={({ outerRadius = 0, ...props }) => (
                      <Sector {...props} outerRadius={outerRadius + 10} />
                    )}
                    onMouseEnter={onPieEnter}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartLegend
                    content={<ChartLegendContent />}
                    verticalAlign="bottom"
                  />
                </RechartsPieChart>
              </ChartContainer>
            </Box>

            {/* Donut Chart */}
            <Box>
              <Typography variant="h4" className="mb-4">
                Budget Allocation
              </Typography>
              <ChartContainer
                config={donutChartConfig}
                className="mx-auto aspect-square max-h-[350px] min-h-80"
              >
                <RechartsPieChart>
                  <ChartTooltip
                    defaultIndex={activeIndex}
                    content={(props) => (
                      <ChartTooltipContent hideLabel {...props} />
                    )}
                  />
                  <Pie
                    data={donutChartData}
                    dataKey="value"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    fill="#8884d8"
                    labelLine={false}
                    activeShape={({ outerRadius = 0, ...props }) => (
                      <Sector {...props} outerRadius={outerRadius + 10} />
                    )}
                    onMouseEnter={onPieEnter}
                  >
                    {donutChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartLegend
                    content={<ChartLegendContent />}
                    verticalAlign="bottom"
                  />
                </RechartsPieChart>
              </ChartContainer>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Real-Life Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Real-Life Chart Examples</CardTitle>
          <CardDescription>
            Practical chart implementations for common use cases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Analytics Dashboard */}
            <Card className="bg-card-inner">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="chart-bar" className="h-5 w-5" />
                  Analytics Dashboard
                </CardTitle>
                <CardDescription>
                  Website traffic and conversion metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Box className="space-y-4">
                  <ChartContainer config={areaChartConfig}>
                    <AreaChart
                      data={areaChartData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                      />
                      <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                      <ChartTooltip
                        content={(props) => (
                          <ChartTooltipContent indicator="dot" {...props} />
                        )}
                      />
                      <Area
                        type="natural"
                        dataKey="mobile"
                        stackId="1"
                        stroke="var(--color-secondary)"
                        fill="var(--color-secondary)"
                        fillOpacity={0.4}
                      />
                      <Area
                        type="natural"
                        dataKey="desktop"
                        stackId="1"
                        stroke="var(--color-primary)"
                        fill="var(--color-primary)"
                        fillOpacity={0.4}
                      />
                    </AreaChart>
                  </ChartContainer>
                  <Box className="flex gap-2">
                    <Button variant="outline" buttonSize="sm">
                      <Icon name="download" className="mr-1" />
                      Export Data
                    </Button>
                    <Button buttonSize="sm">
                      <Icon name="reload" className="mr-1" />
                      Refresh
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Financial Report */}
            <Card className="bg-card-inner">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="currency-dollar" className="h-5 w-5" />
                  Financial Report
                </CardTitle>
                <CardDescription>Revenue and expense tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <Box className="space-y-4">
                  <ChartContainer config={lineChartConfig}>
                    <LineChart
                      data={lineChartData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                      />
                      <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                      <ChartTooltip
                        content={(props) => (
                          <ChartTooltipContent indicator="line" {...props} />
                        )}
                      />
                      <Line
                        type="natural"
                        dataKey="revenue"
                        stroke="var(--color-success)"
                        strokeWidth={3}
                        dot={{
                          fill: 'var(--color-success)',
                          strokeWidth: 2,
                          r: 5,
                        }}
                      />
                      <Line
                        type="natural"
                        dataKey="expenses"
                        stroke="var(--color-destructive)"
                        strokeWidth={3}
                        dot={{
                          fill: 'var(--color-destructive)',
                          strokeWidth: 2,
                          r: 5,
                        }}
                      />
                    </LineChart>
                  </ChartContainer>
                  <Box className="flex gap-2">
                    <Button variant="outline" buttonSize="sm">
                      <Icon name="file-text" className="mr-1" />
                      Generate Report
                    </Button>
                    <Button buttonSize="sm">
                      <Icon name="share" className="mr-1" />
                      Share
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Card>
        <CardHeader>
          <CardTitle>Chart Best Practices</CardTitle>
          <CardDescription>
            Guidelines for creating effective and accessible data visualizations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Box className="space-y-4">
            <Box>
              <Typography variant="h4" className="mb-2">
                Data Visualization Principles
              </Typography>
              <Typography variant="body2">
                • Choose the right chart type for your data and message
                <br />
                • Use consistent colors and styling across related charts
                <br />
                • Provide clear labels and titles for context
                <br />
                • Include tooltips for detailed information on hover
                <br />
                • Use tooltip footers to show summary calculations (totals,
                averages, etc.)
                <br />• Ensure charts are responsive and work on all screen
                sizes
              </Typography>
            </Box>

            <Box>
              <Typography variant="h4" className="mb-2">
                Accessibility Considerations
              </Typography>
              <Typography variant="body2" className="text-muted-foreground">
                • Provide alternative text descriptions for screen readers
                <br />
                • Use sufficient color contrast for text and data points
                <br />
                • Include keyboard navigation support
                <br />
                • Provide data tables as alternatives to complex charts
                <br />• Use semantic HTML structure for chart containers
              </Typography>
            </Box>

            <Box>
              <Typography variant="h4" className="mb-2">
                Performance Optimization
              </Typography>
              <Typography variant="body2" className="text-muted-foreground">
                • Limit the number of data points for better performance
                <br />
                • Use appropriate chart types for large datasets
                <br />
                • Implement lazy loading for charts with heavy data
                <br />
                • Consider using virtual scrolling for long lists of charts
                <br />• Optimize chart rendering with proper memoization
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
