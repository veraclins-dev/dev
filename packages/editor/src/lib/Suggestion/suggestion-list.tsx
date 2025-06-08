import { type MentionNodeAttrs } from '@tiptap/extension-mention';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import { CONTENT_CLASSES, ITEM_CLASSES } from '@veraclins-dev/ui';
import { cn } from '@veraclins-dev/utils';

import { type SuggestionListProps, type SuggestionListRef } from './types';

export const SuggestionList = forwardRef<
  SuggestionListRef,
  SuggestionListProps
>((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    if (index >= props.items.length) {
      // Make sure we actually have enough items to select the given index. For
      // instance, if a user presses "Enter" when there are no options, the index will
      // be 0 but there won't be any items, so just ignore the callback here
      return;
    }

    const suggestion = props.items[index];

    // Set all of the attributes of our Mention node based on the suggestion
    // data. The fields of `suggestion` will depend on whatever data you
    // return from your `items` function in your "suggestion" options handler.
    // Our suggestion handler returns `MentionSuggestion`s (which we've
    // indicated via SuggestionProps<MentionSuggestion>). We are passing an
    // object of the `MentionNodeAttrs` shape when calling `command` (utilized
    // by the Mention extension to create a Mention Node).
    const mentionItem: MentionNodeAttrs = {
      id: suggestion.id,
      label: suggestion.mentionLabel,
    };
    props.command(mentionItem);
  };

  const upHandler = () => {
    setSelectedIndex(
      (selectedIndex + props.items.length - 1) % props.items.length,
    );
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === 'ArrowUp') {
        upHandler();
        return true;
      }

      if (event.key === 'ArrowDown') {
        downHandler();
        return true;
      }

      if (event.key === 'Enter') {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  return props.items.length > 0 ? (
    <ul
      className={cn(CONTENT_CLASSES, 'flex max-h-40 overflow-y-auto gap-y-1')}
    >
      {props.items.map((item, index) => (
        <li
          key={item.id}
          className={cn(ITEM_CLASSES, 'px-1', {
            'bg-secondary text-secondary-foreground': index === selectedIndex,
          })}
          onClick={() => selectItem(index)}
        >
          {item.mentionLabel}
        </li>
      ))}
    </ul>
  ) : null;
});

SuggestionList.displayName = 'SuggestionList';
