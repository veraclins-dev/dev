const baseVariants = {
  variants: {
    variant: {
      solid: '',
      outline: 'bg-transparent',
      soft: '',
    },
    color: {
      primary: 'focus:ring-primary/50 focus-visible:ring-primary/50',
      secondary: 'focus:ring-secondary/50 focus-visible:ring-secondary/50',
      destructive:
        'focus:ring-destructive/50 focus-visible:ring-destructive/50',
      success: 'focus:ring-success/50 focus-visible:ring-success/50',
      warning: 'focus:ring-warning/50 focus-visible:ring-warning/50',
      info: 'focus:ring-info/50 focus-visible:ring-info/50',
      neutral: 'focus:ring-neutral/50 focus-visible:ring-neutral/50',
    },
  },
  compoundVariants: [
    // Solid variant styles
    {
      variant: 'solid',
      color: 'primary',
      className: [
        'border-primary',
        'bg-primary',
        'text-primary-foreground',
        'hover:bg-primary-hover',
      ],
    },
    {
      variant: 'solid',
      color: 'secondary',
      className: [
        'border-secondary',
        'bg-secondary',
        'text-secondary-foreground',
        'hover:bg-secondary-hover',
      ],
    },
    {
      variant: 'solid',
      color: 'destructive',
      className: [
        'border-destructive',
        'bg-destructive',
        'text-destructive-foreground',
        'hover:bg-destructive-hover',
      ],
    },
    {
      variant: 'solid',
      color: 'success',
      className: [
        'border-success',
        'bg-success',
        'text-success-foreground',
        'hover:bg-success-hover',
      ],
    },
    {
      variant: 'solid',
      color: 'warning',
      className: [
        'border-warning',
        'bg-warning',
        'text-warning-foreground',
        'hover:bg-warning-hover',
      ],
    },
    {
      variant: 'solid',
      color: 'info',
      className: [
        'border-info',
        'bg-info',
        'text-info-foreground',
        'hover:bg-info-hover',
      ],
    },
    {
      variant: 'solid',
      color: 'neutral',
      className: [
        'border-neutral',
        'bg-neutral',
        'text-neutral-foreground',
        'hover:bg-neutral-hover',
      ],
    },
    // Outline variant styles
    {
      variant: 'outline',
      color: 'primary',
      className: [
        'border-primary',
        'text-primary',
        'hover:bg-primary-soft',
        'data-[active=true]:bg-primary-soft',
        'hover:text-primary-soft-foreground',
      ],
    },
    {
      variant: 'outline',
      color: 'secondary',
      className: [
        'border-secondary',
        'text-secondary',
        'hover:bg-secondary-soft',
        'data-[active=true]:bg-secondary-soft',
        'hover:text-secondary-soft-foreground',
      ],
    },
    {
      variant: 'outline',
      color: 'destructive',
      className: [
        'border-destructive',
        'text-destructive',
        'hover:bg-destructive-soft',
        'data-[active=true]:bg-destructive-soft',
        'hover:text-destructive-soft-foreground',
      ],
    },
    {
      variant: 'outline',
      color: 'success',
      className: [
        'border-success',
        'text-success',
        'hover:bg-success-soft',
        'data-[active=true]:bg-success-soft',
        'hover:text-success-soft-foreground',
      ],
    },
    {
      variant: 'outline',
      color: 'warning',
      className: [
        'border-warning',
        'text-warning',
        'hover:bg-warning-soft',
        'data-[active=true]:bg-warning-soft',
        'hover:text-warning-soft-foreground',
      ],
    },
    {
      variant: 'outline',
      color: 'info',
      className: [
        'border-info',
        'text-info',
        'hover:bg-info-soft',
        'data-[active=true]:bg-info-soft',
        'hover:text-info-soft-foreground',
      ],
    },
    {
      variant: 'outline',
      color: 'neutral',
      className: [
        'border-neutral-foreground',
        'text-neutral-foreground',
        'hover:bg-neutral-soft',
        'data-[active=true]:bg-neutral-soft',
        'hover:text-neutral-soft-foreground',
      ],
    },
    // Soft variant styles
    {
      variant: 'soft',
      color: 'primary',
      className: [
        'border-primary-soft',
        'bg-primary-soft',
        'text-primary-soft-foreground',
        'hover:bg-primary-soft-hover',
      ],
    },
    {
      variant: 'soft',
      color: 'secondary',
      className: [
        'border-secondary-soft',
        'bg-secondary-soft',
        'text-secondary-soft-foreground',
        'hover:bg-secondary-soft-hover',
      ],
    },
    {
      variant: 'soft',
      color: 'destructive',
      className: [
        'border-destructive-soft',
        'bg-destructive-soft',
        'text-destructive-soft-foreground',
        'hover:bg-destructive-soft-hover',
      ],
    },
    {
      variant: 'soft',
      color: 'success',
      className: [
        'border-success-soft',
        'bg-success-soft',
        'text-success-soft-foreground',
        'hover:bg-success-soft-hover',
      ],
    },
    {
      variant: 'soft',
      color: 'warning',
      className: [
        'border-warning-soft',
        'bg-warning-soft',
        'text-warning-soft-foreground',
        'hover:bg-warning-soft-hover',
      ],
    },
    {
      variant: 'soft',
      color: 'info',
      className: [
        'border-info-soft',
        'bg-info-soft',
        'text-info-soft-foreground',
        'hover:bg-info-soft-hover',
      ],
    },
    {
      variant: 'soft',
      color: 'neutral',
      className: [
        'border-neutral-soft',
        'bg-neutral-soft',
        'text-neutral-soft-foreground',
        'hover:bg-neutral-soft-hover',
      ],
    },
  ] as const,
};

// Button and link specific text and plain variant compound styles
const baseActionCompoundVariants = [
  // Text variant styles
  {
    variant: 'text',
    color: 'primary',
    className: [
      'text-primary',
      'hover:bg-primary-soft',
      'data-[active=true]:bg-primary-soft',
      'hover:text-primary-soft-foreground',
    ],
  },
  {
    variant: 'text',
    color: 'secondary',
    className: [
      'text-secondary',
      'hover:bg-secondary-soft',
      'data-[active=true]:bg-secondary-soft',
      'hover:text-secondary-soft-foreground',
    ],
  },
  {
    variant: 'text',
    color: 'destructive',
    className: [
      'text-destructive',
      'hover:bg-destructive-soft',
      'data-[active=true]:bg-destructive-soft',
      'hover:text-destructive-soft-foreground',
    ],
  },
  {
    variant: 'text',
    color: 'success',
    className: [
      'text-success',
      'hover:bg-success-soft',
      'data-[active=true]:bg-success-soft',
      'hover:text-success-soft-foreground',
    ],
  },
  {
    variant: 'text',
    color: 'warning',
    className: [
      'text-warning',
      'hover:bg-warning-soft',
      'data-[active=true]:bg-warning-soft',
      'hover:text-warning-soft-foreground',
    ],
  },
  {
    variant: 'text',
    color: 'info',
    className: [
      'text-info',
      'hover:bg-info-soft',
      'data-[active=true]:bg-info-soft',
      'hover:text-info-soft-foreground',
    ],
  },
  {
    variant: 'text',
    color: 'neutral',
    className: [
      'text-neutral-foreground',
      'hover:bg-neutral-soft',
      'data-[active=true]:bg-neutral-soft',
      'hover:text-neutral-soft-foreground',
    ],
  },
] as const;

export { baseActionCompoundVariants, baseVariants };
