import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { BaseButton } from './button';

const meta: Meta<typeof BaseButton> = {
  component: BaseButton,
  title: 'Components/Button/Base',
};
export default meta;
type Story = StoryObj<typeof BaseButton>;

export const Primary: Story = {
  args: {
    tooltip: 'This is a tooltip!',
    children: 'Click Me',
  },
};

export const Heading: Story = {
  args: {
    tooltip: 'Hello, this is a tooltip!',
    children: 'Welcome to BaseButton!',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to BaseButton!/gi)).toBeTruthy();
  },
};
