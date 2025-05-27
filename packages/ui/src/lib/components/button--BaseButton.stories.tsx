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
    tooltip: '',
  },
};

export const Heading: Story = {
  args: {
    tooltip: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to BaseButton!/gi)).toBeTruthy();
  },
};
