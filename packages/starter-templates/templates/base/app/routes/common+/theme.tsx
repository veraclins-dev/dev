import { formSubmissionErrors, processForm } from '@veraclins-dev/form/server'
import { data } from 'react-router'
import { setTheme } from '../../utils/theme.server'
import { ThemeSchema } from '../../validations/index'
import { type Route } from './+types/theme'

export async function action({ request }: Route.ActionArgs) {
	const submission = await processForm({
		request,
		schema: ThemeSchema,
	})
	if (submission.status !== 'success') {
		return formSubmissionErrors(submission)
	}
	const { theme } = submission.value

	return data(
		{ submission: submission.reply({ resetForm: true }) },
		{ headers: { 'set-cookie': setTheme(theme) } },
	)
}
