import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { SelectScrollUpButton } from './select';

const meta: Meta<typeof SelectScrollUpButton> = {
  component: SelectScrollUpButton,
  title: 'Base/Select/ScrollUpButton',
};
export default meta;
type Story = StoryObj<typeof SelectScrollUpButton>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to SelectScrollUpButton!/gi)).toBeTruthy();
  },
};
