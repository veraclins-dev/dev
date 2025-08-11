import { z } from '@veraclins-dev/utils';

const POST_TYPE = ['question', 'answer'] as const;

export const PostType = z.enum(POST_TYPE, {
  error: () => 'Please select a valid post type.',
});

const CommentDefaults = z.object({
  body: z
    .string({
        error: (issue) => issue.input === undefined ? 'Please enter your comment.' : 'Please enter a valid comment.'
    })
    .min(3, {
        error: 'Comment should be at least 3 characters.'
    }),
  postId: z
    .string({
        error: (issue) => issue.input === undefined ? undefined : 'Please provide a valid post ID.'
    })
    .optional(),
  type: PostType.optional(),
  id: z
    .string({
        error: (issue) => issue.input === undefined ? undefined : 'Please provide a valid comment ID.'
    })
    .optional(),
});

export const AddComment = z.discriminatedUnion('action', [
  CommentDefaults.extend(
    z.object({
              postId: z.string({
                  error: (issue) => issue.input === undefined ? 'Please provide a post ID.' : 'Please provide a valid post ID.'
            }),
              type: PostType,
              action: z.literal('create'),
            }).shape
  ),
  CommentDefaults.extend(
    z.object({
              id: z.string({
                  error: (issue) => issue.input === undefined ? 'Please provide a comment ID.' : 'Please provide a valid comment ID.'
            }),
              action: z.literal('update'),
            }).shape
  ),
]);
