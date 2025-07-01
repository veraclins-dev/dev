import { cva } from 'class-variance-authority';

/**
 * Calendar navigation button variants
 */
export const calendarNavButtonVariants = cva(
  'calendar-nav-button inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-6 w-6',
        md: 'h-8 w-8',
        lg: 'h-10 w-10',
      },
      variant: {
        default: 'hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'ghost',
    },
  },
);

/**
 * Calendar grid variants
 */
export const calendarGridVariants = cva('calendar-grid grid w-full', {
  variants: {
    size: {
      sm: 'calendar-grid-sm gap-1',
      md: 'calendar-grid-md gap-1',
      lg: 'calendar-grid-lg gap-2',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

/**
 * Calendar week header variants
 */
export const calendarWeekHeaderVariants = cva(
  'calendar-week-header grid grid-cols-7 min-w-64',
  {
    variants: {
      size: {
        sm: 'calendar-week-header-sm gap-1',
        md: 'calendar-week-header-md gap-1',
        lg: 'calendar-week-header-lg gap-2',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

/**
 * Calendar week header cell variants
 */
export const calendarWeekHeaderCellVariants = cva(
  'calendar-week-header-cell flex items-center justify-center text-muted-foreground font-medium',
  {
    variants: {
      size: {
        sm: 'h-6 text-xs',
        md: 'h-8 text-sm',
        lg: 'h-10 text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

/**
 * Calendar week variants
 */
export const calendarWeekVariants = cva('calendar-week grid grid-cols-7', {
  variants: {
    size: {
      sm: 'calendar-week-sm gap-1',
      md: 'calendar-week-md gap-1',
      lg: 'calendar-week-lg gap-2',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

/**
 * Calendar footer variants
 */
export const calendarFooterVariants = cva(
  'calendar-footer flex items-center justify-center pt-2',
  {
    variants: {
      size: {
        sm: 'calendar-footer-sm',
        md: 'calendar-footer-md',
        lg: 'calendar-footer-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

/**
 * Calendar today button variants
 */
export const calendarTodayButtonVariants = cva(
  'calendar-today-button inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-6 px-2 text-xs',
        md: 'h-8 px-3 text-sm',
        lg: 'h-10 px-4 text-base',
      },
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'outline',
    },
  },
);
