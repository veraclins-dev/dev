import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { ComposedPopover } from './popover';

const meta: Meta<typeof ComposedPopover> = {
  component: ComposedPopover,
  title: 'Base/Popover/Composed',
};
export default meta;
type Story = StoryObj<typeof ComposedPopover>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ComposedPopover!/gi)).toBeTruthy();
  },
};
