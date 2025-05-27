import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Button } from './button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Components/Button/Main',
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    tooltip: '',
  },
};

export const Heading: Story = {
  args: {
    tooltip: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Button!/gi)).toBeTruthy();
  },
};
