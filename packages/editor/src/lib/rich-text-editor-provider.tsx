import { type Editor } from '@tiptap/react';
import { createContext, useContext } from 'react';

export const RichTextEditorContext = createContext<Editor | null | undefined>(
  undefined,
);

export function useRichTextEditorContext(): Editor | null {
  const editor = useContext(RichTextEditorContext);
  if (editor === undefined) {
    throw new Error(
      'Tiptap editor not found in component context. Be sure to use <RichTextEditorProvider editor={editor} />!',
    );
  }

  return editor;
}

export type RichTextEditorProviderProps = Readonly<{
  editor: Editor | null;
  children: React.ReactNode;
}>;

/**
 * Makes the Tiptap `editor` available to any nested components, via the
 * `useRichTextEditorContext()` hook so that the `editor` does not need to be
 * manually passed in at every level.
 *
 * Required as a parent for most mui-tiptap components besides the all-in-one
 * `RichTextEditor` and `RichTextReadOnly`.
 */

export function RichTextEditorProvider({
  editor,
  children,
}: RichTextEditorProviderProps) {
  return (
    <RichTextEditorContext.Provider value={editor}>
      {children}
    </RichTextEditorContext.Provider>
  );
}
