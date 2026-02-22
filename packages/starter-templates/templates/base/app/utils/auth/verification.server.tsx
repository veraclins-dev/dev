import { createCookieSessionStorage, redirect } from 'react-router'
import { safeRedirect } from 'remix-utils/safe-redirect'

import { formSubmissionErrors, processForm } from '@veraclins-dev/form/server'
import {
	badRequest,
	redirectWithToast,
} from '@veraclins-dev/react-utils/server'
import { getDomainUrl, invariant } from '@veraclins-dev/utils'

import { REDIRECT_TO_FIELD } from '#app/utils/constants'
import { db, type Prisma } from '#app/utils/db/db.server'
import { sendEmail } from '#app/utils/email.server'
import { generateTOTP, verifyTOTP } from '#app/utils/totp.server'
import { type z } from '#app/validations/index'

import { getUserId, requireUserId } from './auth.server'
import { rememberKey, sessionKey } from './session.server'
import { authSessionStorage } from './session.server'
import {
	codeQueryParam,
	newEmailAddressSessionKey,
	onboardingEmailSessionKey,
	resetPasswordUsernameSessionKey,
	targetQueryParam,
	twoFAVerificationType,
	typeQueryParam,
	unverifiedSessionIdKey,
	type VerificationTypes,
	Verify,
} from './verification.utils'

const verifiedTimeKey = 'verified-time'

export const VerifyCode = Verify.superRefine(async (data, ctx) => {
	const codeIsValid = await isCodeValid({
		code: data[codeQueryParam],
		type: data[typeQueryParam],
		target: data[targetQueryParam],
	})
	if (!codeIsValid) {
		ctx.issues.push({
			path: ['code'],
			code: 'custom',
			message: 'Invalid code',
			input: '',
		})
	}
})

export type VerifyFunctionArgs = {
	request: Request
	submission: z.infer<typeof VerifyCode>
}

export const verifySessionStorage = createCookieSessionStorage({
	cookie: {
		name: 'en_verification',
		sameSite: 'lax',
		path: '/',
		httpOnly: true,
		maxAge: 60 * 10,
		secrets: (process.env.SESSION_SECRET ?? '').split(','),
		secure: process.env.NODE_ENV === 'production',
	},
})

export async function isCodeValid({
	code,
	type,
	target,
}: {
	code: string
	type: VerificationTypes
	target: string
}) {
	const verification = await getVerification({ target, type, notExpired: true })
	if (!verification) return false

	return verifyTOTP({ otp: code, ...verification })
}

export function getVerificationRedirectToUrl({
	request,
	type,
	target,
	redirectTo,
}: {
	request: Request
	type: VerificationTypes
	target: string
	redirectTo?: string
}) {
	const path =
		type === 'change-email'
			? `/profiles/${target}/settings/change-email/verify`
			: '/auth/verify'
	const redirectToUrl = new URL(`${getDomainUrl(request)}${path}`)
	redirectToUrl.searchParams.set(typeQueryParam, type)
	redirectToUrl.searchParams.set(targetQueryParam, target)
	if (redirectTo) {
		redirectToUrl.searchParams.set(REDIRECT_TO_FIELD, redirectTo)
	}
	return redirectToUrl
}

export async function requireRecentVerification(request: Request) {
	const userId = await requireUserId(request)
	const shouldReverify = await shouldRequestTwoFA(request)
	if (shouldReverify) {
		const reqUrl = new URL(request.url)
		const redirectUrl = getVerificationRedirectToUrl({
			request,
			target: userId,
			type: twoFAVerificationType,
			redirectTo: reqUrl.pathname + reqUrl.search,
		})
		throw await redirectWithToast(redirectUrl.toString(), {
			title: 'Please Reverify',
			description: 'Please reverify your account before proceeding',
		})
	}
}

type Algorithm = 'SHA-1' | 'SHA-256' | 'SHA-512'

