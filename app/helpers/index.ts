import { SUPPORTED_CURRENCIES } from '../constants';

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
