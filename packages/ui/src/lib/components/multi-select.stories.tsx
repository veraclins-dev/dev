import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { ComboboxInput } from './multi-select';

const meta: Meta<typeof ComboboxInput> = {
  component: ComboboxInput,
  title: 'ComboboxInput',
};
export default meta;
type Story = StoryObj<typeof ComboboxInput>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ComboboxInput!/gi)).toBeTruthy();
  },
};
