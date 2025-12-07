import { css } from '@codemirror/lang-css';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { Compartment, type Extension } from '@codemirror/state';
import {
  EditorView,
  highlightActiveLine,
  highlightActiveLineGutter,
  lineNumbers,
} from '@codemirror/view';
import { tags } from '@lezer/highlight';
import { type RefObject, useEffect } from 'react';

import type { Theme } from './code-mirror-types';
import { javascript } from './javascript';

export interface Config {
  theme?: Theme;
  padding?: number | string;
  readOnly?: boolean;
  showLineNumbers?: boolean;
  wrapLine?: boolean;
  extensions?: Extension;
  filename?: string;
}

const compartments: Record<keyof Config, Compartment> = {
  theme: new Compartment(),
  padding: new Compartment(),
  readOnly: new Compartment(),
  showLineNumbers: new Compartment(),
  wrapLine: new Compartment(),
  extensions: new Compartment(),
  filename: new Compartment(),
};

const getBaseTheme = (padding: Config['padding'] = 10) =>
  EditorView.theme({
    '&.cm-editor': {
      height: '100%',
    },
    '&.cm-editor.cm-focused': {
      outline: 'none',
    },
    '&.cm-editor .cm-scroller': {
      overflow: 'auto',
      fontFamily:
        'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
    },
    '&.cm-editor .cm-line': {
      padding: 0,
    },
    '&.cm-editor .cm-content': {
      padding: typeof padding === 'string' ? padding : `${padding}px`,
    },
    '&.cm-editor .cm-completionIcon': {
      width: '1em',
      paddingRight: '1.2em',
    },
    '&.cm-editor:not(.cm-focused) .cm-activeLine': {
      backgroundColor: 'inherit',
    },
  });

