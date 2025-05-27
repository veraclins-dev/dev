import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { PopoverTrigger } from './popover';

const meta: Meta<typeof PopoverTrigger> = {
  component: PopoverTrigger,
  title: 'Base/Popover/Trigger',
};
export default meta;
type Story = StoryObj<typeof PopoverTrigger>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to PopoverTrigger!/gi)).toBeTruthy();
  },
};
