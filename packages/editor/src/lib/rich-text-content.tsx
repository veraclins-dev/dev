import { EditorContent } from '@tiptap/react';

import { cn } from '@veraclins-dev/utils';

import { useRichTextEditorContext } from './rich-text-editor-provider';

export type RichTextContentProps = {
  /** Optional additional className to provide to the root element. */
  className?: string;
  readonly?: boolean;
};

/**
 * A component for rendering a MUI-styled version of Tiptap rich text editor
 * content.
 *
 * Must be a child of the RichTextEditorProvider so that the `editor` context is
 * available.
 */
export function RichTextContent({ className, readonly }: RichTextContentProps) {
  const editor = useRichTextEditorContext();

  return (
    <div
      className={cn(
        readonly
          ? 'readonly-editor'
          : 'h-full rounded-lg rounded-t-none px-3 py-2 overflow-y-auto',

        className,
      )}
      data-testid={
        readonly ? 'rich-text-content-readonly' : 'rich-text-content'
      }
    >
      <EditorContent editor={editor} />
    </div>
  );
}
