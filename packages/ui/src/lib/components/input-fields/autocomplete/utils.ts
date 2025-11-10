import { matchSorter, type MatchSorterOptions, rankings } from 'match-sorter';

import { type Option } from '../../../types';
import { isStringOption } from '../utils';

type Options = Option<string>[];

// Predefined separators with their character mappings
export const SEPARATOR_MAP = {
  comma: ',',
  semicolon: ';',
  pipe: '|',
  space: ' ',
} as const;

export type SeparatorName = keyof typeof SEPARATOR_MAP;

export const filter = ({
  options,
  value,
  keys = ['label', 'value'],
  disableSorting = false,
}: {
  options: Options;
  value: string;
  keys?: string[];
  disableSorting?: boolean;
}) => {
  const isObject = options.length && !isStringOption(options[0]);

  const config: MatchSorterOptions<Option> = {};

  if (isObject) {
    config.keys = keys;
  }
  if (disableSorting) {
    config.baseSort = () => 0;
  }

  return matchSorter(options, value, config);
};

// Internal function to parse text with escape handling
const parseTextWithEscapes = (
  text: string,
  separatorChar: string,
  onSeparator: (current: string) => void,
  onChar: (char: string) => void,
) => {
  let current = '';
  let escaped = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (escaped) {
      current += char;
      escaped = false;
    } else if (char === '\\') {
      escaped = true;
      current += char;
    } else if (char === separatorChar) {
      onSeparator(current);
      current = '';
    } else {
      current += char;
      onChar(char);
    }
  }

  // Handle any remaining text
  if (current) {
    onSeparator(current);
  }
};

// Utility function to parse values with escaped separators
export const parseSeparatedValues = (
  text: string,
  separatorChar: string,
): string[] => {
  const result: string[] = [];

  parseTextWithEscapes(
    text,
    separatorChar,
    (current) => {
      const trimmed = current.trim();
      if (trimmed) {
        result.push(trimmed);
      }
    },
    () => {
      // No action needed for individual chars in parsing
    },
  );

  return result;
};

// Utility function to escape separator in display text
export const escapeSeparator = (
  text: string,
  separatorChar: string,
): string => {
  return text.replace(
    new RegExp(`\\${separatorChar}`, 'g'),
    `\\${separatorChar}`,
  );
};

// Utility function to filter separator characters from input text
export const filterSeparators = (
  text: string,
  separatorChar: string,
): string => {
  let result = '';

  parseTextWithEscapes(
    text,
    separatorChar,
    (current) => {
      result += current;
    },
    () => {
      // Characters are already added to current, no need to add them again
    },
  );

  return result;
};

// Utility function to check if text contains unescaped separator characters
export const hasUnescapedSeparator = (
  text: string,
  separatorChar: string,
): boolean => {
  // Split by separator and check if any item ends with escape character
  const parts = text.split(separatorChar);

  // If there's only one part, no separator was found
  if (parts.length === 1) {
    return false;
  }

  // Check if any part (except the last one) ends with escape character
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!part.endsWith('\\')) {
      return true; // Found an unescaped separator
    }
  }

  return false;
};

// Utility function to unescape separator characters from values
export const unescapeSeparators = (
  text: string,
  separatorChar: string,
): string => {
  return text.replace(new RegExp(`\\\\${separatorChar}`, 'g'), separatorChar);
};
