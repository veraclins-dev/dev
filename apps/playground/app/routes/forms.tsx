import {
  formSubmissionErrors,
  processForm,
} from '@veraclins-dev/react-utils/server';

import { CommentForm } from '../components/form';
import { AddComment } from '../validations/comment';

import { type Route } from './+types/forms';

export async function action({ request }: Route.ActionArgs) {
  const submission = await processForm({
    request,
    schema: AddComment,
  });
  if (submission.status !== 'success') {
    return formSubmissionErrors(submission);
  }
  console.log(submission.value);
  return { submission: submission.reply({ resetForm: true }) };
}
export default function Index() {
  return (
    <CommentForm schema={AddComment} postId="postId" postType="question" />
  );
}
