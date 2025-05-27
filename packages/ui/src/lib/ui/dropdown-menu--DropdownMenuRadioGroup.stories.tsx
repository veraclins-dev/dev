import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { DropdownMenuRadioGroup } from './dropdown-menu';

const meta: Meta<typeof DropdownMenuRadioGroup> = {
  component: DropdownMenuRadioGroup,
  title: 'Base/DropdownMenu/RadioGroup',
};
export default meta;
type Story = StoryObj<typeof DropdownMenuRadioGroup>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/Welcome to DropdownMenuRadioGroup!/gi),
    ).toBeTruthy();
  },
};
