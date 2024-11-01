import type { Meta, StoryObj } from '@storybook/react';
import { ComposedPopover } from './popover';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof ComposedPopover> = {
  component: ComposedPopover,
  title: 'ComposedPopover',
};
export default meta;
type Story = StoryObj<typeof ComposedPopover>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ComposedPopover!/gi)).toBeTruthy();
  },
};
