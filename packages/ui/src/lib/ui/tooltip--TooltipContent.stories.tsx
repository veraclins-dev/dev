import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { TooltipContent } from './tooltip';

const meta: Meta<typeof TooltipContent> = {
  component: TooltipContent,
  title: 'Base/Tooltip/Content',
};
export default meta;
type Story = StoryObj<typeof TooltipContent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to TooltipContent!/gi)).toBeTruthy();
  },
};
