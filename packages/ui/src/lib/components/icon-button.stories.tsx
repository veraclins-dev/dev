import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { IconButton } from './icon-button';

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  title: 'Components/IconButton',
};
export default meta;
type Story = StoryObj<typeof IconButton>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to IconButton!/gi)).toBeTruthy();
  },
};
