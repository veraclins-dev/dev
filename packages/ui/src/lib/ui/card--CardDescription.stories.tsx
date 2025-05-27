import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { CardDescription } from './card';

const meta: Meta<typeof CardDescription> = {
  component: CardDescription,
  title: 'Base/Card/Description',
};
export default meta;
type Story = StoryObj<typeof CardDescription>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to CardDescription!/gi)).toBeTruthy();
  },
};
