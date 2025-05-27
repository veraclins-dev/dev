import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { HoverCardContent } from './hover-card';

const meta: Meta<typeof HoverCardContent> = {
  component: HoverCardContent,
  title: 'Base/HoverCard/Content',
};
export default meta;
type Story = StoryObj<typeof HoverCardContent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to HoverCardContent!/gi)).toBeTruthy();
  },
};
