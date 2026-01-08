import { MAX_FILE_SIZE, MAX_FILE_SIZE_PRO } from '.';

export enum FeatureKey {
  INVOICE_EMAIL_LIMIT = 'INVOICE_EMAIL_LIMIT',
  INVOICE_EDIT_DOWNLOAD_LIMIT = 'INVOICE_EDIT_DOWNLOAD_LIMIT',
  INVOICE_STATUS_UPDATE = 'INVOICE_STATUS_UPDATE',
  LOGO_UPLOAD_SIZE_IN_MB = 'LOGO_UPLOAD_SIZE_IN_MB',
  CC_INVOICE_EMAIL = 'CC_INVOICE_EMAIL',
  MANAGE_CLIENT_LIMIT = 'MANAGE_CLIENT_LIMIT',
  INVOICE_REMINDER_LIMIT = 'INVOICE_REMINDER_LIMIT',
}

export enum PLAN_CODES {
  FREE = 'FREE',
  STARTER = 'STARTER',
  PRO = 'PRO',
  ENTERPRISE = 'ENTERPRISE',
  CUSTOM = 'CUSTOM',
}

// Only for reference
export const PLAN_FEATURES = {
  [PLAN_CODES.FREE]: {
    [FeatureKey.INVOICE_EMAIL_LIMIT]: 6, // per year
    [FeatureKey.INVOICE_EDIT_DOWNLOAD_LIMIT]: 3,
    [FeatureKey.INVOICE_STATUS_UPDATE]: true, // False later
    [FeatureKey.LOGO_UPLOAD_SIZE_IN_MB]: 1, // 1MB
    [FeatureKey.CC_INVOICE_EMAIL]: false,
    [FeatureKey.MANAGE_CLIENT_LIMIT]: 0,
  },
  [PLAN_CODES.STARTER]: {
    [FeatureKey.INVOICE_EMAIL_LIMIT]: 100, // per year
    [FeatureKey.INVOICE_EDIT_DOWNLOAD_LIMIT]: 'UNLIMITED',
    [FeatureKey.INVOICE_STATUS_UPDATE]: true,
    [FeatureKey.LOGO_UPLOAD_SIZE_IN_MB]: 5,
    [FeatureKey.CC_INVOICE_EMAIL]: false,
    [FeatureKey.MANAGE_CLIENT_LIMIT]: 5,
  },
  [PLAN_CODES.PRO]: {
    [FeatureKey.INVOICE_EMAIL_LIMIT]: 500, // per year
    [FeatureKey.INVOICE_EDIT_DOWNLOAD_LIMIT]: 'UNLIMITED',
    [FeatureKey.INVOICE_STATUS_UPDATE]: true,
    [FeatureKey.LOGO_UPLOAD_SIZE_IN_MB]: 10,
    [FeatureKey.CC_INVOICE_EMAIL]: false,
    [FeatureKey.MANAGE_CLIENT_LIMIT]: 20,
  },
} as const;

export const SUBSCRIPTION_PLANS = {
  FREE: {
    plan: 'FREE',
    price: 'Free',
    features: [
      { text: 'Invoice History', enabled: true },
      { text: `Upload logo upto ${MAX_FILE_SIZE}MB`, enabled: true },
      { text: 'Send Invoices via Email utpto 6', enabled: true },
      { text: 'Invoice Edit & Download upto 3', enabled: true },
      { text: 'Edit Past Invoices', enabled: false },
      { text: 'Update Payment Status', enabled: false },
    ],
  },
  STARTER: {
    price: 'xx.xx',
    plan: 'STARTER',
    features: [
      { text: 'Everything in Free', enabled: true },
      { text: 'Send Invoices via Email upto 100', enabled: true },
      { text: 'Unlimited Edit & Download', enabled: true },
      { text: `Upload logo upto ${MAX_FILE_SIZE_PRO}MB`, enabled: true },
      { text: 'Update Payment Status', enabled: true },
      { text: 'Save Clients & Business Details', enabled: true },
    ],
  },
};
