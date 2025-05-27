import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { PhoneField } from './phone-field';

const meta: Meta<typeof PhoneField> = {
  component: PhoneField,
  title: 'Components/PhoneField',
};
export default meta;
type Story = StoryObj<typeof PhoneField>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to PhoneField!/gi)).toBeTruthy();
  },
};
