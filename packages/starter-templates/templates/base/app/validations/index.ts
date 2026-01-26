import { humanize, z } from '@veraclins-dev/utils';

z.config({
	customError: (issue) => {
		if (issue.code === 'invalid_type') {
			if (issue.path && typeof issue.path === 'string')
				return humanize(`Please provide a value for ${issue.path}`);
			if (issue.path && typeof issue.path[0] === 'string')
				return humanize(`Please provide a value for ${issue.path[0]}`);
			return 'Please fill in this field';
		}
		return undefined; // Let Zod use default error
	},
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Values<S extends z.ZodType<any, any>> = z.TypeOf<S> & {
	[key: string]: string | string[];
};

export const Delete = z.object({
	confirm: z.literal('permanently delete', {
		error: (issue) => {
			if (issue.code === 'invalid_value') {
				return "Must be exactly 'permanently delete'";
			}
			return undefined;
		},
	}),
});

export const GroupSearch = z.object({
	searchQuery: z.string().optional(),
	groupId: z.string().min(1),
});

export const ThemeSchema = z.object({
	theme: z.enum(['system', 'light', 'dark']),
});

export const LogDetails = z.object({
	reason: z.string().optional(),
	notes: z.string().optional(),
	userAgent: z.string().nullable().optional(),
	ipAddress: z.string().nullable().optional(),
	location: z.string().nullable().optional(),
	device: z.string().nullable().optional(),
	browser: z.string().nullable().optional(),
	os: z.string().nullable().optional(),
	impact: z.enum(['low', 'medium', 'high', 'critical']).optional(),
	previousValue: z.string().optional(),
	updatedValue: z.string().optional(),
});

export type LogDetailsType = z.infer<typeof LogDetails>;

export { z };
