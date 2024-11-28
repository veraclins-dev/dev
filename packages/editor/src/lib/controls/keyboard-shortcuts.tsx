import { type WithShortcuts } from '#app/common/types.ts';
import {
  getAltShortcutKey,
  getModShortcutKey,
} from '#app/components/rich-editor/utils/platform.ts';
import { cn } from '@veraclins-dev/utils';

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
