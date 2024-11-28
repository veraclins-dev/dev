import { MenuButtonAddTable } from '#app/components/rich-editor/controls/menu-button-add-table';
import { MenuButtonBlockquote } from '#app/components/rich-editor/controls/menu-button-blockquote';
import { MenuButtonBold } from '#app/components/rich-editor/controls/menu-button-bold';
import { MenuButtonBulletedList } from '#app/components/rich-editor/controls/menu-button-bulleted-list';
import { MenuButtonCodeBlock } from '#app/components/rich-editor/controls/menu-button-code-block';
import { MenuButtonCode } from '#app/components/rich-editor/controls/menu-button-code';
import { MenuButtonEditLink } from '#app/components/rich-editor/controls/menu-button-edit-link';
import { MenuButtonHighlightColor } from '#app/components/rich-editor/controls/menu-button-highlight-color';
import { MenuButtonHorizontalRule } from '#app/components/rich-editor/controls/menu-button-horizontal-rule';
import { MenuButtonImageUpload } from '#app/components/rich-editor/controls/menu-button-image-upload';
import { MenuButtonIndent } from '#app/components/rich-editor/controls/menu-button-indent';
import { MenuButtonItalic } from '#app/components/rich-editor/controls/menu-button-italic';
import { MenuButtonOrderedList } from '#app/components/rich-editor/controls/menu-button-ordered-list';
import { MenuButtonRedo } from '#app/components/rich-editor/controls/menu-button-redo';
import { MenuButtonRemoveFormatting } from '#app/components/rich-editor/controls/menu-button-remove-formatting';
import { MenuButtonStrikethrough } from '#app/components/rich-editor/controls/menu-button-strikethrough';
import { MenuButtonSubscript } from '#app/components/rich-editor/controls/menu-button-subscript';
import { MenuButtonSuperscript } from '#app/components/rich-editor/controls/menu-button-superscript';
import { MenuButtonTaskList } from '#app/components/rich-editor/controls/menu-button-task-list';
import { MenuButtonTextColor } from '#app/components/rich-editor/controls/menu-button-text-color';
import { MenuButtonUnderline } from '#app/components/rich-editor/controls/menu-button-underline';
import { MenuButtonUndo } from '#app/components/rich-editor/controls/menu-button-undo';
import { MenuButtonUnindent } from '#app/components/rich-editor/controls/menu-button-unindent';
import { MenuControlsContainer } from '#app/components/rich-editor/controls/menu-controls-container';
import { MenuDivider } from '#app/components/rich-editor/controls/menu-divider';
// import { MenuSelectFontSize } from '#app/components/Tiptap/controls/menu-select-font-size'
import { MenuSelectHeading } from '#app/components/rich-editor/controls/menu-select-heading';
import { MenuSelectTextAlign } from '#app/components/rich-editor/controls/menu-select-text-align';
import { isTouchDevice } from '#app/components/rich-editor/utils/platform.ts';

export function EditorMenuControls() {
  return (
    <MenuControlsContainer>
      <MenuSelectHeading />

      {/* <MenuSelectFontSize /> */}

      <MenuDivider />

      <MenuButtonBold />

      <MenuButtonItalic />

      <MenuButtonUnderline />

      <MenuButtonStrikethrough />

      <MenuButtonSubscript />

      <MenuButtonSuperscript />

      <MenuButtonTextColor />

      <MenuButtonHighlightColor />

      <MenuDivider />

      <MenuSelectTextAlign />

      <MenuButtonOrderedList />

      <MenuButtonBulletedList />

      <MenuButtonTaskList />

      {/* On touch devices, we'll show indent/unindent buttons, since they're
      unlikely to have a keyboard that will allow for using Tab/Shift+Tab. These
      buttons probably aren't necessary for keyboard users and would add extra
      clutter. */}
      {isTouchDevice() && (
        <>
          <MenuButtonIndent />

          <MenuButtonUnindent />
        </>
      )}

      <MenuDivider />

      <MenuButtonEditLink />

      <MenuButtonBlockquote />

      <MenuButtonCode />

      <MenuButtonCodeBlock />

      <MenuDivider />

      <MenuButtonImageUpload
        onUploadFiles={(files) =>
          // For the sake of a demo, we don't have a server to upload the files
          // to, so we'll instead convert each one to a local "temporary" object
          // URL. This will not persist properly in a production setting. You
          // should instead upload the image files to your server, or perhaps
          // convert the images to bas64 if you would like to encode the image
          // data directly into the editor content, though that can make the
          // editor content very large.
          files.map((file) => ({
            src: URL.createObjectURL(file),
            alt: file.name,
          }))
        }
      />

      <MenuButtonAddTable />

      <MenuButtonHorizontalRule />

      <MenuDivider />

      <MenuButtonRemoveFormatting />

      <MenuButtonUndo />

      <MenuButtonRedo />
    </MenuControlsContainer>
  );
}
