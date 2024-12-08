import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { LinkWithRedirect } from './link';

const meta: Meta<typeof LinkWithRedirect> = {
  component: LinkWithRedirect,
  title: 'LinkWithRedirect',
};
export default meta;
type Story = StoryObj<typeof LinkWithRedirect>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to LinkWithRedirect!/gi)).toBeTruthy();
  },
};
