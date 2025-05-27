import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { ComposedDropdownMenu } from './dropdown-menu';

const meta: Meta<typeof ComposedDropdownMenu> = {
  component: ComposedDropdownMenu,
  title: 'Base/DropdownMenu/Composed',
};
export default meta;
type Story = StoryObj<typeof ComposedDropdownMenu>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ComposedDropdownMenu!/gi)).toBeTruthy();
  },
};
