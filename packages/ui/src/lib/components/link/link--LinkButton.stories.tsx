import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { LinkButton } from './link';

const meta: Meta<typeof LinkButton> = {
  component: LinkButton,
  title: 'LinkButton',
};
export default meta;
type Story = StoryObj<typeof LinkButton>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to LinkButton!/gi)).toBeTruthy();
  },
};
