export const APP = {
  TITLE: 'Free Invoice Generator | No Signup Required',
  DESCRIPTION:
    'Easily create and customize professional invoices with our Free Invoice Generator. Whether you are a freelancer, small business owner, or entrepreneur, our tool helps you create accurate, professional invoices for free. Simply input your details, customize the invoice to fit your needs, and download it in PDF format—ready to send to your clients. No sign-up required',
};

export const DEFAULT_OG_IMAGE_URL = 'https://invomaker.com/images/logo.png';

export const DEFAULT_METADATA = {
  metadataBase: new URL(
    process?.env?.NEXT_PUBLIC_APP_URL || 'https://invomaker.com'
  ),
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
  { href: '/contact', label: 'Contact Us' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
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
