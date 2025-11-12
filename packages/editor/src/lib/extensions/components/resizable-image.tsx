/* eslint-disable react-hooks/refs */
import { type NodeViewProps } from '@tiptap/core';
import { type Node as ProseMirrorNode } from '@tiptap/pm/model';
import { NodeViewWrapper } from '@tiptap/react';
import { useMemo, useRef } from 'react';

import { Box } from '@veraclins-dev/ui';
import { cn, throttle } from '@veraclins-dev/utils';

import { ResizableImageResizer } from '../components/resizable-image-resizer';

// Based on
// https://github.com/ueberdosis/tiptap/blob/ab4a0e2507b4b92c46d293a0bb06bb00a04af6e0/packages/extension-image/src/image.ts#L47-L59
// We extend Record<string, unknown>, since we may inherit other global
// attributes as well, aligned with ProseMirrorNode.attrs typing.
interface ImageNodeAttributes extends Record<string, unknown> {
  src?: string;
  alt?: string | null;
  title?: string | null;
}

interface ResizableImageNodeAttributes extends ImageNodeAttributes {
  width?: string | number | null;
  aspectRatio?: string | null;
}

interface ResizableImageNode extends ProseMirrorNode {
  attrs: ResizableImageNodeAttributes;
}

interface ResizableImageProps extends NodeViewProps {
  node: ResizableImageNode;
}

const IMAGE_MINIMUM_WIDTH_PIXELS = 15;

export function ResizableImageComponent({
  node,
  selected,
  editor: { isEditable },
  updateAttributes,
}: ResizableImageProps) {
  const { attrs } = node;

  const imageRef = useRef<HTMLImageElement | null>(null);

  const canResize = isEditable && selected;

  const handleResize = useMemo(
    () =>
      // Throttle our "on resize" handler, since the event fires very rapidly during
      // dragging, so rendering would end up stuttering a bit without a throttle
      throttle(
        (event: MouseEvent) => {
          if (!imageRef.current) {
            return;
          }

          const originalBoundingRect = imageRef.current.getBoundingClientRect();

          // Get the "width" and "height" of the resized image based on the user's
          // cursor position after movement, if we were to imagine a box drawn from
          // the top left corner of the image to their cursor. (clientX/Y and
          // getBoundingClientRect both reference positions relative to the viewport,
          // allowing us to use them to calculate the new "resized" image dimensions.)
          const resizedWidth = event.clientX - originalBoundingRect.x;
          const resizedHeight = event.clientY - originalBoundingRect.y;

          // We always preserve the original image aspect ratio, setting only the
          // `width` to a specific number upon resize (and leaving the `height` of the
          // `img` as "auto"). So to determine the new width, we'll take the larger of
          // (a) the new resized width after the user's latest drag resize movement,
          // (b) the width proportional to the new resized height given the image
          // aspect ratio, or (c) a minimum width to prevent mistakes. This is similar
          // to what Google Docs image resizing appears to be doing, which feels
          // intuitive.
          const resultantWidth = Math.max(
            resizedWidth,
            (originalBoundingRect.width / originalBoundingRect.height) *
              resizedHeight,
            // Set a minimum width, since any smaller is probably a mistake, and we
            // don't want images to get mistakenly shrunken below a size which makes
            // it hard to later select/resize the image
            IMAGE_MINIMUM_WIDTH_PIXELS,
          );

          updateAttributes({
            width: Math.round(resultantWidth),
          });
        },
        50,
        { trailing: true }, // Make sure our last event triggers a callback
      ),
    [updateAttributes],
  );

  return (
    <NodeViewWrapper
      style={{
        // Handle @tiptap/extension-text-align. Ideally we'd be able to inherit
        // this style from TextAlign's GlobalAttributes directly, but those are
        // only applied via `renderHTML` and not the `NodeView` renderer
        // (https://github.com/ueberdosis/tiptap/blob/6c34dec33ac39c9f037a0a72e4525f3fc6d422bf/packages/extension-text-align/src/text-align.ts#L43-L49),
        // so we have to do this manually/redundantly here.
        textAlign: attrs['textAlign'],
        width: '100%',
      }}
    >
      {/* We need a separate inner image container here in order to (1) have the
      node view wrapper take up the full width of its parent div created by
      ReactNodeViewRender (so we can utilize text-align for these children
      elements), and (2) still allow for this image container to take up exactly
      the size of the `img` being rendered, which allows for positioning the
      resize handle at the edge of the img. */}
      <Box display="inline-block" className="relative inline-block my-8">
        <img
          ref={imageRef}
          src={attrs.src}
          height="auto"
          width={attrs.width ? attrs.width : undefined}
          {...{
            alt: attrs.alt || undefined,

            title: attrs.title || undefined,
          }}
          className={cn('block my-0!', {
            // For consistency with the standard Image extension selection
            // class/UI:
            // We'll only show the outline when the editor content is selected
            'ProseMirror-selectednode outline-4 outline-primary': canResize,
          })}
          style={{
            // If no width has been specified, we use auto max-width
            maxWidth: attrs.width ? undefined : 'auto',
            // Always specify the aspect-ratio if it's been defined, to improve
            // initial render (so auto-height works before the image loads)
            aspectRatio: attrs.aspectRatio ?? undefined,
          }}
          // To make this image act as the drag handle for moving it within the
          // document, add the data-drag-handle used by Tiptap
          // (https://tiptap.dev/guide/node-views/react#dragging)
          data-drag-handle
          // When the image loads, we'll update our width and aspect-ratio based
          // on the image's natural size, if they're not set. That way, all future
          // renders will know the image width/height prior to load/render,
          // preventing flashing
          onLoad={(event) => {
            const newAttributes: Partial<ResizableImageNodeAttributes> = {};
            if (!attrs.width) {
              newAttributes.width = event.currentTarget.naturalWidth;
            }
            if (!attrs.aspectRatio) {
              newAttributes.aspectRatio = String(
                event.currentTarget.naturalWidth /
                  event.currentTarget.naturalHeight,
              );
            }
            if (newAttributes.width || newAttributes.aspectRatio) {
              updateAttributes(newAttributes);
            }
          }}
        />

        {canResize && <ResizableImageResizer onResize={handleResize} />}
      </Box>
    </NodeViewWrapper>
  );
}
