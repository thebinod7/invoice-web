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

export const STARTER_EMAIL_LIMIT = 120;

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
    [FeatureKey.INVOICE_EMAIL_LIMIT]: 120, // per year
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
      { text: 'Invoice history', enabled: true },
      { text: `Upload logo upto ${MAX_FILE_SIZE}MB`, enabled: true },
      { text: 'Send up to 6 invoices via email', enabled: true },
      { text: `Edit & download up to 12 invoices`, enabled: true },
      { text: 'Update up to 6 invoice payment status', enabled: true },
      { text: 'No ads', enabled: false },
    ],
  },
  STARTER: {
    price: 'xx.xx',
    plan: 'STARTER',
    features: [
      { text: 'Everything in Free', enabled: true },
      { text: `Upload logo upto ${MAX_FILE_SIZE_PRO}MB`, enabled: true },
      {
        text: `Send up to ${STARTER_EMAIL_LIMIT} invoices via email`,
        enabled: true,
      },
      { text: 'Customize email message', enabled: true },
      { text: 'Unlimited edit & download', enabled: true },
      { text: 'Unlimited payment status update', enabled: true },
      { text: 'No ads', enabled: true },
    ],
  },
};
