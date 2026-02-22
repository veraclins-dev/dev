import { z } from '#app/validations/index'

export const passwordRegex = /^(?=.*?[A-Za-z])(?=.*?\d).{6,30}$/

const Password = z
	.string()
	.min(6, {
		error: 'Password needs at least 6 characters for security.',
	})
	.max(30, {
		error: 'Password should be 30 characters or fewer.',
	})
	.regex(passwordRegex, {
		error: 'Password must include at least one letter and one number.',
	})

export const Name = z
	.string({
		error: (issue) =>
			issue.input === undefined
				? 'Please enter your name.'
				: 'Please enter a valid name.',
	})
	.min(3, {
		error: 'Name should be at least 3 characters.',
	})
	.max(60, {
		error: 'Name should be 60 characters or fewer.',
	})

export const reservedWords = [
	'admin',
	'login',
	'signup',
	'logout',
	'profile',
	'api',
	'auth',
	'settings',
	'dashboard',
]

export const usernameRegex = /^(?!-)[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/

export const Username = z
	.string({
		error: (issue) =>
			issue.input === undefined
				? 'Please choose a username.'
				: 'Please enter a valid username.',
	})
	.min(1, {
		error: 'Username should be at least 1 character.',
	})
	.max(30, {
		error: 'Username should be 30 characters or fewer.',
	})
	.regex(usernameRegex, {
		error:
			'Username can only use letters, numbers, and hyphens. It must not start or end with a hyphen.',
	})
	.refine((val) => !reservedWords.includes(val.toLowerCase()), {
		error: 'This username is reserved. Please choose a different one.',
	})

export const Email = z
	.email({
		error: (issue) =>
			issue.input === undefined
				? 'Please enter your email address.'
				: 'Please enter a valid email address.',
	})
	.min(3, {
		error: 'Email address should be at least 3 characters.',
	})
	.transform((value) => value.toLowerCase())

export const Signup = z.object({
	email: Email,
})

export const PasswordAndConfirmPassword = z
	.object({ password: Password, confirmPassword: Password })
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.issues.push({
				path: ['confirmPassword'],
				code: 'custom',
				message: 'Passwords must match.',
				input: '',
			})
		}
	})

const Create = z.object({
	username: Username,
	name: Name,
	agreeToTerms: z.literal('on', {
		error: (issue) =>
			issue.input === undefined
				? 'Please agree to the terms of service and privacy policy.'
				: undefined,
	}),
})

export const CreateAccount = Create.and(PasswordAndConfirmPassword)

export const ChangeEmail = z.object({
	email: Email,
})

export const Login = z.object({
	username: z.string().min(3, {
		error: 'Username or email should be at least 3 characters.',
	}),
	password: Password,
	remember: z.literal('on').optional(),
})

export const ForgotPassword = z.object({
	username: z.union([Email, Username], {
		error: (issue) =>
			issue.input === undefined
				? 'Please enter your email or username.'
				: 'Please enter a valid email or username.',
	}),
})

const types = [
	'onboarding',
	'reset-password',
	'change-email',
	'2fa',
	'',
] as const

export const VerificationType = z.enum(types, {
	error: () => 'Please select a valid verification type.',
})

export const ResendOTP = z.object({
	email: Email,
	type: VerificationType,
})
