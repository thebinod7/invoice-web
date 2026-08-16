export const APP = {
    NAME: 'Invomaker.com',
    TITLE: 'Invomaker — Create, Send & Track Invoices Free',
    DESCRIPTION:
        'Create professional invoices in seconds and send them directly to clients — no signup needed. Free invoice generator trusted by freelancers and small businesses worldwide.',
}

export const APP_NAME = 'Invomaker'
export const MAX_FILE_SIZE = 1
export const MAX_FILE_SIZE_PRO = 5

export const DEFAULT_OG_IMAGE_URL = 'https://invomaker.com/images/logo.png'
export const WEBSITE_URL = process?.env?.NEXT_PUBLIC_APP_URL
export const APP_CATEGORY = 'Finance'
export const GA_PUBLISHER_ID = process?.env?.NEXT_PUBLIC_GA_PUBLISHER_ID

export const GOOGLE_AD = {
    THANK_YOU_PAGE_SLOT: '7961627716',
    BLOG_PAGE_SLOT: '4481509717',
    HOMEPAGE_SLOT: '8165565864',
    TOOLS_SLOT: '5088663420',
}

export const DEFAULT_METADATA = {
    metadataBase: new URL(process?.env?.NEXT_PUBLIC_APP_URL || 'https://invomaker.com'),
}

export const NAV_LINKS = [
    { href: '/support', label: 'Support' },
    { href: '/faq', label: 'FAQs' },
    { href: '/free-invoice-maker', label: 'About Us' },
]

export const APP_PATHS = {
    AUTH: '/auth',
    SIGNUP: '/signup',
    HOME: '/',
    ABOUT: '/about',
    BLOG: '/blog',
    PRICING: '/pricing',
    CREATE_INVOICE: '/create-invoice',
    SERVICES: '/services',
    CONTACT: '/contact',
    DASHBOARD: {
        MY_USAGE: '/dashboard/my-usage',
        FEEDBACK: '/dashboard/feedback',
        HOME: '/dashboard',
        INVOICES: '/dashboard/my-invoices',
        CLIENTS: '/dashboard/clients',
        CLIENTS_CREATE: '/dashboard/clients/create',
        CLIENTS_EDIT: '/dashboard/clients/edit',
        PROFILE: '/dashboard/profile',
        MY_REFERRALS: '/dashboard/my-referrals',
        SUBSCRIPTION: '/dashboard/subscription',
    },
}

export const SONNER_CONFIG = {
    duration: 5000, // 5 seconds
}

export const SOCIAL_LINKS = {
    FACEBOOK: 'https://www.facebook.com/profile.php?id=61575665694124',
    YOUTUBE: 'https://www.youtube.com/@invomaker',
}

export const TOOLS_LIST = {
    TIMEZONE: '/tools/timezone-converter',
    CURRENCY: '/tools/currency-converter',
    INVOICE: '/create-invoice',
}

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
]

export const AD_PRICE = {
    SEVEN_DAYS: 14.43,
}

export const GENDER = {
    MALE: 'MALE',
    FEMALE: 'FEMALE',
    OTHER: 'OTHER',
    UNKNOWN: 'UNKNOWN',
}

export const PAZE_SIZE = 10
export const INVOICE_STATUS = {
    CREATED: 'CREATED',
    SENT: 'SENT',
    PAID: 'PAID',
    CANCELLED: 'CANCELLED',
}
export const DEFAULT_CURRENCY = 'USD'

export const DEF_FIRST_NAME = 'User'
export const DEF_LAST_NAME = 'Invomaker'
