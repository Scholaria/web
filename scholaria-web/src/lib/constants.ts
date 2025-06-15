export const APP_NAME = 'Scholaria'

export const NAVIGATION_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'Resume Reading', href: '/resume-reading' },
  { name: 'Library', href: '/library' },
  { name: 'Profile', href: '/profile' },
] as const

export const INTERESTS = [
  'Mathematics',
  'Science',
  'History',
  'Literature',
  'Computer Science',
  'Languages',
  'Art',
  'Music',
] as const

export const READING_TYPES = ['book', 'article', 'paper'] as const

export const API_ROUTES = {
  AUTH: {
    SIGN_IN: '/api/auth/sign-in',
    SIGN_UP: '/api/auth/sign-up',
    SIGN_OUT: '/api/auth/sign-out',
  },
  USER: {
    PROFILE: '/api/user/profile',
    PREFERENCES: '/api/user/preferences',
  },
  READING: {
    LIST: '/api/reading',
    PROGRESS: '/api/reading/progress',
  },
} as const

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const 