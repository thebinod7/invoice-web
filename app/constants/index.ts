export const APP = {
  NAME: 'Invomaker.com',
  TITLE: 'Free Invoice Generator | No Signup Required',
  DESCRIPTION:
    'Easily create and customize professional invoices with our Free Invoice Generator. Whether you are a freelancer, small business owner, or entrepreneur, our tool helps you create accurate, professional invoices for free. Simply input your details, customize the invoice to fit your needs, and download it in PDF format—ready to send to your clients. No sign-up required',
};

export const APP_NAME = 'InvoMaker';
export const MAX_FILE_SIZE = 10; // MB

export const DEFAULT_OG_IMAGE_URL = 'https://invomaker.com/images/logo.png';

export const DEFAULT_METADATA = {
  metadataBase: new URL(
    process?.env?.NEXT_PUBLIC_APP_URL || 'https://invomaker.com'
  ),
};

export const SUPPORTED_CURRENCIES = [
  {
    label: 'AED',
    value: 'AED',
    symbol: 'AED',
  },
  {
    label: 'AUD',
    value: 'AUD',
    symbol: 'AUD',
  },
  {
    label: 'BDT',
    value: 'BDT',
    symbol: 'Tk',
  },
  {
    label: 'BRL',
    value: 'BRL',
    symbol: 'BRL',
  },
  {
    label: 'CAD',
    value: 'CAD',
    symbol: 'CAD',
  },
  {
    label: 'CNY',
    value: 'CNY',
    symbol: '元',
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
    label: 'HKD',
    value: 'HKD',
    symbol: 'HKD',
  },
  {
    label: 'INR',
    value: 'INR',
    symbol: '₹',
  },
  {
    label: 'JPY',
    value: 'JPY',
    symbol: '¥',
  },
  {
    label: 'MXN',
    value: 'MXN',
    symbol: 'MXN',
  },
  {
    label: 'NPR',
    value: 'NPR',
    symbol: 'रु',
  },
  {
    label: 'PKR',
    value: 'PKR',
    symbol: 'PKR',
  },
  {
    label: 'SGD',
    value: 'SGD',
    symbol: 'SGD',
  },
  {
    label: 'RUB',
    value: 'RUB',
    symbol: 'RUB',
  },
  {
    label: 'USD',
    value: 'USD',
    symbol: '$',
  },
  {
    label: 'ZAR',
    value: 'ZAR',
    symbol: 'R',
  },
];

export const NAV_LINKS = [
  { href: '/support', label: 'Support' },
  { href: '/faq', label: 'FAQs' },
  { href: '/free-invoice-maker', label: 'About Us' },
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

export const SOCIAL_LINKS = {
  FACEBOOK: 'https://www.facebook.com/profile.php?id=61575665694124',
  YOUTUBE: 'https://www.youtube.com/@invomaker',
};