const getTheme = (theme: Config['theme'] = 'dark') => {
  if (theme === 'light') {
    return [
      EditorView.theme(
        {
          '&.cm-editor': {
            backgroundColor: '#ffffff',
            color: '#24292e',
          },
          '.cm-content': {
            caretColor: '#24292e',
          },
          '.cm-cursor, .cm-dropCursor': {
            borderLeftColor: '#24292e',
          },
          '.cm-selectionBackground, .cm-selectionBackground.cm-focused': {
            backgroundColor: '#b3d4fc',
          },
          '.cm-activeLine': {
            backgroundColor: '#f6f8fa',
          },
          '.cm-activeLineGutter': {
            backgroundColor: 'inherit',
            color: '#24292e',
          },
          '.cm-gutters': {
            backgroundColor: '#fafbfc',
            color: '#6a737d',
            border: 'none',
          },
          '.cm-lineNumbers .cm-activeLineGutter': {
            backgroundColor: 'inherit',
            color: '#24292e',
          },
          '.cm-matchingBracket': {
            backgroundColor: '#d1d5da',
            outline: '1px solid #959da5',
          },
          '.cm-tooltip': {
            backgroundColor: '#ffffff',
            color: '#24292e',
            border: '1px solid #e1e4e8',
          },
          '.cm-tooltip-autocomplete > ul > li[aria-selected]': {
            backgroundColor: '#0366d6',
            color: '#ffffff',
          },
        },
        { dark: false },
      ),
      // Basic syntax highlighting for light theme
      syntaxHighlighting(
        HighlightStyle.define([
          // Keywords (const, return, import, function, export, from) - red
          { tag: tags.keyword, color: '#d73a49 !important' },
          // Strings - dark blue
          { tag: tags.string, color: '#032f62 !important' },
          // Numbers - blue
          { tag: tags.number, color: '#005cc5 !important' },
          // Comments - gray, italic
          {
            tag: tags.comment,
            color: '#6a737d !important',
            fontStyle: 'italic',
          },
          // Variable names - orange
          { tag: tags.variableName, color: '#e36209 !important' },
          { tag: tags.local(tags.variableName), color: '#e36209 !important' },
          // Type names - blue
          { tag: tags.typeName, color: '#005cc5 !important' },
          { tag: tags.namespace, color: '#005cc5 !important' },
          // Property names (object keys) - blue
          { tag: tags.propertyName, color: '#005cc5 !important' },
          {
            tag: tags.definition(tags.propertyName),
            color: '#005cc5 !important',
          },
          // JSX tag names - green
          { tag: tags.tagName, color: '#22863a !important' },
          // Attribute names - purple
          { tag: tags.attributeName, color: '#6f42c1 !important' },
          // Functions - purple
          {
            tag: tags.function(tags.variableName),
            color: '#6f42c1 !important',
          },
          {
            tag: tags.definition(tags.variableName),
            color: '#005cc5 !important',
          },
          // Operators - green
          { tag: tags.operator, color: '#22863a !important' },
          // Punctuation - dark gray
          { tag: tags.punctuation, color: '#24292e !important' },
          { tag: tags.separator, color: '#24292e !important' },
          { tag: tags.bracket, color: '#6f42c1 !important' },
          { tag: tags.angleBracket, color: '#6a737d !important' },
          { tag: tags.squareBracket, color: '#6f42c1 !important' },
          { tag: tags.paren, color: '#24292e !important' },
          { tag: tags.brace, color: '#6f42c1 !important' },
          // Other literals
          { tag: tags.regexp, color: '#032f62 !important' },
          { tag: tags.escape, color: '#032f62 !important' },
          { tag: tags.url, color: '#d73a49 !important' },
          { tag: tags.color, color: '#005cc5 !important' },
          // Meta
          { tag: tags.meta, color: '#24292e !important' },
          { tag: tags.processingInstruction, color: '#24292e !important' },
          { tag: tags.annotation, color: '#24292e !important' },
          // Labels
          { tag: tags.labelName, color: '#6f42c1 !important' },
          { tag: tags.macroName, color: '#d73a49 !important' },
        ]),
      ),
    ];
  }

  return [
    EditorView.theme(
      {
        '&.cm-editor': {
          backgroundColor: '#0d0d0d',
          color: '#d4d4d4',
        },
        '.cm-content': {
          caretColor: '#aeafad',
        },
        '.cm-cursor, .cm-dropCursor': {
          borderLeftColor: '#aeafad',
        },
        '.cm-selectionBackground, .cm-selectionBackground.cm-focused': {
          backgroundColor: '#264f78',
        },
        '.cm-activeLine': {
          backgroundColor: '#2a2d2e',
        },
        '.cm-activeLineGutter': {
          backgroundColor: 'inherit',
          color: '#ffffff',
        },
        '.cm-gutters': {
          backgroundColor: '#1e1e1e',
          color: '#858585',
          border: 'none',
        },
        '.cm-lineNumbers .cm-activeLineGutter': {
          backgroundColor: 'inherit',
          color: '#ffffff',
        },
        '.cm-matchingBracket': {
          backgroundColor: 'transparent',
          outline: '1px solid #0e639c',
        },
        '.cm-tooltip': {
          backgroundColor: '#252526',
          color: '#cccccc',
          border: '1px solid #454545',
        },
        '.cm-tooltip-autocomplete > ul > li[aria-selected]': {
          backgroundColor: '#094771',
          color: '#ffffff',
        },
      },
      { dark: true },
    ),
    // Basic syntax highlighting for dark theme
    syntaxHighlighting(
      HighlightStyle.define([
        // Keywords (const, return, import, function, export, from) - blue
        { tag: tags.keyword, color: '#569cd6 !important' },
        // Strings - orange
        { tag: tags.string, color: '#ce9178 !important' },
        // Numbers - light green
        { tag: tags.number, color: '#b5cea8 !important' },
        // Comments - green, italic
        {
          tag: tags.comment,
          color: '#6a9955 !important',
          fontStyle: 'italic',
        },

        // Variable names - light blue/white
        { tag: tags.variableName, color: '#00cfff !important' },
        { tag: tags.local(tags.variableName), color: '#9cdcfe !important' },
        // Type names - cyan
        { tag: tags.typeName, color: '#ff7b72 !important' },
        { tag: tags.namespace, color: '#4ec9b0 !important' },
        // Property names (object keys) - light blue
        { tag: tags.propertyName, color: '#70cff8 !important' },
        {
          tag: tags.definition(tags.propertyName),
          color: '#70cff8 !important',
        },
        // JSX tag names - green/cyan
        { tag: tags.tagName, color: '#4ec9b0 !important' },
        // Attribute names - light blue
        { tag: tags.attributeName, color: '#92c5f7 !important' },
        // Functions - blue
        {
          tag: tags.function(tags.variableName),
          color: '#d2a8ff !important',
        },
        {
          tag: tags.definition(tags.variableName),
          color: '#4ec9b0 !important',
        },
        // Operators - gray
        { tag: tags.operator, color: '#d4d4d4 !important' },
        // Punctuation - gray
        { tag: tags.punctuation, color: '#d4d4d4 !important' },
        { tag: tags.separator, color: '#d4d4d4 !important' },
        { tag: tags.bracket, color: '#92c5f7 !important' },
        { tag: tags.angleBracket, color: '#b4b4b4 !important' },
        { tag: tags.squareBracket, color: '#92c5f7 !important' },
        { tag: tags.paren, color: '#d4d4d4 !important' },
        { tag: tags.brace, color: '#92c5f7 !important' },
        // Other literals
        { tag: tags.regexp, color: '#ce9178 !important' },
        { tag: tags.escape, color: '#ce9178 !important' },
        { tag: tags.url, color: '#569cd6 !important' },
        { tag: tags.color, color: '#b5cea8 !important' },
        // Meta
        { tag: tags.meta, color: '#d4d4d4 !important' },
        { tag: tags.processingInstruction, color: '#d4d4d4 !important' },
        { tag: tags.annotation, color: '#d4d4d4 !important' },
        // Labels
        { tag: tags.labelName, color: '#c586c0 !important' },
        { tag: tags.macroName, color: '#569cd6 !important' },
      ]),
    ),
  ];
};

const config: {
  [key in keyof Config]-?: (value: Config[key]) => Extension;
} = {
  theme: (theme) => getTheme(theme),
  padding: (padding) => getBaseTheme(padding),
  readOnly: (readOnly) =>
    readOnly
      ? EditorView.editable.of(false)
      : [highlightActiveLine(), highlightActiveLineGutter()],
  showLineNumbers: (showLineNumbers) => (showLineNumbers ? lineNumbers() : []),
  wrapLine: (wrapLine) => (wrapLine ? EditorView.lineWrapping : []),
  extensions: (extensions) => extensions || [],
  filename: (filename) => (filename?.endsWith('.css') ? css() : javascript()),
};

export const getConfig = <T extends keyof Config>(key: T, value: Config[T]) => {
  return compartments[key].of(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (config[key] as (value: any) => Extension)(value),
  );
};

export const useConfig = <T extends keyof Config>(
  view: RefObject<EditorView | null>,
  key: T,
  value: Config[T],
  deps: unknown[] = [],
) => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const extension = (config[key] as (value: any) => Extension)(value);
    view.current?.dispatch({
      effects: compartments[key].reconfigure(extension),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, value, view, ...deps]);
};
