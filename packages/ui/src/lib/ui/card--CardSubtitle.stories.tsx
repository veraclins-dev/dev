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
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to CardSubtitle!/gi)).toBeTruthy();
  },
};
