import { getMarkRange, getMarkType, type Editor } from '@tiptap/core';
import truncate from 'lodash.truncate';
import { type ReactNode } from 'react';
import { Button } from '#app/components/button';
import { Link } from '#app/components/link';
import useKeyDown from '#app/hooks/useKeyDown.ts';
import { truncateMiddle } from '@veraclins-dev/utils';

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
    (editor.getAttributes('link').href as string | undefined) ?? '';

  // If the user presses escape, we should cancel
  useKeyDown('Escape', onCancel);

  return (
    <div className="flex flex-col gap-y-2">
      <div className="text-pretty">
        {truncate(linkText, {
          length: 38,
          omission: '…',
        })}
      </div>

      <div className="text-pretty">
        <Link
          to={currentHref}
          target="_blank"
          rel="noopener"
          className="hover:brand-light-purple text-primary hover:underline"
        >
          {/* We truncate in the middle, since the beginning and end of a URL are often the most
            important parts */}
          {truncateMiddle(currentHref, 38)}
        </Link>
      </div>
      <div className="flex justify-end gap-x-2">
        <Button
          onClick={onEdit}
          // variant="outline"
          className="rounded-md px-3 py-1"
        >
          {labels?.viewLinkEditButtonLabel ?? 'Edit'}
        </Button>
        <Button
          className="rounded-md border border-brand-red bg-brand-red px-3 py-1 text-brand-white hover:bg-brand-red md:bg-transparent md:text-foreground"
          variant="outline"
          onClick={onRemove}
        >
          Remove
        </Button>
      </div>
    </div>
  );
}
