import type { Preview } from '@storybook/react';
import React from 'react';

// @ts-expect-error - this is a local import
import { IconProvider } from '@veraclins-dev/ui';

// import href from '@veraclins-dev/ui/sprite.svg';
import '../src/tailwind.css';

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
