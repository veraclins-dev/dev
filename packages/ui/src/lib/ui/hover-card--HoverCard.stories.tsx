import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { HoverCard } from './hover-card';

const meta: Meta<typeof HoverCard> = {
  component: HoverCard,
  title: 'Base/HoverCard/Root',
};
export default meta;
type Story = StoryObj<typeof HoverCard>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to HoverCard!/gi)).toBeTruthy();
  },
};
