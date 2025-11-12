import {
  NodeViewContent,
  type NodeViewProps,
  NodeViewWrapper,
} from '@tiptap/react';

import { ComposedSelect } from '@veraclins-dev/ui';
import { cn } from '@veraclins-dev/utils';

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
    <NodeViewWrapper className={cn('relative p-3')}>
      {options.editable && (
        <ComposedSelect
          defaultValue={defaultLanguage}
          value={defaultLanguage}
          onValueChange={(value) => updateAttributes({ language: value })}
          options={[
            ...extension.options.lowlight
              .listLanguages()
              .map((lang) => ({ value: lang, label: lang })),
          ]}
          className="absolute right-2 top-2 border-0 px-2.5 py-0"
        />
      )}

      <pre className="py-4 px-2">
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
};
