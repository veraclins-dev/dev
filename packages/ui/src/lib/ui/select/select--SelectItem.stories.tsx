import type { Meta, StoryObj } from '@storybook/react';
import { expect,within } from '@storybook/test';

import { SelectItem } from './select';

const meta: Meta<typeof SelectItem> = {
  component: SelectItem,
  title: 'SelectItem',
};
export default meta;
type Story = StoryObj<typeof SelectItem>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to SelectItem!/gi)).toBeTruthy();
  },
};
