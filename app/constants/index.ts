export const APP = {
  NAME: 'Invomaker.com',
  TITLE: 'Free Invoice Generator | No Signup Required',
  DESCRIPTION:
    'Easily create and customize professional invoices with our Free Invoice Generator. Whether you are a freelancer, small business owner, or entrepreneur, our tool helps you create accurate, professional invoices for free. Simply input your details, customize the invoice to fit your needs, and download it in PDF format—ready to send to your clients. No sign-up required',
};

export const APP_NAME = 'Invomaker.com';
export const MAX_FILE_SIZE = 5; // MB
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE * 1024 * 1024;

export const DEFAULT_OG_IMAGE_URL = 'https://invomaker.com/images/logo.png';
export const WEBSITE_URL = process?.env?.NEXT_PUBLIC_APP_URL;
export const APP_CATEGORY = 'Finance';
export const GA_PUBLISHER_ID = process?.env?.NEXT_PUBLIC_GA_PUBLISHER_ID;

export const GOOGLE_AD = {
  THANK_YOU_PAGE_SLOT: '7961627716',
  BLOG_PAGE_SLOT: '4481509717',
  HOMEPAGE_SLOT: '8165565864',
};

export const DEFAULT_METADATA = {
  metadataBase: new URL(
    process?.env?.NEXT_PUBLIC_APP_URL || 'https://invomaker.com'
  ),
};

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

export const AD_PRICE = {
  SEVEN_DAYS: 14.43,
};
