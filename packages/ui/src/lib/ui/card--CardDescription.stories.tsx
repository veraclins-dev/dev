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
  args: {
    children: (
      <>
        <h1>Welcome to CardDescription!</h1>
        <p>This is a simple card description example.</p>
      </>
    ),
  },
};

export const Heading: Story = {
  args: {
    children: (
      <>
        <h1>Welcome to CardDescription!</h1>
        <p>This is a simple card description example.</p>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to CardDescription!/gi)).toBeTruthy();
  },
};
