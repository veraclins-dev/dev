import type { Meta, StoryObj } from '@storybook/react';
import { expect,within } from '@storybook/test';

import { SelectContent } from './select';

const meta: Meta<typeof SelectContent> = {
  component: SelectContent,
  title: 'SelectContent',
};
export default meta;
type Story = StoryObj<typeof SelectContent>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to SelectContent!/gi)).toBeTruthy();
  },
};
