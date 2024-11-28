import {
  getText,
  getTextSerializersFromSchema,
  type NodeViewProps,
} from '@tiptap/core';
import { type Heading, type Level } from '@tiptap/extension-heading';
import { type Node as ProseMirrorNode } from '@tiptap/pm/model';
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import { useMemo } from 'react';
import { Icon } from '#app/components/ui/icon';
import { slugify } from '#app/utils/slugify.ts';

// Based on
// https://github.com/ueberdosis/tiptap/blob/c9eb6a6299796450c7c1cfdc3552d76070c78c65/packages/extension-heading/src/heading.ts#L41-L48
// We extend Record<string, unknown>, since we may inherit other global
// attributes as well, aligned with ProseMirrorNode.attrs typing.
export interface HeadingNodeAttributes extends Record<string, unknown> {
  level: Level;
}

interface HeadingNode extends ProseMirrorNode {
  attrs: HeadingNodeAttributes;
}

interface Props extends NodeViewProps {
  node: HeadingNode;
  extension: typeof Heading;
}

export function HeadingWithAnchorComponent({ editor, node, extension }: Props) {
  // Some of the logic here is based on the renderHTML definition from the
  // original Heading Node
  // (https://github.com/ueberdosis/tiptap/blob/c9eb6a6299796450c7c1cfdc3552d76070c78c65/packages/extension-heading/src/heading.ts#L58-L65)
  const hasLevel = extension.options.levels.includes(node.attrs.level);
  const level = hasLevel ? node.attrs.level : extension.options.levels[0];
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  // Create an anchor ID based on the text content of the header (like
  // GitHub/GitLab do). Note that we use Tiptap's `getText` rather than
  // `node.textContent` so that nodes like Mentions can produce text for this
  // purpose (see https://github.com/ueberdosis/tiptap/pull/1875 and
  // https://github.com/ueberdosis/tiptap/issues/1336 for instance)
  const textSerializers = useMemo(
    () => getTextSerializersFromSchema(editor.schema),
    [editor.schema],
  );
  const headingId = slugify(
    getText(node, {
      textSerializers: textSerializers,
    }),
  );

  return (
    <NodeViewWrapper
      as={HeadingTag}
      id={headingId}
      {...extension.options.HTMLAttributes}
      className="group"
      // Handle @tiptap/extension-text-align. Ideally we'd be able to inherit
      // this style from TextAlign's GlobalAttributes directly, but those are
      // only applied via `renderHTML` and not the `NodeView` renderer
      // (https://github.com/ueberdosis/tiptap/blob/6c34dec33ac39c9f037a0a72e4525f3fc6d422bf/packages/extension-text-align/src/text-align.ts#L43-L49),
      // so we have to do this manually/redundantly here.
      style={{ textAlign: node.attrs.textAlign }}
    >
      {/* We need a separate inner container here in order to (1) have the node
      view wrapper take up the full width of its parent div created by
      ReactNodeViewRender (so we can utilize text-align for its children
      elements), and (2) position the anchor link/icon relative to the *aligned*
      position of the inner text content, by having this inner container match
      the dimensions and location of the its content. */}
      <span className="relative inline-block">
        <a
          // eslint-disable-next-line remix-react-routes/use-link-for-routes
          href={`#${headingId}`}
          contentEditable={false}
          className="absolute -left-5 z-50 no-underline opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100"
        >
          <Icon name="link-2" className="md:text-lg" />
        </a>
        {/* This is the editable content of the header: */}
        <NodeViewContent as="span" />
      </span>
    </NodeViewWrapper>
  );
}
