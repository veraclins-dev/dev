import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { PopoverContent } from './popover';

const meta: Meta<typeof PopoverContent> = {
  component: PopoverContent,
  title: 'Base/Popover/Content',
};
export default meta;
type Story = StoryObj<typeof PopoverContent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to PopoverContent!/gi)).toBeTruthy();
  },
};
