import { useConform, useCustomFetcher } from '@veraclins-dev/react-utils';
import {
  Button,
  Form,
  HiddenField,
  Icon,
  TextareaField,
} from '@veraclins-dev/ui';

import { type AddComment } from '../validations/comment';

interface ButtonProps {
  closeForm: () => void;
  loading: boolean;
}

const Buttons = ({ closeForm, loading }: ButtonProps) => (
  <div className="flex space-x-2 self-end p-1">
    <Button
      className="px-3 py-1"
      onClick={closeForm}
      type="button"
      tooltip="Cancel comment"
    >
      <Icon name="cross-2">
        <span className="sr-only">cancel comment edit</span>
      </Icon>
    </Button>
    <Button
      className="px-3 py-1"
      type="submit"
      tooltip="Save comment"
      color="secondary"
      variant="solid"
    >
      <Icon name={loading ? 'rings' : 'check'}>
        <span className="sr-only">save comment</span>
      </Icon>
    </Button>
  </div>
);

interface CommentsFormProps {
  commentId?: string;
  schema: typeof AddComment;
  comment?: string;
  postId: string;
  postType: 'question' | 'answer';
}

export const CommentForm = ({
  commentId,
  schema,
  comment = '',
  postId,
  postType,
}: CommentsFormProps) => {
  const fetcher = useCustomFetcher();

  const { form, fields } = useConform({
    schema,
    id: commentId ? `${postId}-comment-edit-form` : `${postId}-comment-form`,
    defaultValue: {
      body: comment,
      id: commentId,
      postId,
      type: postType,
      action: commentId ? 'update' : 'create',
    },
    fetcher,
  });

  return (
    <Form noButtons className="mt-2" form={form} fetcher={fetcher}>
      <TextareaField
        rows={2}
        field={fields.body}
        className="mb-0 border text-xs"
        placeholder="Ask for clarifications or more info"
      />
      <HiddenField field={fields.id} />
      <HiddenField field={fields.postId} />
      <HiddenField field={fields.type} />
      <HiddenField field={fields.action} />
      <Buttons
        loading={fetcher.loading}
        closeForm={() => {
          console.log('close form');
        }}
      />
    </Form>
  );
};
