import { formSubmissionErrors, processForm } from '@veraclins-dev/form/server';

import { FormsShowcase } from '../components/forms';
import { AddComment } from '../validations/comment';

import { type Route } from './+types/forms';

export async function action({ request }: Route.ActionArgs) {
  const submission = await processForm({
    request,
    schema: AddComment,
  });
  console.log(submission);
  if (submission.status !== 'success') {
    return formSubmissionErrors(submission);
  }
  return { submission: submission.reply({ resetForm: true }) };
}

export default function Index() {
  return <FormsShowcase />;
}
