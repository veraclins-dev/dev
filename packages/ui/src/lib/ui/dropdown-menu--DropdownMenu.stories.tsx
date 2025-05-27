import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { DropdownMenu } from './dropdown-menu';

const meta: Meta<typeof DropdownMenu> = {
  component: DropdownMenu,
  title: 'Base/DropdownMenu/Root',
};
export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DropdownMenu!/gi)).toBeTruthy();
  },
};
