import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { DateRangePickerField } from './date-picker';

const meta: Meta<typeof DateRangePickerField> = {
  component: DateRangePickerField,
  title: 'Components/DatePicker/DateRangePickerField',
};
export default meta;
type Story = StoryObj<typeof DateRangePickerField>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DateRangePickerField!/gi)).toBeTruthy();
  },
};
