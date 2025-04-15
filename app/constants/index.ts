export const APP = {
  NAME: 'Invoice Generator',
  DESCRIPTION: 'Generate free invoices',
};

export const SUPPORTED_CURRENCIES = [
  {
    label: 'USD',
    value: 'USD',
    symbol: '$',
  },
  {
    label: 'EUR',
    value: 'EUR',
    symbol: '€',
  },
  {
    label: 'GBP',
    value: 'GBP',
    symbol: '£',
  },
  {
    label: 'JPY',
    value: 'JPY',
    symbol: '¥',
  },
  {
    label: 'INR',
    value: 'INR',
    symbol: '₹',
  },
];

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact Us' },
];

export const APP_PATHS = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  CONTACT: '/contact',
  APPLICATION_FORM: '/application-form',
  SUBMISSIONS: '/dashboard/submissions',
  DASHBOARD: '/dashboard',
  LOGIN: '/login',
};

export const SONNER_CONFIG = {
  duration: 5000, // 5 seconds
};
