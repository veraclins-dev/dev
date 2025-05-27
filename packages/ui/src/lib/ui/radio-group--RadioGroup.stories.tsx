import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { RadioGroup } from './radio-group';

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
  title: 'Base/RadioGroup/Root',
};
export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to RadioGroup!/gi)).toBeTruthy();
  },
};
