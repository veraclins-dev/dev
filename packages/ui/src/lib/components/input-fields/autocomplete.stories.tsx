import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { Autocomplete } from './autocomplete';

const meta: Meta<typeof Autocomplete> = {
  component: Autocomplete,
  title: 'Components/Autocomplete',
  parameters: {
    docs: {
      story: {
        height: '250px',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Autocomplete>;

export const Primary: Story = {
  args: {
    options: [
      { label: 'Option 1', value: 'Option 1' },
      { label: 'Option 2', value: 'Option 2' },
      { label: 'Option 3', value: 'Option 3' },
      { label: 'Option 4', value: 'Option 4' },
      { label: 'Option 5', value: 'Option 5' },
      { label: 'Option 6', value: 'Option 6' },
      { label: 'Option 7', value: 'Option 7' },
      { label: 'Option 8', value: 'Option 8' },
      { label: 'Option 9', value: 'Option 9' },
      { label: 'Option 10', value: 'Option 10' },
      { label: 'Option 11', value: 'Option 11' },
      { label: 'Another Option', value: 'Another Option' },
      { label: 'Yet Another Option', value: 'Yet Another Option' },
      { label: 'One More Option', value: 'One More Option' },
    ],
    multiple: true,
  },
};

export const Single: Story = {
  args: {
    options: [
      { label: 'Option 1', value: 'Option 1' },
      { label: 'Option 2', value: 'Option 2' },
      { label: 'Option 3', value: 'Option 3' },
      { label: 'Option 4', value: 'Option 4' },
      { label: 'Option 5', value: 'Option 5' },
      { label: 'Option 6', value: 'Option 6' },
      { label: 'Option 7', value: 'Option 7' },
      { label: 'Option 8', value: 'Option 8' },
      { label: 'Option 9', value: 'Option 9' },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Autocomplete!/gi)).toBeTruthy();
  },
};

export const FreeSolo: Story = {
  args: {
    options: [
      { label: 'Option 1', value: 'Option 1' },
      { label: 'Option 2', value: 'Option 2' },
      { label: 'Option 3', value: 'Option 3' },
    ],
    freeSolo: true,
  },
};

export const FreeSoloMultiple: Story = {
  args: {
    options: [],
    freeSolo: true,
    multiple: true,
  },
};
