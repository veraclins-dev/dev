import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { DateField } from './date-field';

const meta: Meta<typeof DateField> = {
  component: DateField,
  title: 'Components/DateField',
};
export default meta;
type Story = StoryObj<typeof DateField>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DateField!/gi)).toBeTruthy();
  },
};
