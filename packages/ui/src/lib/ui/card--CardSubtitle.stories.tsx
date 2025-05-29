import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { CardSubtitle } from './card';

const meta: Meta<typeof CardSubtitle> = {
  component: CardSubtitle,
  title: 'Base/Card/Subtitle',
};
export default meta;
type Story = StoryObj<typeof CardSubtitle>;

export const Primary: Story = {
  args: {
    children: 'Welcome to CardSubtitle!',
  },
};

export const Heading: Story = {
  args: {
    children: 'Welcome to CardSubtitle!',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to CardSubtitle!/gi)).toBeTruthy();
  },
};
