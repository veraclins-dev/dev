import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { ButtonBase } from './button';
import { CardAction } from './card';

const meta: Meta<typeof CardAction> = {
  component: CardAction,
  title: 'Base/Card/Action',
};
export default meta;
type Story = StoryObj<typeof CardAction>;

export const Primary: Story = {
  args: {
    children: (
      <>
        <ButtonBase color={'secondary'} variant="outline">
          <span>Secondary Action</span>
        </ButtonBase>
        <ButtonBase color={'primary'} variant="solid">
          <span>Primary Action</span>
        </ButtonBase>
      </>
    ),
  },
};

export const Button: Story = {
  args: {
    children: (
      <ButtonBase color="primary" variant="soft">
        <span>Primary Action</span>
      </ButtonBase>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to CardAction!/gi)).toBeTruthy();
  },
};
