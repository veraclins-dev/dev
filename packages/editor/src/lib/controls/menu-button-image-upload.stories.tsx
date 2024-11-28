import type { Meta, StoryObj } from '@storybook/react';
import { MenuButtonImageUpload } from './menu-button-image-upload';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MenuButtonImageUpload> = {
  component: MenuButtonImageUpload,
  title: 'MenuButtonImageUpload',
  argTypes: {
    onUploadFiles: { action: 'onUploadFiles executed!' },
    insertImages: { action: 'insertImages executed!' },
  },
};
export default meta;
type Story = StoryObj<typeof MenuButtonImageUpload>;

export const Primary = {
  args: {
    inputProps: '',
  },
};

export const Heading: Story = {
  args: {
    inputProps: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/Welcome to MenuButtonImageUpload!/gi),
    ).toBeTruthy();
  },
};