export async function prepareVerification({
	period,
	request,
	type,
	target,
}: {
	period: number
	request: Request
	type: VerificationTypes
	target: string
}) {
	const verifyUrl = getVerificationRedirectToUrl({
		request,
		type,
		target,
	})
	const redirectTo = new URL(verifyUrl.toString())

	const { otp, ...verificationConfig } = await generateTOTP({
		algorithm: 'SHA-256' satisfies Algorithm,
		charSet: 'ABCDEFGHJKLMNPQRSTUVWXYZ123456789',
		period,
	})
	const verificationData = {
		type,
		target,
		...verificationConfig,
		expiresAt: new Date(Date.now() + verificationConfig.period * 1000),
	}
	await db.verification.upsert({
		where: { target_type: { target, type } },
		create: verificationData,
		update: verificationData,
	})

	verifyUrl.searchParams.set(codeQueryParam, otp)

	return { otp, redirectTo, verifyUrl }
}

export async function shouldRequestTwoFA(request: Request) {
	const cookieSession = await authSessionStorage.getSession(
		request.headers.get('cookie'),
	)
	const verifySession = await verifySessionStorage.getSession(
		request.headers.get('cookie'),
	)
	if (verifySession.has(unverifiedSessionIdKey)) return true
	const userId = await getUserId(request)
	if (!userId) return false
	const userHasTwoFA = await getVerification({
		target: userId,
		type: twoFAVerificationType,
	})
	if (!userHasTwoFA) return false
	const verifiedTime = cookieSession.get(verifiedTimeKey) ?? new Date(0)
	const twoHours = 1000 * 60 * 2
	return Date.now() - verifiedTime > twoHours
}

export async function getVerification({
	type,
	target,
	notExpired,
}: {
	type: VerificationTypes
	target: string
	notExpired?: boolean
}) {
	const where: Prisma.VerificationWhereUniqueInput = {
		target_type: { target, type },
	}
	if (notExpired) {
		where.OR = [{ expiresAt: { gt: new Date() } }, { expiresAt: null }]
	}
	const verification = await db.verification.findUnique({
		where,
		select: {
			id: true,
			algorithm: true,
			secret: true,
			period: true,
			charSet: true,
		},
	})
	return verification
}

export async function handleLoginVerification({
	request,
	submission,
}: VerifyFunctionArgs) {
	invariant(submission, 'Submission should have a value by this point')
	const cookieSession = await authSessionStorage.getSession(
		request.headers.get('cookie'),
	)
	const verifySession = await verifySessionStorage.getSession(
		request.headers.get('cookie'),
	)

	const remember = verifySession.get(rememberKey)
	const { redirectTo } = submission
	const headers = new Headers()
	cookieSession.set(verifiedTimeKey, Date.now())

	const unverifiedSessionId = verifySession.get(unverifiedSessionIdKey)
	if (unverifiedSessionId) {
		const session = await db.session.findUnique({
			select: { expiresAt: true },
			where: { id: unverifiedSessionId },
		})
		if (!session) {
			throw await redirectWithToast('/auth/login', {
				type: 'error',
				title: 'Invalid session',
				description: 'Could not find session to verify. Please try again.',
			})
		}
		cookieSession.set(sessionKey, unverifiedSessionId)

		headers.append(
			'set-cookie',
			await authSessionStorage.commitSession(cookieSession, {
				expires: remember ? session.expiresAt : undefined,
			}),
		)
	} else {
		headers.append(
			'set-cookie',
			await authSessionStorage.commitSession(cookieSession),
		)
	}

	headers.append(
		'set-cookie',
		await verifySessionStorage.destroySession(verifySession),
	)

	return redirect(safeRedirect(redirectTo), { headers })
}

