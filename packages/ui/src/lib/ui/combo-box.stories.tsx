import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { ComboboxDemo } from './combo-box';

const meta: Meta<typeof ComboboxDemo> = {
  component: ComboboxDemo,
  title: 'ComboboxDemo',
};
export default meta;
type Story = StoryObj<typeof ComboboxDemo>;

export const Primary: Story = {
  args: {
    options: ['Option 1', 'Something 2', 'others 3'],
  },
};

export const Heading: Story = {
  args: {
    options: [
      { label: 'Option 1', value: 'Option 1' },
      { label: 'Option 2', value: 'Option 2' },
      { label: 'Option 3', value: 'Option 3' },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ComboboxDemo!/gi)).toBeTruthy();
  },
};
