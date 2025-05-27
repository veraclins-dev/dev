import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { HoverCardTrigger } from './hover-card';

const meta: Meta<typeof HoverCardTrigger> = {
  component: HoverCardTrigger,
  title: 'Base/HoverCard/Trigger',
};
export default meta;
type Story = StoryObj<typeof HoverCardTrigger>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to HoverCardTrigger!/gi)).toBeTruthy();
  },
};
