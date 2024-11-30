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
    <div
      className={cn(
        'space-x-0.5 rounded-md border border-input bg-background px-1 py-0.5',
        className,
      )}
    >
      {shortcutKeys.map((shortcutKey, index) => {
        return <span key={shortcutKey + index}>{getKey(shortcutKey)}</span>;
      })}
    </div>
  );
};
