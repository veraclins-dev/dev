import { FieldContainer } from '#app/components/rich-editor/field-container';
import {
  MenuBar,
  type MenuBarProps,
} from '#app/components/rich-editor/menu-bar';
import {
  RichTextContent,
  type RichTextContentProps,
} from '#app/components/rich-editor/rich-text-content';
import { useRichTextEditorContext } from '#app/components/rich-editor/rich-text-editor-provider';
import { DebounceRender } from '#app/components/rich-editor/utils/debounced-render';
import useDebouncedFocus from '#app/hooks/useDebouncedFocus.ts';

export type RichTextFieldProps = {
  className?: string;
  /**
   * Whether the outlined field should appear as disabled. Typically the
   * editor's `editable` field would also be set to `false` when setting this to
   * true.
   */
  disabled?: boolean;
  /**
   * Override any props for the child MenuBar component (rendered if `controls`
   * is provided).
   */
  MenuBarProps?: Partial<MenuBarProps>;
  /**
   * Override any props for the child RichTextContent component.
   */
  RichTextContentProps?: Partial<RichTextContentProps>;
  /**
   * The controls content to show inside the menu bar. Typically will be set to
   * a <MenuControlsContainer> containing several MenuButton* components,
   * depending on what controls you want to include in the menu bar (and what
   * extensions you've enabled).
   */
  controls?: React.ReactNode;
};

/**
 * Renders the Tiptap rich text editor content and a controls menu bar.
 *
 * With the "outlined" variant, renders a bordered UI similar to the Material UI
 * `TextField`. The "standard" variant does not have an outline/border.
 *
 * Must be a child of the RichTextEditorProvider so that the `editor` context is
 * available.
 */
export function RichTextField({
  disabled,
  className,
  MenuBarProps,
  RichTextContentProps,
  controls,
}: RichTextFieldProps) {
  const editor = useRichTextEditorContext();

  // Because the user interactions with the editor menu bar buttons unfocus the editor
  // (since it's not part of the editor content), we'll debounce our visual focused
  // state so that the (outlined) field focus styles don't "flash" whenever that happens
  const isFieldFocused = useDebouncedFocus({ editor });

  return (
    <FieldContainer
      focused={!disabled && isFieldFocused}
      disabled={disabled}
      className={className}
    >
      {controls && (
        <MenuBar {...MenuBarProps}>
          <DebounceRender>{controls}</DebounceRender>
        </MenuBar>
      )}

      <RichTextContent
        {...RichTextContentProps}
        className={RichTextContentProps?.className}
      />
    </FieldContainer>
  );
}
