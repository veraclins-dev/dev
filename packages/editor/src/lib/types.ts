import { type Editor, type EditorOptions } from '@tiptap/react';

import { type ImageNodeAttributes } from './utils';

export type WithShortcuts = {
  /**
   * An array representing the set of keys that should be pressed to trigger
   * this action (for its keyboard shortcut), so that this can be displayed to
   * the user. If empty, no keyboard shortcut is displayed.
   *
   * Use the literal string "mod" to represent Cmd on Mac and Ctrl on Windows
   * and Linux.
   *
   * Example: ["mod", "Shift", "7"] is the array that should be provided as the
   * combination for toggling an ordered list.
   *
   * For the list of pre-configured Tiptap shortcuts, see
   * https://tiptap.dev/api/keyboard-shortcuts.
   */
  shortcutKeys?: string[];
};

export type RichEditor = Editor | null;

export type RichEditorOptions = EditorOptions;

export type OnUploadFiles = (files: File[]) => ImageNodeAttributes[];
