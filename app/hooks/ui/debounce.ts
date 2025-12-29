import { useEffect, useState } from 'react';

/**
 * useDebounce hook
 * Delays updating the returned value until after `delay` ms have passed
 * Useful for search inputs to avoid calling API on every keystroke
 *
 * @param value - The input value to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced value
 */
export const useDebounce = (value: string, delay: number = 300) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    // Set up a timer to update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
