import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { LinkButtonWithRedirect } from './link';

const meta: Meta<typeof LinkButtonWithRedirect> = {
  component: LinkButtonWithRedirect,
  title: 'LinkButtonWithRedirect',
};
export default meta;
type Story = StoryObj<typeof LinkButtonWithRedirect>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/Welcome to LinkButtonWithRedirect!/gi),
    ).toBeTruthy();
  },
};
