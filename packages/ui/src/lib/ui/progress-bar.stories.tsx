import type { Meta, StoryObj } from '@storybook/react-vite';

import { Box } from './box';
import { ProgressBar } from './progress-bar';

const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
  title: 'Base/ProgressBar',
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

/** Linear Progress Bar */
export const Primary: Story = {
  args: {
    value: 75,
    variant: 'linear',
    progressSize: 'md',
    color: 'primary',
    showValue: false,
  },
};

/** Circular Progress Bar */
export const Circular: Story = {
  args: {
    value: 60,
    variant: 'circular',
    progressSize: 'md',
    color: 'primary',
    showValue: false,
  },
};

/** Progress Bar with Value */
export const WithValue: Story = {
  args: {
    value: 45,
    variant: 'linear',
    progressSize: 'md',
    color: 'primary',
    showValue: true,
  },
};

/** Indeterminate Progress Bar */
export const Indeterminate: Story = {
  args: {
    value: 0,
    variant: 'linear',
    progressSize: 'md',
    color: 'primary',
    showValue: false,
    indeterminate: true,
  },
};

/** Progress Bar Sizes */
export const Sizes: Story = {
  args: {
    value: 75,
    variant: 'linear',
    color: 'primary',
  },
  render: (args) => (
    <Box className="space-y-4">
      <ProgressBar {...args} progressSize="sm" />
      <ProgressBar {...args} progressSize="md" />
      <ProgressBar {...args} progressSize="lg" />
      <ProgressBar {...args} progressSize="xl" />
    </Box>
  ),
};

/** Progress Bar Colors */
export const Colors: Story = {
  args: {
    value: 75,
    variant: 'linear',
    progressSize: 'md',
  },
  render: (args) => (
    <Box className="space-y-4">
      <ProgressBar {...args} color="primary" />
      <ProgressBar {...args} color="success" />
      <ProgressBar {...args} color="warning" />
      <ProgressBar {...args} color="destructive" />
      <ProgressBar {...args} color="info" />
      <ProgressBar {...args} color="neutral" />
      <ProgressBar {...args} color="secondary" />
    </Box>
  ),
};

/** Circular Progress Bar with Value */
export const CircularWithValue: Story = {
  args: {
    value: 60,
    variant: 'circular',
    progressSize: 'md',
    color: 'primary',
    showValue: true,
    indeterminate: false,
  },
};

/** Circular Progress Bar Indeterminate */
export const CircularIndeterminate: Story = {
  args: {
    value: 0,
    variant: 'circular',
    progressSize: 'md',
    color: 'primary',
    showValue: false,
    indeterminate: true,
  },
};

export const CircularSizes: Story = {
  args: {
    value: 80,
    variant: 'circular',
    color: 'primary',
  },
  render: (args) => (
    <Box display="flex" items="center" gapX={4}>
      <ProgressBar {...args} progressSize="sm" />
      <ProgressBar {...args} progressSize="md" />
      <ProgressBar {...args} progressSize="lg" />
      <ProgressBar {...args} progressSize="xl" />
    </Box>
  ),
};

export const CircularSizesIndeterminate: Story = {
  args: {
    value: 50,
    variant: 'circular',
    color: 'primary',
    indeterminate: true,
  },
  render: (args) => (
    <Box display="flex" items="center" gapX={4}>
      <ProgressBar {...args} progressSize="sm" />
      <ProgressBar {...args} progressSize="md" />
      <ProgressBar {...args} progressSize="lg" />
      <ProgressBar {...args} progressSize="xl" />
    </Box>
  ),
};
