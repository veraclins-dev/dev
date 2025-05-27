import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { PopoverAnchor } from './popover';

const meta: Meta<typeof PopoverAnchor> = {
  component: PopoverAnchor,
  title: 'Base/Popover/Anchor',
};
export default meta;
type Story = StoryObj<typeof PopoverAnchor>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to PopoverAnchor!/gi)).toBeTruthy();
  },
};
