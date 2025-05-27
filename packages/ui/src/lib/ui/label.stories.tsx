import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Label } from './label';

const meta: Meta<typeof Label> = {
  component: Label,
  title: 'Base/Label',
};
export default meta;
type Story = StoryObj<typeof Label>;

export const Primary: Story = {
  args: {
    children: 'Primary',
  },
};

export const Heading: Story = {
  args: {
    children: 'Heading',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Label!/gi)).toBeTruthy();
  },
};
