import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';

import { LinkBubbleMenu } from './index';

const meta: Meta<typeof LinkBubbleMenu> = {
  component: LinkBubbleMenu,
  title: 'LinkBubbleMenu',
};
export default meta;
type Story = StoryObj<typeof LinkBubbleMenu>;

export const Primary = {
  args: {
    labels: '',
  },
};

export const Heading: Story = {
  args: {
    labels: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to LinkBubbleMenu!/gi)).toBeTruthy();
  },
};
