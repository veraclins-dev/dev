import { useCallback } from 'react';

import { type RichEditor } from '../types';

export const useReturnFocus = ({ editor }: { editor: RichEditor }) => {
  const returnFocus = useCallback(() => {
    if (!editor) return;
    editor.commands.focus();
  }, [editor]);

  return returnFocus;
};
