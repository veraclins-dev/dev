import type { Meta, StoryObj } from '@storybook/react';
import { expect,within } from '@storybook/test';

import { tooltipLabel } from './chart';

const meta: Meta<typeof tooltipLabel> = {
  component: tooltipLabel,
  title: 'tooltipLabel',
};
export default meta;
type Story = StoryObj<typeof tooltipLabel>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to tooltipLabel!/gi)).toBeTruthy();
  },
};
