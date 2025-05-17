import {
  NodeViewContent,
  type NodeViewProps,
  NodeViewWrapper,
} from '@tiptap/react';

import { ComposedSelect } from '@veraclins-dev/ui';

interface Props extends NodeViewProps {
  node: NodeViewProps['node'] & {
    attrs: { language?: string };
  };
  updateAttributes: (attrs: { language?: string }) => void;
  extension: Omit<NodeViewProps['extension'], 'options'> & {
    options: {
      lowlight: {
        listLanguages: () => string[];
      };
    };
  };
}

export const CodeBlock = ({
  node: {
    attrs: { language: defaultLanguage = 'css' },
  },
  updateAttributes,
  extension,
  editor: { options },
}: Props) => {
  return (
    <NodeViewWrapper className="relative p-1.5">
      {options.editable && (
        <ComposedSelect
          defaultValue={defaultLanguage}
          value={defaultLanguage}
          onValueChange={(value) => updateAttributes({ language: value })}
          options={[
            ...extension.options.lowlight
              .listLanguages()
              .map((lang, index) => ({ value: lang, label: lang })),
          ]}
          className="absolute right-2 top-2 border border-border px-2.5 py-2"
        />
      )}

      <pre>
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
};
