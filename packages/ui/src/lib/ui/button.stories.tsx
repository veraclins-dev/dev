import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { ButtonBase } from './button';

const meta: Meta<typeof ButtonBase> = {
  component: ButtonBase,
  title: 'ButtonBase',
};
export default meta;
type Story = StoryObj<typeof ButtonBase>;

export const Primary = {
  args: {
    children: 'Primary',
    variant: 'primary',
    className: 'px-4 py-2',
  },
};

export const Heading: Story = {
  args: {
    children: 'Welcome to ButtonBase!',
    variant: 'outline',
    className: 'px-4 py-2',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ButtonBase!/gi)).toBeTruthy();
  },
};
