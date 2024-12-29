import {
  NodeViewContent,
  type NodeViewProps,
  NodeViewWrapper,
} from '@tiptap/react';

import { Checkbox, type CheckboxProps } from '@veraclins-dev/ui';

type Props = NodeViewProps;

export const TaskItem = ({
  updateAttributes,
  node: { attrs },
  editor: { isEditable },
}: Props) => {
  const onChange: CheckboxProps['onCheckedChange'] = (checked) => {
    if (!isEditable) {
      return;
    }

    updateAttributes({
      checked,
    });
  };
  return (
    <NodeViewWrapper className="flex py-1 gap-2" as="li">
      <Checkbox {...attrs} onCheckedChange={onChange} disabled={!isEditable} />
      <NodeViewContent as="div" />
    </NodeViewWrapper>
  );
};
