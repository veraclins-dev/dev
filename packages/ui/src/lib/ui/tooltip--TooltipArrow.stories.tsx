import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { TooltipArrow } from './tooltip';

const meta: Meta<typeof TooltipArrow> = {
  component: TooltipArrow,
  title: 'Base/Tooltip/Arrow',
};
export default meta;
type Story = StoryObj<typeof TooltipArrow>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to TooltipArrow!/gi)).toBeTruthy();
  },
};
