import { type Level } from '@tiptap/extension-heading';
import { type Editor } from '@tiptap/react';
import {
  MenuSelect,
  type Option,
} from '#app/components/rich-editor/controls/menu-select';
import { useRichTextEditorContext } from '#app/components/rich-editor/rich-text-editor-provider';
import { getAttributesForEachSelected } from '../utils/get-attributes-for-each-selected.ts';

type headingValue = `heading-${Level}`;

type Value = headingValue | 'paragraph';

interface TextOptions extends Option {
  value: Value;
}

type ActiveValue = Value | '';

const HEADING_OPTION_VALUES: Record<Value, Value> = {
  paragraph: 'paragraph',
  'heading-1': 'heading-1',
  'heading-2': 'heading-2',
  'heading-3': 'heading-3',
  'heading-4': 'heading-4',
  'heading-5': 'heading-5',
  'heading-6': 'heading-6',
} as const;

const LEVEL_TO_HEADING_OPTION_VALUE: Record<Level, Value> = {
  1: 'heading-1',
  2: 'heading-2',
  3: 'heading-3',
  4: 'heading-4',
  5: 'heading-5',
  6: 'heading-6',
} as const;

export function getActive(editor: Editor): ActiveValue {
  let selectedValue: ActiveValue = '';
  if (editor?.isActive('paragraph')) {
    selectedValue = HEADING_OPTION_VALUES.paragraph;
  } else if (editor?.isActive('heading')) {
    const currentNodeHeadingAttributes = getAttributesForEachSelected(
      editor.state,
      'heading',
    );
    const currentNodeLevels = currentNodeHeadingAttributes.map(
      (attrs) => attrs.level as Level | undefined,
    );

    const numCurrentNodeLevels = new Set(currentNodeLevels).size;
    // We only want to show a selected level value if all of the selected nodes
    // have the same level. (That way a user can properly change the level when
    // selecting across two separate headings, and so we don't mistakenly just
    // show the first of the selected nodes' levels and not allow changing all
    // selected to that heading level. See
    // https://github.com/ueberdosis/tiptap/issues/3481.)
    const level = numCurrentNodeLevels === 1 ? currentNodeLevels[0] : undefined;
    if (level && level in LEVEL_TO_HEADING_OPTION_VALUE) {
      selectedValue = LEVEL_TO_HEADING_OPTION_VALUE[level];
    }
  }
  return selectedValue;
  // switch (true) {
  // 	case editor.isActive('paragraph'): {
  // 		return 'paragraph'
  // 	}
  // 	case editor.isActive('heading', { level: 1 }): {
  // 		return 'heading-1'
  // 	}
  // 	case editor.isActive('heading', { level: 2 }): {
  // 		return 'heading-2'
  // 	}
  // 	case editor.isActive('heading', { level: 3 }): {
  // 		return 'heading-3'
  // 	}
  // 	case editor.isActive('heading', { level: 4 }): {
  // 		return 'heading-4'
  // 	}
  // 	case editor.isActive('heading', { level: 5 }): {
  // 		return 'heading-5'
  // 	}
  // 	case editor.isActive('heading', { level: 6 }): {
  // 		return 'heading-6'
  // 	}
  // 	default: {
  // 		return ''
  // 	}
  // }
}

const textOptions: TextOptions[] = [
  {
    label: 'Normal text',
    value: 'paragraph',
    shortcutKeys: ['mod', 'Alt', '0'],
  },
  {
    label: 'Heading 1',
    value: 'heading-1',
    className: 'text-4xl',
    shortcutKeys: ['mod', 'Alt', '1'],
  },
  {
    label: 'Heading 2',
    value: 'heading-2',
    className: 'text-3xl',
    shortcutKeys: ['mod', 'Alt', '2'],
  },
  {
    label: 'Heading 3',
    value: 'heading-3',
    className: 'text-2xl',
    shortcutKeys: ['mod', 'Alt', '3'],
  },
  {
    label: 'Heading 4',
    value: 'heading-4',
    className: 'text-xl',
    shortcutKeys: ['mod', 'Alt', '4'],
  },
  {
    label: 'Heading 5',
    value: 'heading-5',
    className: 'text-lg',
    shortcutKeys: ['mod', 'Alt', '5'],
  },
  {
    label: 'Heading 6',
    value: 'heading-6',
    className: 'text-base',
    shortcutKeys: ['mod', 'Alt', '6'],
  },
];

export const MenuSelectHeading = () => {
  const editor = useRichTextEditorContext();
  if (!editor) {
    return null;
  }

  const handleValueChange = (value: Value) => {
    if (value === 'paragraph') {
      editor.chain().focus().setParagraph().run();
    } else if (value.includes('heading')) {
      editor
        .chain()
        .setHeading({ level: parseInt(value.split('-')[1]) as Level })
        .focus()
        .run();
    }
  };

  const active = getActive(editor);
  console.log('active', { active });
  const isCurrentlyParagraphOrHeading = active !== '';
  const canSetParagraph = editor?.can().setParagraph();
  // We have to pass a level when running `can`, so this is just an arbitrary one
  const canSetHeading = editor?.can().setHeading({ level: 1 });
  return (
    <MenuSelect
      value={active}
      onValueChange={handleValueChange}
      className="w-24"
      options={textOptions}
      tooltip="Text style"
      disabled={
        !editor?.isEditable ||
        !(isCurrentlyParagraphOrHeading || canSetParagraph || canSetHeading)
      }
    />
  );
};
