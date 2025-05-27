import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { StatusButton } from './status-button';

const meta: Meta<typeof StatusButton> = {
  component: StatusButton,
  title: 'Base/StatusButton',
};
export default meta;
type Story = StoryObj<typeof StatusButton>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to StatusButton!/gi)).toBeTruthy();
  },
};
