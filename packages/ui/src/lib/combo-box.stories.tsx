import type { Meta, StoryObj } from '@storybook/react';
import { ComboboxDemo } from './combo-box';

import { within, expect } from '@storybook/test';

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
