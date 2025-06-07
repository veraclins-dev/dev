import { type Editor, getMarkRange, getMarkType } from '@tiptap/core';
import { type ReactNode } from 'react';

import { Button } from '@veraclins-dev/ui';
import { truncate, truncateMiddle } from '@veraclins-dev/utils';

import useKeyDown from '../hooks/useKeyDown';

export type ViewLinkMenuContentProps = {
  editor: Editor;
  onCancel: () => void;
  onEdit: () => void;
  onRemove: () => void;
  /** Override default text content/labels used within the component. */
  labels?: {
    /** Content shown in the button used to start editing the link. */
    viewLinkEditButtonLabel?: ReactNode;
    /** Content shown in the button used to remove the link. */
    viewLinkRemoveButtonLabel?: ReactNode;
  };
};

/** Shown when a user is viewing the details of an existing Link for Tiptap. */
export function ViewLinkMenuContent({
  editor,
  onCancel,
  onEdit,
  onRemove,
  labels,
}: ViewLinkMenuContentProps) {
  const linkRange = getMarkRange(
    editor.state.selection.$to,
    getMarkType('link', editor.schema),
  );
  const linkText = linkRange
    ? editor.state.doc.textBetween(linkRange.from, linkRange.to)
    : '';

  const currentHref =
    (editor.getAttributes('link')['href'] as string | undefined) ?? '';

  // If the user presses escape, we should cancel
  useKeyDown('Escape', onCancel);

  return (
    <div className="flex flex-col gap-y-3">
      <div className="text-pretty">{truncate(linkText, 38)}</div>

      <div className="text-pretty">
        <a
          href={currentHref}
          target="_blank"
          rel="noopener noreferrer"
          // className="hover:text-primary/80 text-primary hover:underline"
        >
          {/* We truncate in the middle, since the beginning and end of a URL are often the most
            important parts */}
          {truncateMiddle(currentHref, 38)}
        </a>
      </div>
      <div className="flex w-full justify-end gap-x-3">
        <Button
          onClick={onEdit}
          variant="soft"
          color="primary"
          className="rounded-md px-3 py-1"
        >
          {labels?.viewLinkEditButtonLabel ?? 'Edit'}
        </Button>
        <Button
          className="px-3 py-1 "
          color="destructive"
          variant="outline"
          onClick={onRemove}
        >
          Remove
        </Button>
      </div>
    </div>
  );
}
