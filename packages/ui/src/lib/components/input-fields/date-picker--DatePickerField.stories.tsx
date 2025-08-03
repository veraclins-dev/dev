import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { DatePickerField } from './date-picker';

const meta: Meta<typeof DatePickerField> = {
  component: DatePickerField,
  title: 'Components/DatePicker/DatePickerField',
};
export default meta;
type Story = StoryObj<typeof DatePickerField>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DatePickerField!/gi)).toBeTruthy();
  },
};
