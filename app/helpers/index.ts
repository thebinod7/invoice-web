import * as currencyFormatter from 'currency-formatter';

export const getNameInitials = (firstName: string, lastName: string) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`;
};

export const emailValidator = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

import {
  SUPPORTED_CURRENCIES,
  SYMBOL_SUPPORTED_CURRENCIES,
} from '../constants/currency';

export const sanitizeError = (error: any) => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  return 'Something went wrong!';
};

export const getStaleTimeInMinutes = (minutes: number) => {
  if (!minutes) return 0;
  return 1000 * 60 * minutes;
};

export const humanizeCapital = (word: string) => {
  if (!word) return '-';
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const generateRandomNumber = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const getCurrencySymbolByName = (currency: string) => {
  const found = SUPPORTED_CURRENCIES.find((item) => item.value === currency);
  if (!found) return '$';
  return found.symbol;
};

export const getCurrencyLocaleByName = (currency: string) => {
  const found = SUPPORTED_CURRENCIES.find((item) => item.value === currency);
  if (!found) return 'en-US';
  return found.locale;
};

export const formatDate = (inputDate: string) => {
  if (!inputDate) return '';
  return new Date(inputDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const calculateFileSizeInMB = (bytes: number) => {
  if (!bytes) return 0.0;
  const mb = bytes / (1024 * 1024);
  return mb.toFixed(2);
};

export const formatCurrency = (amount: number, currencyCode = 'USD') => {
  try {
    const options: {
      code: string;
      symbol?: string;
      format: string;
      decimal: string;
      thousand: string;
      precision: number;
    } = {
      code: currencyCode,
      symbol: currencyCode,
      format: '%s%v',
      decimal: '.',
      thousand: ',',
      precision: 2,
    };
    const symbolSupported = SYMBOL_SUPPORTED_CURRENCIES.includes(currencyCode);

    if (symbolSupported) delete options.symbol;
    return currencyFormatter.format(amount, options);
  } catch (error) {
    console.error(`Error formatting currency: ${error}`);
    return amount.toString();
  }
};

export const calculatePercentAmountOfTotal = (
  total: number,
  percentage: number
) => {
  if (total <= 0 || percentage < 0) return 0;
  return (total * percentage) / 100;
};
