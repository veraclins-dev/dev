import { z } from '@veraclins-dev/utils';

const POST_TYPE = ['question', 'answer'] as const;

export const PostType = z.enum(POST_TYPE, {
  errorMap: () => ({ message: 'Please select a valid post type.' }),
});

const CommentDefaults = z.object({
  body: z
    .string({
      required_error: 'Please enter your comment.',
      invalid_type_error: 'Please enter a valid comment.',
    })
    .min(3, { message: 'Comment should be at least 3 characters.' }),
  postId: z
    .string({
      invalid_type_error: 'Please provide a valid post ID.',
    })
    .optional(),
  type: PostType.optional(),
  id: z
    .string({
      invalid_type_error: 'Please provide a valid comment ID.',
    })
    .optional(),
});

export const AddComment = z.discriminatedUnion('action', [
  CommentDefaults.merge(
    z.object({
      postId: z.string({
        required_error: 'Please provide a post ID.',
        invalid_type_error: 'Please provide a valid post ID.',
      }),
      type: PostType,
      action: z.literal('create'),
    }),
  ),
  CommentDefaults.merge(
    z.object({
      id: z.string({
        required_error: 'Please provide a comment ID.',
        invalid_type_error: 'Please provide a valid comment ID.',
      }),
      action: z.literal('update'),
    }),
  ),
]);
