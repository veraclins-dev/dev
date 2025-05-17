import { cn } from '@veraclins-dev/utils';

import { type WithShortcuts } from '../types';
import { getAltShortcutKey, getModShortcutKey } from '../utils/platform';

interface KeyboardShortcutsProps extends Required<WithShortcuts> {
  className?: string;
}

export const KeyboardShortcuts = ({
  shortcutKeys,
  className,
}: KeyboardShortcutsProps) => {
  const getKey = (key: string) => {
    if (key === 'mod') return getModShortcutKey();
    if (key.toLocaleLowerCase() === 'alt') return getAltShortcutKey();
    return key;
  };
  return (
    <code
      className={cn(
        'space-x-1 flex rounded-md bg-accent uppercase italic text-xs p-0.5 px-1',
        className,
      )}
    >
      {shortcutKeys.map((shortcutKey, index) => {
        return <span key={shortcutKey + index}>{getKey(shortcutKey)}</span>;
      })}
    </code>
  );
};
