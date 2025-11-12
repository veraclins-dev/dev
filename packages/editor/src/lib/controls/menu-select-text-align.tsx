import { type TextAlignOptions } from '@tiptap/extension-text-align';
import { useCallback, useMemo } from 'react';
import { type Except } from 'type-fest';

import { useReturnFocus } from '../hooks/use-editor-focus';
import { useRichTextEditorContext } from '../rich-text-editor-provider';

import {
  type MenuSelectIconProps,
  MenuSelectIcons,
  type Option,
} from './menu-select-icons';

type Value = 'left' | 'center' | 'right' | 'justify';

export type MenuSelectTextAlignProps = Except<
  MenuSelectIconProps,
  'children' | 'options' | 'onClose' | 'grouped'
> & {
  /**
   * What to render in the Select when the highlighted content is currently
   * using multiple different text-alignments (so no one icon applies). By
   * default renders as blank (similar to Microsoft Word and Google Docs do for
   * font size, for instance).
   */
  emptyLabel?: React.ReactNode;
};

const options: Option[] = [
  {
    value: 'left',
    label: 'Left',
    shortcutKeys: ['mod', 'Shift', 'L'],
    icon: 'text-align-left',
  },
  {
    value: 'center',
    label: 'Center',
    shortcutKeys: ['mod', 'Shift', 'E'],
    icon: 'text-align-center',
  },
  {
    value: 'right',
    label: 'Right',
    shortcutKeys: ['mod', 'Shift', 'R'],
    icon: 'text-align-right',
  },
  {
    value: 'justify',
    label: 'Justify',
    shortcutKeys: ['mod', 'Shift', 'J'],
    icon: 'text-align-justify',
  },
];

export function MenuSelectTextAlign({
  emptyLabel: _emptyLabel = '',
  ...menuSelectProps
}: MenuSelectTextAlignProps) {
  const editor = useRichTextEditorContext();
  const returnFocus = useReturnFocus({ editor });
  const handleAlignmentSelect: (value: Value) => void = useCallback(
    (value) => {
      editor?.chain().focus().setTextAlign(value).run();
    },
    [editor],
  );

  // Figure out which settings the user has enabled with the heading extension
  const textAlignExtensionOptions = useMemo(() => {
    const textAlignExtension = editor?.extensionManager.extensions.find(
      (extension) => extension.name === 'textAlign',
    );
    return textAlignExtension?.options as TextAlignOptions | undefined;
  }, [editor]);

  const enabledAlignments: Set<TextAlignOptions['alignments'][0]> =
    useMemo(() => {
      return new Set(textAlignExtensionOptions?.alignments);
    }, [textAlignExtensionOptions]);

  // Only set the Select `value` as non-empty if all alignments are the same
  // (which we'll know if `isActive({ textAlign: alignment })` returns true).
  // This allows the user to change all current selected nodes' alignments to
  // any alignment, including the default alignment. If we instead set the
  // `value` as the default for instance, attempting to change multiple node's
  // alignments to that default would not work (not triggering "onChange").
  const selectedValue =
    Array.from(enabledAlignments).find((alignment) =>
      editor?.isActive({ textAlign: alignment }),
    ) ?? '';

  return (
    <MenuSelectIcons
      onValueChange={handleAlignmentSelect}
      disabled={
        !editor?.isEditable ||
        !Array.from(enabledAlignments).some((alignment) =>
          editor.can().setTextAlign(alignment),
        )
      }
      options={options}
      aria-label="Text alignments"
      tooltip="Align"
      value={selectedValue}
      {...menuSelectProps}
      onClose={returnFocus}
    />
  );
}
