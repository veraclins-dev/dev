import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { DividerWithText } from './divider';

const meta: Meta<typeof DividerWithText> = {
  component: DividerWithText,
  title: 'Components/Divider/WithText',
};
export default meta;
type Story = StoryObj<typeof DividerWithText>;

export const Primary: Story = {
  args: {
    text: 'hello',
  },
};

export const Heading: Story = {
  args: {
    text: 'or',
    orientation: 'vertical',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DividerWithText!/gi)).toBeTruthy();
  },
};
