import { type Config } from 'tailwindcss';

export const extendedTheme = {
  colors: {
    border: 'hsl(var(--border))',
    input: {
      DEFAULT: 'hsl(var(--input))',
      foreground: 'hsl(var(--input-foreground))',
      invalid: 'hsl(var(--input-invalid))',
    },
    ring: {
      DEFAULT: 'hsl(var(--ring))',
      invalid: 'hsl(var(--foreground-destructive))',
    },
    background: 'hsl(var(--background))',
    foreground: {
      DEFAULT: 'hsl(var(--foreground))',
      destructive: 'hsl(var(--foreground-destructive))',
    },
    primary: {
      DEFAULT: 'hsl(var(--primary))',
      foreground: 'hsl(var(--primary-foreground))',
    },
    'primary-light': {
      DEFAULT: 'hsl(var(--primary-light))',
      foreground: 'hsl(var(--primary-light-foreground))',
    },
    secondary: {
      DEFAULT: 'hsl(var(--secondary))',
      foreground: 'hsl(var(--secondary-foreground))',
    },
    'secondary-light': {
      DEFAULT: 'hsl(var(--secondary-light))',
      foreground: 'hsl(var(--secondary-light-foreground))',
    },
    destructive: {
      DEFAULT: 'hsl(var(--destructive))',
      foreground: 'hsl(var(--destructive-foreground))',
    },
    muted: {
      DEFAULT: 'hsl(var(--muted))',
      foreground: 'hsl(var(--muted-foreground))',
    },
    accent: {
      DEFAULT: 'hsl(var(--accent))',
      foreground: 'hsl(var(--accent-foreground))',
    },
    card: {
      DEFAULT: 'hsl(var(--card))',
      foreground: 'hsl(var(--card-foreground))',
      active: 'hsl(var(--card-active))',
    },
    'card-inner': {
      DEFAULT: 'hsl(var(--inner-card))',
    },
    'card-inner-light': {
      DEFAULT: 'hsl(var(--inner-card-light))',
    },
    badge: {
      DEFAULT: 'hsl(var(--badge))',
      foreground: 'hsl(var(--badge-foreground))',
    },
    avatar: {
      DEFAULT: 'hsl(var(--avatar))',
      hover: 'hsl(var(--avatar-hover))',
    },
    brand: {
      purple: 'hsl(var(--brand-purple))',
      'light-purple': 'hsl(var(--brand-light-purple))',
      'dark-purple': 'hsl(var(--brand-dark-purple))',
      gray: 'hsl(var(--brand-gray))',
      'light-gray': 'hsl(var(--brand-light-gray))',
      white: 'hsl(var(--brand-white))',
      slate: 'hsl(var(--brand-slate))',
      'off-white': 'hsl(var(--brand-off-white))',
      smoke: 'hsl(var(--brand-smoke))',
      yellow: 'hsl(var(--brand-yellow))',
      lightening: 'hsl(var(--brand-lightening))',
      silver: 'hsl(var(--brand-silver))',
      mercury: 'hsl(var(--brand-mercury))',
      red: 'hsl(var(--brand-red))',
      linkedIn: 'hsl(201, 100%, 35%, 1)',
      instagram: 'hsl(0, 88%, 44%, 0.1608)',
      x: 'hsl(0, 0%, 0%, 1)',
    },
    twitter: {
      50: '#E5F4FD',
      100: '#C8E9FB',
      200: '#A8DCFA',
      300: '#83CDF7',
      400: '#57BBF5',
      500: '#1DA1F2',
      600: '#1A94DA',
      700: '#1681BF',
      800: '#136B9E',
      900: '#0D4D71',
    },
    facebook: {
      50: '#E8F4F9',
      100: '#D9DEE9',
      200: '#B7C2DA',
      300: '#6482C0',
      400: '#4267B2',
      500: '#385898',
      600: '#314E89',
      700: '#29487D',
      800: '#223B67',
      900: '#1E355B',
    },
    night: {
      100: '#DADADA',
      200: '#AAAAAA',
      300: '#717171',
      400: '#494949',
      500: '#1E1E20',
      600: '#141414',
      700: '#090909',
    },
    day: {
      100: '#F7F5FF',
      200: '#E4E4FB',
      300: '#DDDDF4',
      400: '#D0D0E8',
      500: '#9696E0',
      600: '#9999CC',
      700: '#6A44FF',
    },
  },

  animation: {
    'accordion-down': 'accordion-down 0.2s ease-out',
    'accordion-up': 'accordion-up 0.2s ease-out',
  },

  borderRadius: {
    lg: 'var(--radius)',
    md: 'calc(var(--radius) - 2px)',
    sm: 'calc(var(--radius) - 4px)',
  },
  fontSize: {
    // 1rem = 16px
    /** 80px size / 84px high / bold */
    mega: ['5rem', { lineHeight: '5.25rem', fontWeight: '700' }],
    /** 56px size / 62px high / bold */
    h1: ['3.5rem', { lineHeight: '3.875rem', fontWeight: '700' }],
    /** 40px size / 48px high / bold */
    h2: ['2.5rem', { lineHeight: '3rem', fontWeight: '700' }],
    /** 32px size / 36px high / bold */
    h3: ['2rem', { lineHeight: '2.25rem', fontWeight: '700' }],
    /** 28px size / 36px high / bold */
    h4: ['1.75rem', { lineHeight: '2.25rem', fontWeight: '700' }],
    /** 24px size / 32px high / bold */
    h5: ['1.5rem', { lineHeight: '2rem', fontWeight: '700' }],
    /** 16px size / 20px high / bold */
    h6: ['1rem', { lineHeight: '1.25rem', fontWeight: '700' }],

    /** 32px size / 36px high / normal */
    'body-2xl': ['2rem', { lineHeight: '2.25rem' }],
    /** 28px size / 36px high / normal */
    'body-xl': ['1.75rem', { lineHeight: '2.25rem' }],
    /** 24px size / 32px high / normal */
    'body-lg': ['1.5rem', { lineHeight: '2rem' }],
    /** 20px size / 28px high / normal */
    'body-md': ['1.25rem', { lineHeight: '1.75rem' }],
    /** 16px size / 20px high / normal */
    'body-sm': ['1rem', { lineHeight: '1.25rem' }],
    /** 14px size / 18px high / normal */
    'body-xs': ['0.875rem', { lineHeight: '1.125rem' }],
    /** 12px size / 16px high / normal */
    'body-2xs': ['0.75rem', { lineHeight: '1rem' }],

    /** 18px size / 24px high / semibold */
    caption: ['1.125rem', { lineHeight: '1.5rem', fontWeight: '600' }],
    /** 12px size / 16px high / bold */
    button: ['0.75rem', { lineHeight: '1rem', fontWeight: '700' }],
  },
  transitionProperty: {
    width: 'width',
    display: 'display',
    height: 'height',
    visibility: 'visibility',
  },
  boxShadow: {
    round: '0 0 50px rgba(0, 0, 0, 0.5)',
    bottom: '0 4px 2px -2px rgb(0 0 0 / 0.1)',
    raise: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
  minHeight: {
    '1/4': '25%',
    '1/3': '33.33%',
    '1/2': '50%',
    '2/3': '66.66%',
    '3/4': '75%',
  },
  minWidth: {
    '1/4': '25%',
    '1/3': '33.33%',
    '1/2': '50%',
    '2/3': '66.66%',
    '3/4': '75%',
  },
  maxHeight: {
    '1/4': '25%',
    '1/3': '33.33%',
    '1/2': '50%',
    '2/3': '66.66%',
    '3/4': '75%',
  },
  maxWidth: {
    '1/4': '25%',
    '1/3': '33.33%',
    '1/2': '50%',
    '2/3': '66.66%',
    '3/4': '75%',
  },
  height: {
    0.75: '0.1875rem',
  },
  width: {
    99: '99%',
  },
  backgroundImage: {
    'profile-hero': "url('/mask.svg')",
    checkered: `repeating-conic-gradient(
      #3D3D3D 0% 25%, #FFFFFF 0% 50%)
      50% / 12px 12px`,
  },
  screens: {
    vl: '1200px',
    xl: '1440px',
    '2xl': '1800px',
  },
} satisfies Config['theme'];
