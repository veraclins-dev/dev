import { useExtensions } from './hooks';
import {
  RichTextReadOnly,
  type RichTextReadOnlyProps,
} from './rich-text-read-only';

export function EditorReadonly({
  content,
}: Omit<RichTextReadOnlyProps, 'extensions'>) {
  const extensions = useExtensions();

  return <RichTextReadOnly extensions={extensions} content={content ?? ''} />;
}
