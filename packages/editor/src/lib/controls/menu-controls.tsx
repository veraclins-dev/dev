import { isTouchDevice } from '../utils/platform';

import { MenuButtonAddTable } from './menu-button-add-table';
import { MenuButtonBlockquote } from './menu-button-blockquote';
import { MenuButtonBold } from './menu-button-bold';
import { MenuButtonBulletedList } from './menu-button-bulleted-list';
import { MenuButtonCode } from './menu-button-code';
import { MenuButtonCodeBlock } from './menu-button-code-block';
import { MenuButtonEditLink } from './menu-button-edit-link';
import { MenuButtonHighlightColor } from './menu-button-highlight-color';
import { MenuButtonHorizontalRule } from './menu-button-horizontal-rule';
import { MenuButtonImageUpload } from './menu-button-image-upload';
import { MenuButtonIndent } from './menu-button-indent';
import { MenuButtonItalic } from './menu-button-italic';
import { MenuButtonOrderedList } from './menu-button-ordered-list';
import { MenuButtonRedo } from './menu-button-redo';
import { MenuButtonRemoveFormatting } from './menu-button-remove-formatting';
import { MenuButtonStrikethrough } from './menu-button-strikethrough';
import { MenuButtonSubscript } from './menu-button-subscript';
import { MenuButtonSuperscript } from './menu-button-superscript';
import { MenuButtonTaskList } from './menu-button-task-list';
import { MenuButtonTextColor } from './menu-button-text-color';
import { MenuButtonUnderline } from './menu-button-underline';
import { MenuButtonUndo } from './menu-button-undo';
import { MenuButtonUnindent } from './menu-button-unindent';
import { MenuControlsContainer } from './menu-controls-container';
import { MenuDivider } from './menu-divider';
import { MenuSelectHeading } from './menu-select-heading';
import { MenuSelectTextAlign } from './menu-select-text-align';

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
