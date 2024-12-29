import { useExtensions, type UseExtensionsOptions } from './hooks';
import {
  RichTextReadOnly,
  type RichTextReadOnlyProps,
} from './rich-text-read-only';

export function EditorReadonly({
  content,
  mentionPath,
}: Omit<RichTextReadOnlyProps, 'extensions'> &
  Pick<UseExtensionsOptions, 'mentionPath'>) {
  const extensions = useExtensions({ mentionPath });

  return <RichTextReadOnly extensions={extensions} content={content ?? ''} />;
}