export async function handleOnboardingVerification({
	submission,
}: Omit<VerifyFunctionArgs, 'request'>) {
	invariant(submission, 'values should be defined by now')
	const verifySession = await verifySessionStorage.getSession()
	verifySession.set(onboardingEmailSessionKey, submission.target)
	return redirect('/auth/onboarding', {
		headers: {
			'set-cookie': await verifySessionStorage.commitSession(verifySession),
		},
	})
}

export async function handleResetPasswordVerification({
	submission,
}: Omit<VerifyFunctionArgs, 'request'>) {
	invariant(submission, 'values should be defined by now')
	const target = submission.target
	const user = await db.user.findFirst({
		where: { OR: [{ email: target }, { username: target }] },
		select: { email: true, username: true },
	})
	// we don't want to say the user is not found if the email is not found
	// because that would allow an attacker to check if an email is registered
	if (!user) {
		return badRequest({ errors: { code: 'Invalid code' } })
	}

	const verifySession = await verifySessionStorage.getSession()
	verifySession.set(resetPasswordUsernameSessionKey, user.username)
	return redirect('/auth/reset-password', {
		headers: {
			'set-cookie': await verifySessionStorage.commitSession(verifySession),
		},
	})
}

type ChangeEmailReturnType =
	| { success: false }
	| {
			success: true
			email: string
			username: string
			newEmail: string
			verifySession: Awaited<ReturnType<typeof verifySessionStorage.getSession>>
	  }

export async function handleChangeEmailVerification({
	request,
	submission,
}: VerifyFunctionArgs): Promise<ChangeEmailReturnType> {
	await requireRecentVerification(request)
	invariant(submission, 'values should be defined by now')

	const verifySession = await verifySessionStorage.getSession(
		request.headers.get('cookie'),
	)
	const newEmail = verifySession.get(newEmailAddressSessionKey)
	if (!newEmail) {
		return { success: false }
	}
	const { target } = submission
	const preUpdateUser = await db.user.findFirstOrThrow({
		select: { email: true },
		where: { id: target },
	})

	const user = await db.user.update({
		where: { id: target },
		select: { id: true, email: true, username: true },
		data: { email: newEmail },
	})

	return {
		email: preUpdateUser.email,
		username: user.username,
		newEmail,
		success: true,
		verifySession,
	}
}

export async function deleteVerification({
	type,
	target,
}: z.infer<typeof Verify>) {
	await db.verification.delete({
		where: { target_type: { type, target } },
	})
}

export async function validateRequest(
	request: Request,
	body?: URLSearchParams | FormData,
) {
	const submission = await processForm({ request, schema: VerifyCode, body })

	if (submission.status !== 'success') {
		return formSubmissionErrors(submission)
	}

	const { value } = submission
	switch (value[typeQueryParam]) {
		case 'reset-password': {
			await deleteVerification(value)
			return handleResetPasswordVerification({ submission: value })
		}
		case 'onboarding': {
			await deleteVerification(value)
			return handleOnboardingVerification({ submission: value })
		}
		case 'change-email': {
			await deleteVerification(value)
			const verification = await handleChangeEmailVerification({
				request,
				submission: value,
			})
			if (!verification.success)
				return formSubmissionErrors(submission, {
					formErrors: [
						'You must submit the code on the same device that requested the email change.',
					],
				})
			const { email, newEmail, username, verifySession } = verification
			await sendEmail({
				to: email,
				subject: 'Email changed',
				react: <div>Your email has been changed to {newEmail}</div>,
			})

			return redirectWithToast(
				`/profiles/${username}/settings#profile-settings`,
				{
					title: 'Email Changed',
					type: 'success',
					description: `Your email has been changed to ${newEmail} and a confirmation email sent to ${email}`,
				},
				{
					headers: {
						'set-cookie':
							await verifySessionStorage.destroySession(verifySession),
					},
				},
			)
		}
		case '2fa': {
			return handleLoginVerification({ request, submission: value })
		}
		default:
			return badRequest({ errors: { code: 'Invalid code' } })
	}
}
