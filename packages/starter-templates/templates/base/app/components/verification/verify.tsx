import { useCallback } from 'react'
import { useSearchParams } from 'react-router'

import { Form, useConform, useCustomFetcher } from '@veraclins-dev/form'
import {
	Box,
	Button,
	HiddenField,
	LabeledTextField,
	Typography,
} from '@veraclins-dev/ui'

import verifyIllustration from '../../assets/images/verify-illustration.svg'
import {
	AuthLayout,
	type AuthPageHeading,
} from '../../routes/auth+/components/layout'
import {
	codeQueryParam,
	targetQueryParam,
	typeQueryParam,
	type VerificationTypes,
	Verify,
} from '../../utils/auth/verification.utils'
import { VerificationType } from '../../utils/user/validations'

export function VerifyForm() {
	const [searchParams] = useSearchParams()

	const parsedType = VerificationType.safeParse(
		searchParams.get(typeQueryParam),
	)
	const type = parsedType.success ? parsedType.data : ''

	const { form, fields } = useConform({
		id: 'verify-form',
		schema: Verify,
		defaultValue: {
			[codeQueryParam]: searchParams.get(codeQueryParam) ?? '',
			type,
			[targetQueryParam]: searchParams.get(targetQueryParam) ?? '',
		},
	})

	const fetcher = useCustomFetcher()
	const email = searchParams.get(targetQueryParam)

	const handleResend = useCallback(async () => {
		if (email) {
			await fetcher.submit(
				{ email, type },
				{ method: 'post', action: '/resources/resend-otp' },
			)
		}
	}, [email, type, fetcher])
	const checkEmail = {
		title: 'Verify Code',
		subTitle: `Enter the code sent to ${email}`,
	}
	const headings: Record<Exclude<VerificationTypes, ''>, AuthPageHeading> = {
		onboarding: checkEmail,
		'reset-password': checkEmail,
		'change-email': checkEmail,
		'2fa': {
			title: 'Verify Code',
			subtitle: 'Please enter your 2FA code to verify your identity.',
		},
	}

	return (
		<AuthLayout
			illustration={verifyIllustration}
			altText="verify code"
			{...(type ? headings[type] : { title: 'Invalid Verification Type' })}
		>
			<Form submitText="Verify" form={form}>
				<LabeledTextField
					placeholder="Enter code"
					label="Enter the verification code sent to your registered email/mobile."
					field={fields[codeQueryParam]}
				/>

				<HiddenField field={fields[typeQueryParam]} />
				<HiddenField field={fields[targetQueryParam]} />
			</Form>
			<Box display="flex" gap={1} items="center">
				<Typography>Didn't receive code?</Typography>
				<Button variant="plain" className="text-primary" onClick={handleResend}>
					Resend
				</Button>
			</Box>
		</AuthLayout>
	)
}
