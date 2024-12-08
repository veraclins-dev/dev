import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Link } from './link';

const meta: Meta<typeof Link> = {
  component: Link,
  title: 'Link',
};
export default meta;
type Story = StoryObj<typeof Link>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Link!/gi)).toBeTruthy();
  },
};
