import { transform as _transform } from 'sucrase';

export const transform = (code: string) => {
  const transformed = _transform(code, {
    transforms: ['jsx', 'typescript', 'imports'],
    production: true,
  }).code;

  let result = transformed;

  // Remove leading "use strict"; if present
  if (result.startsWith('"use strict";')) {
    result = result.substring(13);
  } else if (result.startsWith("'use strict';")) {
    result = result.substring(13);
  }

  // Remove Object.defineProperty(exports, "__esModule", {value: true}); if present
  // This is added by sucrase but causes issues in our eval context
  // Check for it at the start (with or without whitespace)
  const esModuleDefineRegex =
    /^Object\.defineProperty\s*\(\s*exports\s*,\s*"__esModule"\s*,\s*\{\s*value:\s*true\s*\}\s*\)\s*;?\s*/;
  if (esModuleDefineRegex.test(result)) {
    result = result.replace(esModuleDefineRegex, '');
  }

  // Fix invalid "exports. default" (with space) to "exports.default"
  // Sucrase sometimes generates this invalid syntax
  result = result.replace(/exports\.\s+default/g, 'exports.default');

  return result;
};

const firstStatementRegexp =
  /^(\s*)(<[^>]*>|function[(\s]|\(\)[\s=]|class\s)(.*)/;

export const normalizeCode = (code: string) => {
  // If code already has export default, return as-is
  if (/export\s+default/.test(code)) {
    return code;
  }
  // Otherwise, add export default to the first statement
  return code.replace(firstStatementRegexp, '$1export default $2$3');
};

