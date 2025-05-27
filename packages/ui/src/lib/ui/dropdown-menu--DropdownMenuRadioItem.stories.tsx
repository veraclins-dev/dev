import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { DropdownMenuRadioItem } from './dropdown-menu';

const meta: Meta<typeof DropdownMenuRadioItem> = {
  component: DropdownMenuRadioItem,
  title: 'Base/DropdownMenu/RadioItem',
};
export default meta;
type Story = StoryObj<typeof DropdownMenuRadioItem>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/Welcome to DropdownMenuRadioItem!/gi),
    ).toBeTruthy();
  },
};
