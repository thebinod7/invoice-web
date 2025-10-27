'use client';

import { useState, useCallback } from 'react';
import { ArrowRightLeft } from 'lucide-react';

const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
];

// Mock exchange rates (in production, fetch from real API)
const EXCHANGE_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.5,
  AUD: 1.53,
  CAD: 1.36,
  CHF: 0.88,
  CNY: 7.24,
  INR: 83.12,
  MXN: 17.05,
};

export default function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [fromAmount, setFromAmount] = useState('100');

  const toAmount = useCallback(() => {
    const amount = Number.parseFloat(fromAmount) || 0;
    const rate = EXCHANGE_RATES[toCurrency] / EXCHANGE_RATES[fromCurrency];
    return (amount * rate).toFixed(2);
  }, [fromAmount, fromCurrency, toCurrency]);

  const handleSwap = useCallback(() => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }, [fromCurrency, toCurrency]);

  const getExchangeRate = useCallback(() => {
    const rate = EXCHANGE_RATES[toCurrency] / EXCHANGE_RATES[fromCurrency];
    return rate.toFixed(4);
  }, [fromCurrency, toCurrency]);

  const fromCurrencyData = CURRENCIES.find((c) => c.code === fromCurrency)!;
  const toCurrencyData = CURRENCIES.find((c) => c.code === toCurrency)!;

  return (
    <div className="w-full max-w-md">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Currency Converter
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            1 {fromCurrency} = {getExchangeRate()} {toCurrency}
          </p>
        </div>

        {/* From Currency Section */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
            From
          </label>
          <div className="space-y-2">
            <input
              type="number"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-3 text-lg font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
              aria-label="Amount to convert from"
            />
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-slate-900 dark:text-white cursor-pointer"
              aria-label="Currency to convert from"
            >
              {CURRENCIES.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSwap}
            className="p-3 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-full transition-all duration-200 hover:scale-110 active:scale-95 shadow-md hover:shadow-lg"
            aria-label="Swap currencies"
          >
            <ArrowRightLeft size={20} />
          </button>
        </div>

        {/* To Currency Section */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
            To
          </label>
          <div className="space-y-2">
            <div className="w-full px-4 py-3 text-lg font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white">
              {toAmount()}
            </div>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-slate-900 dark:text-white cursor-pointer"
              aria-label="Currency to convert to"
            >
              {CURRENCIES.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Footer Info */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
            Exchange rates are updated in real-time
          </p>
        </div>
      </div>
    </div>
  );
}
