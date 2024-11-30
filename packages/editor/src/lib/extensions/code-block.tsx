import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { ReactNodeViewRenderer } from '@tiptap/react';
import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import php from 'highlight.js/lib/languages/php';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import { createLowlight } from 'lowlight';

import { CodeBlock } from './components/code-block';

const lowlight = createLowlight();

lowlight.register('css', css);
lowlight.register('javascript', js);
lowlight.register('typescript', ts);
lowlight.register('HTML', html);
lowlight.register('php', php);
lowlight.register('bash', bash);

export const CodeBlockExtension = CodeBlockLowlight.extend({
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlock);
  },
}).configure({
  lowlight,
});
