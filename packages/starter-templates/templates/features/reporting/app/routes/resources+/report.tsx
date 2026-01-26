import { formSubmissionErrors, processForm } from '@veraclins-dev/form/server';
import { jsonWithToast } from '@veraclins-dev/react-utils/server';
import { data } from 'react-router';
import { requireUserId } from '../../utils/auth/auth.server';
import { reportContent } from '../../utils/reports/report.server';
import { createReportSchemaWithCheck } from '../../utils/reports/validations.server';
import { type Route } from './+types/report';

export async function action({ request, context }: Route.ActionArgs) {
  const userId = await requireUserId(request, context);

  const ReportSchemaWithCheck = createReportSchemaWithCheck(userId);
  const submission = await processForm({
    request,
    schema: ReportSchemaWithCheck,
  });
  if (submission.status !== 'success' || !submission.value) {
    return formSubmissionErrors(submission, { hideFields: ['password'] });
  }

  try {
    const report = await reportContent({
      ...submission.value,
      reporterId: userId,
    });

    return jsonWithToast({
      data: { success: true, report },
      toast: {
        type: 'success',
        title: 'Report submitted',
        description: 'Your report has been submitted and will be reviewed.',
      },
    });
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }

    console.error('Error submitting report:', error);
    return data(
      { error: { message: 'Failed to submit report. Please try again.' } },
      { status: 500 },
    );
  }
}
