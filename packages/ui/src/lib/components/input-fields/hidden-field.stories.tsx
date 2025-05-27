import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { HiddenField } from './hidden-field';

const meta: Meta<typeof HiddenField> = {
  component: HiddenField,
  title: 'Components/HiddenField',
};
export default meta;
type Story = StoryObj<typeof HiddenField>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to HiddenField!/gi)).toBeTruthy();
  },
};
