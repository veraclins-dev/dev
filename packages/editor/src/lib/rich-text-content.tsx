import { EditorContent } from '@tiptap/react';

import { Box } from '@veraclins-dev/ui';
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
    <Box
      py={readonly ? 2 : undefined}
      className={cn(
        readonly
          ? 'readonly-editor'
          : 'rounded-lg h-full rounded-t-none overflow-y-auto',
        className,
      )}
      data-testid={
        readonly ? 'rich-text-content-readonly' : 'rich-text-content'
      }
    >
      <EditorContent editor={editor} />
    </Box>
  );
}
