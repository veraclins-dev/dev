import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { SelectScrollDownButton } from './select';

const meta: Meta<typeof SelectScrollDownButton> = {
  component: SelectScrollDownButton,
  title: 'Base/Select/ScrollDownButton',
};
export default meta;
type Story = StoryObj<typeof SelectScrollDownButton>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/Welcome to SelectScrollDownButton!/gi),
    ).toBeTruthy();
  },
};
