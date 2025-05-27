import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { SelectGroup } from './select';

const meta: Meta<typeof SelectGroup> = {
  component: SelectGroup,
  title: 'Base/Select/Group',
};
export default meta;
type Story = StoryObj<typeof SelectGroup>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to SelectGroup!/gi)).toBeTruthy();
  },
};
