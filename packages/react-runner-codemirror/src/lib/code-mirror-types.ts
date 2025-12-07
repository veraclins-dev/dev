import type { Extension } from '@codemirror/state';
import type { EditorView } from '@codemirror/view';
import type { HTMLAttributes } from 'react';

export type Theme = 'dark' | 'light';

export interface CodeMirrorConfig {
  theme?: Theme;
  padding?: number | string;
  readOnly?: boolean;
  showLineNumbers?: boolean;
  wrapLine?: boolean;
  extensions?: Extension;
  filename?: string;
}

export interface CodeMirrorProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'value' | 'onChange'>,
    CodeMirrorConfig {
  defaultValue?: string;
  value?: string;
  onChange?: (code: string) => void;
  ref?: React.Ref<EditorView>;
}
