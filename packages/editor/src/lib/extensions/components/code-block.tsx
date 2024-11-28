import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import React from 'react';
import { Select } from '#app/components/ui/select/select';

interface Props {
  node: {
    attrs: { language: string };
  };
  updateAttributes: (attrs: { language: string }) => void;
  extension: {
    options: {
      lowlight: {
        listLanguages: () => string[];
      };
    };
  };
}

export const CodeBlock: React.FC<Props> = ({
  node: {
    attrs: { language: defaultLanguage = 'css' },
  },
  updateAttributes,
  extension,
}) => (
  <NodeViewWrapper className="relative p-1.5">
    <Select
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

    <pre>
      <NodeViewContent as="code" />
    </pre>
  </NodeViewWrapper>
);
