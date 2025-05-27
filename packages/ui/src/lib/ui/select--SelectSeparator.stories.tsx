import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { SelectSeparator } from './select';

const meta: Meta<typeof SelectSeparator> = {
  component: SelectSeparator,
  title: 'Base/Select/Separator',
};
export default meta;
type Story = StoryObj<typeof SelectSeparator>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to SelectSeparator!/gi)).toBeTruthy();
  },
};
