import type { Preview } from '@storybook/react';

import '../src/styles.css';

import { IconProvider } from '../src';
export const tags = ['autodocs'];

const preview: Preview = {
  decorators: [
    // 👇 Defining the decorator in the preview file applies it to all stories
    (Story) => {
      return (
        <IconProvider sprite="/icons/sprite.svg">
          <Story />
        </IconProvider>
      );
    },
  ],
};

export default preview;
