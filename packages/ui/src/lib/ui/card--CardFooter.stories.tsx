import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { ButtonBase } from './button';
import { CardFooter } from './card';

const meta: Meta<typeof CardFooter> = {
  component: CardFooter,
  title: 'Base/Card/Footer',
};
export default meta;
type Story = StoryObj<typeof CardFooter>;

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

export const Heading: Story = {
  args: {
    children: (
      <ButtonBase color={'primary'} variant="solid">
        <span>Primary Action</span>
      </ButtonBase>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to CardFooter!/gi)).toBeTruthy();
  },
};
