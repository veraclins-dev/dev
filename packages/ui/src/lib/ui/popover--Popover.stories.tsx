import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Popover } from './popover';

const meta: Meta<typeof Popover> = {
  component: Popover,
  title: 'Base/Popover/Root',
};
export default meta;
type Story = StoryObj<typeof Popover>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Popover!/gi)).toBeTruthy();
  },
};
