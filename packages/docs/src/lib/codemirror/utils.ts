/**
 * Maps language string to filename for CodeMirror language detection
 */
export const getFilenameFromLanguage = (language: string): string => {
  const languageMap: Record<string, string> = {
    tsx: 'file.tsx',
    ts: 'file.ts',
    jsx: 'file.jsx',
    js: 'file.js',
    css: 'file.css',
    json: 'file.json',
    html: 'file.html',
    md: 'file.md',
    markdown: 'file.md',
  };

  return languageMap[language.toLowerCase()] || `file.${language}`;
};

