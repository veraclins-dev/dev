/* eslint-disable no-template-curly-in-string */
import {
  completeFromList,
  type Completion,
  ifNotIn,
  snippetCompletion as snip,
} from '@codemirror/autocomplete';
import { javascriptLanguage, tsxLanguage } from '@codemirror/lang-javascript';
import { LanguageSupport } from '@codemirror/language';

const snippets: readonly Completion[] = [
  snip('try {\n\t${}\n} catch (${error}) {\n\t${}\n}', {
    label: 'try',
    detail: 'block',
    type: 'keyword',
  }),
  snip("import { ${names} } from '${module}'\n${}", {
    label: 'import',
    detail: 'named',
    type: 'keyword',
  }),
  snip("import ${name} from '${module}'\n${}", {
    label: 'import',
    detail: 'default',
    type: 'keyword',
  }),
  snip('export default function ${App}() {\n\t${}\n}', {
    label: 'export',
    detail: 'default',
    type: 'keyword',
  }),
];

export const javascript = () =>
  new LanguageSupport(
    tsxLanguage,
    javascriptLanguage.data.of({
      autocomplete: ifNotIn(
        ['LineComment', 'BlockComment', 'String'],
        completeFromList(snippets),
      ),
    }),
  );
