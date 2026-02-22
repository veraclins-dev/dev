import { z } from '#app/validations/index'
import {
	authenticate,
	checkIsCommonPassword,
} from '../auth/auth.server'

import { getUser } from './user.server'
import {
	ChangeEmail,
	CreateAccount,
	ForgotPassword,
	Login,
	PasswordAndConfirmPassword,
	Signup,
} from './validations'

export const UniqueSignup = Signup.superRefine(
	async ({ email }, ctx) => {
		const existingUser = await getUser({
			where: { email },
			select: { id: true },
		})
		if (existingUser) {
			ctx.issues.push({
				path: ['email'],
				code: 'custom',
				message: 'A user account already exists with this email',
				input: '',
			})
		}
	},
)

export const CreateUniqueAccount = CreateAccount.superRefine(
	async ({ username, password }, ctx) => {
		const existingUser = await getUser({
			where: { username },
			select: { id: true },
		})
		if (existingUser) {
			ctx.issues.push({
				path: ['username'],
				code: 'custom',
				message: 'A user already exists with this username',
				input: '',
			})
			return
		}
		const isCommonPassword = await checkIsCommonPassword(password)
		if (isCommonPassword) {
			ctx.issues.push({
				path: ['password'],
				code: 'custom',
				message: 'Password is too common',
				input: '',
			})
		}
	},
)

export const ChangeUniqueEmail = ChangeEmail.superRefine(async (data, ctx) => {
	const existingUser = await getUser({
		where: { email: data.email },
	})
	if (existingUser) {
		ctx.issues.push({
			path: ['email'],
			code: 'custom',
			message: 'This email is already in use.',
			input: '',
		})
	}
})

export const LoginWithCheck = Login.transform(async (data, ctx) => {
	const userId = await authenticate(data.username, data.password)
	if (!userId) {
		ctx.issues.push({
			code: 'custom',
			message: "We couldn't find an account with those credentials.",
			input: '',
		})
		return z.NEVER
	}
	return { ...data, userId }
})

export const ForgotPasswordWithCheck = ForgotPassword.transform(
	async ({ username }, ctx) => {
		const user = await getUser({
			where: { OR: [{ email: username }, { username }] },
			select: { email: true, username: true },
		})
		if (!user) {
			ctx.issues.push({
				code: 'custom',
				message: "We couldn't find an account with this username or email",
				input: '',
			})
			return z.NEVER
		}
		return user
	},
)

export const ResetPassword = PasswordAndConfirmPassword.superRefine(
	async ({ password }, ctx) => {
		const isCommonPassword = await checkIsCommonPassword(password)
		if (isCommonPassword) {
			ctx.issues.push({
				path: ['password'],
				code: 'custom',
				message: 'Password is too common',
				input: '',
			})
		}
	},
)
