import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap,
} from '@codemirror/autocomplete';
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentLess,
  indentMore,
  toggleComment,
} from '@codemirror/commands';
import {
  defaultHighlightStyle,
  indentOnInput,
  syntaxHighlighting,
} from '@codemirror/language';
import { EditorState, type Extension } from '@codemirror/state';
import { type EditorView, keymap } from '@codemirror/view';

const insertSoftTab = (view: EditorView) => {
  if (view.state.selection.ranges.some((r) => !r.empty)) {
    return indentMore(view);
  }

  view.dispatch({
    changes: {
      from: view.state.selection.main.from,
      to: view.state.selection.main.to,
      insert: '  ',
    },
    scrollIntoView: true,
    userEvent: 'input',
  });
  return true;
};

export const basicSetup: Extension = [
  history(),
  EditorState.tabSize.of(2),
  EditorState.allowMultipleSelections.of(true),
  indentOnInput(),
  syntaxHighlighting(defaultHighlightStyle),
  closeBrackets(),
  autocompletion(),
  keymap.of([
    ...closeBracketsKeymap,
    ...defaultKeymap,
    ...historyKeymap,
    ...completionKeymap,
    {
      key: 'Mod-/',
      run: toggleComment,
    },
    {
      key: 'Tab',
      run: insertSoftTab,
      shift: indentLess,
    },
    {
      key: 'Escape',
      run: (view: EditorView) => {
        if (view.hasFocus) {
          view.dom.focus();
        }
        return true;
      },
    },
  ]),
];
