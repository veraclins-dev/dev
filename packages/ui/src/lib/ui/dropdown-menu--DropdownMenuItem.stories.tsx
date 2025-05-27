import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { DropdownMenuItem } from './dropdown-menu';

const meta: Meta<typeof DropdownMenuItem> = {
  component: DropdownMenuItem,
  title: 'Base/DropdownMenuItem',
};
export default meta;
type Story = StoryObj<typeof DropdownMenuItem>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DropdownMenuItem!/gi)).toBeTruthy();
  },
};
