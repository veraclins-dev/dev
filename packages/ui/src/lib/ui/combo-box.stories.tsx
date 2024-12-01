import type { Meta, StoryObj } from '@storybook/react';
import { expect,within } from '@storybook/test';

import { ComboboxDemo } from './combo-box';

const meta: Meta<typeof ComboboxDemo> = {
  component: ComboboxDemo,
  title: 'ComboboxDemo',
};
export default meta;
type Story = StoryObj<typeof ComboboxDemo>;

export const Primary = {
  args: {
    options: '',
  },
};

export const Heading: Story = {
  args: {
    options: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ComboboxDemo!/gi)).toBeTruthy();
  },
};
