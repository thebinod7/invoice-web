export const APP = {
  NAME: 'Invomaker.com',
  TITLE: 'Free Invoice Generator | No Signup Required',
  DESCRIPTION:
    'Easily create and customize professional invoices with our Free Invoice Generator. Whether you are a freelancer, small business owner, or entrepreneur, our tool helps you create accurate, professional invoices for free. Simply input your details, customize the invoice to fit your needs, and download it in PDF format—ready to send to your clients. No sign-up required',
};

export const APP_NAME = 'Invomaker.com';
export const MAX_FILE_SIZE = 15; // MB

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
    label: 'AMD',
    value: 'AMD',
    symbol: 'AMD',
  },
  {
    label: 'ARS',
    value: 'ARS',
    symbol: 'ARS',
  },
  {
    label: 'AUD',
    value: 'AUD',
    symbol: 'AUD',
  },
  {
    label: 'AWG',
    value: 'AWG',
    symbol: 'AWG',
  },
  {
    label: 'AZN',
    value: 'AZN',
    symbol: 'AZN',
  },
  {
    label: 'BAM',
    value: 'BAM',
    symbol: 'KM',
  },
  {
    label: 'BDT',
    value: 'BDT',
    symbol: 'Tk',
  },
  {
    label: 'BGN',
    value: 'BGN',
    symbol: 'лв',
  },
  {
    label: 'BHD',
    value: 'BHD',
    symbol: 'BHD',
  },
  {
    label: 'BIF',
    value: 'BIF',
    symbol: 'BIF',
  },
  {
    label: 'BMD',
    value: 'BMD',
    symbol: 'BMD',
  },
  {
    label: 'BOB',
    value: 'BOB',
    symbol: 'BOB',
  },
  {
    label: 'BOV',
    value: 'BOV',
    symbol: 'BOV',
  },
  {
    label: 'BRL',
    value: 'BRL',
    symbol: 'BRL',
  },
  {
    label: 'BSD',
    value: 'BSD',
    symbol: 'BSD',
  },
  {
    label: 'BTN',
    value: 'BTN',
    symbol: 'BTN',
  },
  {
    label: 'BWP',
    value: 'BWP',
    symbol: 'BWP',
  },
  {
    label: 'BYN',
    value: 'BYN',
    symbol: 'BYN',
  },
  {
    label: 'BZD',
    value: 'BZD',
    symbol: 'BZD',
  },
  {
    label: 'CAD',
    value: 'CAD',
    symbol: 'CAD',
  },
  {
    label: 'CDF',
    value: 'CDF',
    symbol: 'CDF',
  },
  {
    label: 'CHE',
    value: 'CHE',
    symbol: 'CHE',
  },
  {
    label: 'CHF',
    value: 'CHF',
    symbol: 'CHF',
  },
  {
    label: 'CLF',
    value: 'CLF',
    symbol: 'CLF',
  },
  {
    label: 'COU',
    value: 'COU',
    symbol: 'COU',
  },
  {
    label: 'CHW',
    value: 'CHW',
    symbol: 'CHW',
  },
  {
    label: 'CNY',
    value: 'CNY',
    symbol: '元',
  },
  {
    label: 'CRC',
    value: 'CRC',
    symbol: 'CRC',
  },
  {
    label: 'CUC',
    value: 'CUC',
    symbol: 'CUC',
  },
  {
    label: 'CUP',
    value: 'CUP',
    symbol: 'CUP',
  },
  {
    label: 'CVE',
    value: 'CVE',
    symbol: 'CVE',
  },
  {
    label: 'DKK',
    value: 'DKK',
    symbol: 'DKK',
  },
  {
    label: 'DOP',
    value: 'DOP',
    symbol: 'DOP',
  },
  {
    label: 'DZD',
    value: 'DZD',
    symbol: 'DZD',
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
    label: 'YER',
    value: 'YER',
    symbol: 'YER',
  },
  {
    label: 'ZAR',
    value: 'ZAR',
    symbol: 'R',
  },
  {
    label: 'ZMW',
    value: 'ZMW',
    symbol: 'ZMW',
  },
  {
    label: 'ZWL',
    value: 'ZWL',
    symbol: 'ZWL',
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

export const SEO_KEYWORDS = [
  'invoice generator',
  'free invoice template',
  'create invoice',
  'download invoice',
  'online invoice generator',
  'professional invoices',
  'PDF invoice',
  'invoice maker',
  'free invoice maker',
];
