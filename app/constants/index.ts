export const APP = {
    NAME: 'Invoice Generator',
    DESCRIPTION: 'Generate free invoices',
};

export const GENDER_TYPES = {
    MALE: 'MALE',
    FEMALE: 'FEMALE',
    OTHER: 'OTHER',
    UNKNOWN: 'UNKNOWN',
};

export const DROPZONE = {
    MAX_UPLOAD_SIZE: 5048576, // 1MB
    MAX_FILES: 1,
    ERROR_CODE: {
        MAX_FILES: 'file-too-many',
        MAX_SIZE: 'file-too-large',
        INVALID_TYPE: 'file-invalid-type',
    },
};

export const NAV_LINKS = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact Us' },
];

export const OUR_SERVICES = [
    {
        id: 1,
        name: 'Apply Visa',
        description: 'Apply for visa to your favorite destination.',
        image: '/images/evisa.png',
    },
    {
        id: 2,
        name: 'Apply Visa',
        description: 'Apply for visa to your favorite destination.',
        image: '/images/evisa.png',
    },
    {
        id: 3,
        name: 'Apply Visa',
        description: 'Apply for visa to your favorite destination.',
        image: '/images/evisa.png',
    },
    {
        id: 4,
        name: 'Apply Visa',
        description: 'Apply for visa to your favorite destination.',
        image: '/images/evisa.png',
    },
];

export const APPLYING_FROM_COUNTRIES = [
    { value: 'Nepal', label: 'Nepal' },
    { value: 'UAE', label: 'United Arab Emirates' },
];

export const APPLYING_TO_COUNTRIES = [
    { value: 'Indonesia', label: 'Indonesia' },
    { value: 'Kuwait', label: 'Kuwait' },
    { value: 'Malaysia', label: 'Malaysia' },
    { value: 'Oman', label: 'Oman' },
    { value: 'Qatar', label: 'Qatar' },
    { value: 'Saudi Arabia', label: 'Saudi Arabia' },
    { value: 'Thailand', label: 'Thailand' },
    { value: 'UAE', label: 'United Arab Emirates' },
    { value: 'Veitnam', label: 'Veitnam' },
];

export const VISA_TYPES = [
    { value: 'Tourist', label: 'Tourist' },
    { value: 'Family', label: 'Family' },
    { value: 'Business', label: 'Business' },
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

export const FORM_STEP = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
};

export const SONNER_CONFIG = {
    duration: 5000, // 5 seconds
};

export const LOGGED_IN_MENU = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/profile', label: 'My Profile' },
    { href: '/my-submissions', label: 'My Submissions' },
];

export const SUBMISSION_STATUS = {
    PENDING: 'PENDING',
    IN_REVIEW: 'IN_REVIEW',
    VISA_GRANTED: 'VISA_GRANTED',
    DISMISSED: 'DISMISSED',
};

export const TABS = {
    DOCUMENTS: 'Documents',
    PERSONAL_DETAILS: 'Personal Details',
    CONTACT_DETAILS: 'Contact Details',
};
