import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { CardFooter } from './card';

const meta: Meta<typeof CardFooter> = {
  component: CardFooter,
  title: 'Base/Card/Footer',
};
export default meta;
type Story = StoryObj<typeof CardFooter>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to CardFooter!/gi)).toBeTruthy();
  },
};
