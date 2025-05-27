import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { PopoverArrow } from './popover';

const meta: Meta<typeof PopoverArrow> = {
  component: PopoverArrow,
  title: 'Base/Popover/Arrow',
};
export default meta;
type Story = StoryObj<typeof PopoverArrow>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to PopoverArrow!/gi)).toBeTruthy();
  },
};
