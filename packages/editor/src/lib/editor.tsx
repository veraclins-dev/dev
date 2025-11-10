import { useCallback, useEffect, useRef } from 'react';

import { EditorMenuControls } from './controls';
import { useExtensions, type UseExtensionsOptions } from './hooks';
import { LinkBubbleMenu } from './link-bubble-menu';
import {
  RichTextEditor,
  type RichTextEditorProps,
  type RichTextEditorRef,
} from './rich-text-editor';
import { TableBubbleMenu } from './table-bubble-menu';
import { type OnUploadFiles, type RichEditorOptions } from './types';
import { insertImages } from './utils';

function fileListToImageFiles(fileList: FileList): File[] {
  // You may want to use a package like attr-accept
  // (https://www.npmjs.com/package/attr-accept) to restrict to certain file
  // types.
  return Array.from(fileList).filter((file) => {
    const mimeType = (file.type || '').toLowerCase();
    return mimeType.startsWith('image/');
  });
}

export type EditorProps = {
  content?: string;
  onChange?: (content: string) => void;
  className?: string;
  onUploadFiles?: OnUploadFiles;
  attributes?: Record<string, string>;
  shouldReset?: boolean;
} & Pick<RichTextEditorProps, 'immediatelyRender'> &
  UseExtensionsOptions;

export function Editor({
  content,
  onChange,
  placeholder,
  className,
  onUploadFiles,
  mentionPath,
  suggestionFilter,
  shouldReset,
  ...editorProps
}: EditorProps) {
  const extensions = useExtensions({
    placeholder: placeholder ?? 'Add your own content here...',
    mentionPath,
    suggestionFilter,
  });
  const rteRef = useRef<RichTextEditorRef>(null);

  const handleNewImageFiles = useCallback(
    (files: File[], insertPosition?: number): void => {
      if (!rteRef.current?.editor) {
        return;
      }

      // For the sake of a demo, we don't have a server to upload the files to,
      // so we'll instead convert each one to a local "temporary" object URL.
      // This will not persist properly in a production setting. You should
      // instead upload the image files to your server, or perhaps convert the
      // images to bas64 if you would like to encode the image data directly
      // into the editor content, though that can make the editor content very
      // large. You will probably want to use the same upload function here as
      // for the MenuButtonImageUpload `onUploadFiles` prop.
      const attributesForImageFiles = onUploadFiles
        ? onUploadFiles(files)
        : files.map((file) => ({
            src: URL.createObjectURL(file),
            alt: file.name,
          }));

      insertImages({
        images: attributesForImageFiles,
        editor: rteRef.current.editor,
        position: insertPosition,
      });
    },
    [onUploadFiles],
  );

  // Allow for dropping images into the editor
  const handleDrop: NonNullable<
    RichEditorOptions['editorProps']['handleDrop']
  > = useCallback(
    (view, event, _slice, _moved) => {
      if (!(event instanceof DragEvent) || !event.dataTransfer) {
        return false;
      }

      const imageFiles = fileListToImageFiles(event.dataTransfer.files);
      if (imageFiles.length > 0) {
        const insertPosition = view.posAtCoords({
          left: event.clientX,
          top: event.clientY,
        })?.pos;

        handleNewImageFiles(imageFiles, insertPosition);

        // Return true to treat the event as handled. We call preventDefault
        // ourselves for good measure.
        event.preventDefault();
        return true;
      }

      return false;
    },
    [handleNewImageFiles],
  );

  // Allow for pasting images
  const handlePaste: NonNullable<
    RichEditorOptions['editorProps']['handlePaste']
  > = useCallback(
    (_view, event, _slice) => {
      if (!event.clipboardData) {
        return false;
      }

      const pastedImageFiles = fileListToImageFiles(event.clipboardData.files);
      if (pastedImageFiles.length > 0) {
        handleNewImageFiles(pastedImageFiles);
        // Return true to mark the paste event as handled. This can for
        // instance prevent redundant copies of the same image showing up,
        // like if you right-click and copy an image from within the editor
        // (in which case it will be added to the clipboard both as a file and
        // as HTML, which Tiptap would otherwise separately parse.)
        return true;
      }

      // We return false here to allow the standard paste-handler to run.
      return false;
    },
    [handleNewImageFiles],
  );

  useEffect(() => {
    queueMicrotask(() => {
      if (content && shouldReset) {
        rteRef.current?.editor?.commands.setContent('');
      }
    });
  }, [shouldReset]);

  return (
    <RichTextEditor
      ref={rteRef}
      extensions={extensions}
      content={content ?? ''}
      editable
      editorProps={{ ...editorProps, handleDrop, handlePaste }}
      renderControls={() => <EditorMenuControls />}
      onBlur={({ editor }) => {
        onChange?.(editor.getHTML());
      }}
      className={className}
    >
      {() => (
        <>
          <LinkBubbleMenu />
          <TableBubbleMenu />
        </>
      )}
    </RichTextEditor>
  );
}
