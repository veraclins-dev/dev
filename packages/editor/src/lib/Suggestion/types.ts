import { type MentionOptions } from '@tiptap/extension-mention';
import {
  type SuggestionOptions,
  type SuggestionProps,
} from '@tiptap/suggestion';

export type MentionSuggestionItem = {
  id: string;
  mentionLabel: string;
};

export type MentionSuggestionOption =
  MentionOptions<MentionSuggestionItem>['suggestion'];

export type SuggestionFilterFunction = MentionSuggestionOption['items'];

export type SuggestionListProps = SuggestionProps<MentionSuggestionItem>;

export type SuggestionListRef = {
  // For convenience using this SuggestionList from within the
  // mentionSuggestionOptions, we'll match the signature of SuggestionOptions's
  // `onKeyDown` returned in its `render` function
  onKeyDown: NonNullable<
    ReturnType<
      NonNullable<SuggestionOptions<MentionSuggestionItem>['render']>
    >['onKeyDown']
  >;
};
