import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Card } from './card';

const meta: Meta<typeof Card> = {
  component: Card,
  title: 'Base/Card/Main',
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Card!/gi)).toBeTruthy();
  },
};
