import { z } from '../../validations';

export const passwordRegex = /^(?=.*?[A-Za-z])(?=.*?\d).{6,30}$/;

const Password = z
  .string()
  .min(6, 'Password is too short')
  .max(30, 'Password is too long')
  .regex(passwordRegex, 'Should have at least one letter and number');

export const Name = z
  .string({
    required_error: 'Name is required',
    invalid_type_error: 'Name is required',
  })
  .min(3, { message: 'Name is too short' })
  .max(60, { message: 'Name is too long' });

export const Username = z
  .string({
    required_error: 'Username is required',
    invalid_type_error: 'Username is required',
  })
  .min(6, { message: 'Username is too short' })
  .max(20, { message: 'Username is too long' })
  .regex(
    /^(?!\d)(?!.*-$)(?!-)[a-zA-Z0-9-_]{6,20}$/,
    'Username can only include letters, numbers, and underscores and hyphens',
  );

export const Email = z
  .string({
    required_error: 'Email is required',
    invalid_type_error: 'Email is required',
  })
  .email()
  .min(3, 'Email is too short')
  .max(100, 'Email is too long')
  // users can type the email in any case, but we store it in lowercase
  .transform((value) => value.toLowerCase());

export const RefCode = z
  .string()
  .trim()
  .length(8, 'Enter complete code')
  .regex(/^[A-Za-z0-9]+$/, {
    message: 'Referral code must be alphanumeric only',
  })
  .transform((value) => value.toUpperCase())
  .optional();

export const Channel = z
  .string()
  .optional()
  .transform((value) => {
    if (value) {
      return value.replace(/[/\\].*$/, '');
    }
    return value;
  });

export const Signup = z.object({
  email: Email,
  referralCode: RefCode,
  channel: Channel,
});

export const PasswordAndConfirmPassword = z
  .object({ password: Password, confirmPassword: Password })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        path: ['confirmPassword'],
        code: 'custom',
        message: 'The passwords must match',
      });
    }
  });

const Create = z.object({
  username: Username,
  name: Name,
  referral: RefCode,
  channel: Channel,
  agreeToTerms: z.literal('on', {
    required_error: 'You must agree to the terms of service and privacy policy',
  }),
});

export const CreateAccount = Create.and(PasswordAndConfirmPassword);

export const CreateAccountSocial = Create.extend({
  imageUrl: z.string().optional(),
});

export const ChangeEmail = z.object({
  email: Email,
});

export const ResetPassword = PasswordAndConfirmPassword;

export const Login = z.object({
  username: z.string().min(3),
  password: Password,
  remember: z.literal('on').optional(),
});

export const ForgotPassword = z.object({
  username: z.union([Email, Username]),
});

export const ProfileOne = z
  .object({
    interests: z.string().min(10, 'Should have at least 1 item').nullable(),
  })
  .partial();

export const ProfileTwo = z.object({
  name: z.string().min(3).optional(),
  profileImage: z.string().optional(),
  coverImage: z.string().optional(),
  aboutMe: z.string().min(20).max(500).nullable(),
});

export const ProfileThree = z.object({
  schoolType: z.string().min(3).optional(),
  school: z.string().min(3).optional(),
  course: z.string().min(3).optional(),
  location: z.string().min(3).optional(),
});

export const Profile = z.object({
  name: z.string().min(3).optional().nullable(),
  profileImage: z.string().optional().nullable(),
  coverImage: z.string().optional().nullable(),
  aboutMe: z.string().min(20).max(500).optional().nullable(),
  schoolType: z.string().min(3).optional().nullable(),
  school: z.string().min(3).optional().nullable(),
  course: z.string().min(3).optional().nullable(),
  location: z.string().min(3).optional().nullable(),
  interests: z.string().min(10, 'Should have at least 1 item').optional(),
});

export const GetProfile = z.object({
  id: z.string().optional(),
});

const types = [
  'onboarding',
  'reset-password',
  'change-email',
  '2fa',
  '',
] as const;
export const VerificationType = z.enum(types);

export const ResendOTP = z.object({
  email: Email,
  type: VerificationType,
});
