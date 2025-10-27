'use client';

import { ArrowRightLeft, DollarSign } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import ReactSelect from '../components/ReactSelect';

const API_BASE_URL = 'https://api.frankfurter.dev/v1/latest';

const CURRENCIES = [
  { label: 'Australian Dollar', value: 'AUD' },
  { label: 'Bulgarian Lev', value: 'BGN' },
  { label: 'Brazilian Real', value: 'BRL' },
  { label: 'Canadian Dollar', value: 'CAD' },
  { label: 'Swiss Franc', value: 'CHF' },
  { label: 'Chinese Renminbi Yuan', value: 'CNY' },
  { label: 'Czech Koruna', value: 'CZK' },
  { label: 'Danish Krone', value: 'DKK' },
  { label: 'Euro', value: 'EUR' },
  { label: 'British Pound', value: 'GBP' },
  { label: 'Hong Kong Dollar', value: 'HKD' },
  { label: 'Hungarian Forint', value: 'HUF' },
  { label: 'Indonesian Rupiah', value: 'IDR' },
  { label: 'Israeli New Sheqel', value: 'ILS' },
  { label: 'Indian Rupee', value: 'INR' },
  { label: 'Icelandic Króna', value: 'ISK' },
  { label: 'Japanese Yen', value: 'JPY' },
  { label: 'South Korean Won', value: 'KRW' },
  { label: 'Mexican Peso', value: 'MXN' },
  { label: 'Malaysian Ringgit', value: 'MYR' },
  { label: 'Norwegian Krone', value: 'NOK' },
  { label: 'New Zealand Dollar', value: 'NZD' },
  { label: 'Philippine Peso', value: 'PHP' },
  { label: 'Polish Złoty', value: 'PLN' },
  { label: 'Romanian Leu', value: 'RON' },
  { label: 'Swedish Krona', value: 'SEK' },
  { label: 'Singapore Dollar', value: 'SGD' },
  { label: 'Thai Baht', value: 'THB' },
  { label: 'Turkish Lira', value: 'TRY' },
  { label: 'United States Dollar', value: 'USD' },
  { label: 'South African Rand', value: 'ZAR' },
];

export default function page() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [fromAmount, setFromAmount] = useState('100');
  const [rate, setRate] = useState(0);

  const toAmount = useCallback(() => {
    const amount = Number.parseFloat(fromAmount) || 0;
    return (amount * rate).toFixed(2);
  }, [fromAmount, fromCurrency, toCurrency, rate]);

  const handleSwap = useCallback(() => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }, [fromCurrency, toCurrency]);

  const getExchangeRate = useCallback(async () => {
    const res = await fetch(
      `${API_BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`
    );
    const data = await res.json();
    const rate = data.rates[toCurrency];
    setRate(rate);
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    getExchangeRate();
  }, [getExchangeRate]);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="p-2.5 bg-slate-100 rounded-lg">
            <DollarSign className="w-6 h-6 text-slate-900" />
          </div>
          <h1 className="text-3xl font-light tracking-tight text-slate-900">
            Currency Converter
          </h1>
        </div>
        <p className="text-sm font-bold text-slate-500">
          1 {fromCurrency} = {rate.toFixed(2)} {toCurrency}{' '}
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8 space-y-6">
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
              className="w-full px-4 py-2 text-lg font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
              aria-label="Amount to convert from"
            />
            <ReactSelect
              currentValue={CURRENCIES.find((c) => c.value === fromCurrency)}
              options={CURRENCIES}
              instanceId="from-currency"
              placeholder="Select From"
              handleSelectChange={(d) => setFromCurrency(d?.value || '')}
            />
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSwap}
            className="p-3 bg-black hover:bg-slate-800  text-white rounded-full transition-all duration-200 hover:scale-110 active:scale-95 shadow-md hover:shadow-lg"
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
            <div className="w-full px-4 py-2 text-lg font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white">
              {toAmount()}
            </div>
            <ReactSelect
              currentValue={CURRENCIES.find((c) => c.value === toCurrency)}
              options={CURRENCIES}
              instanceId="to-currency"
              placeholder="Select To"
              handleSelectChange={(d) => setToCurrency(d?.value || '')}
            />
          </div>
        </div>

        {/* Footer Info */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
            Exchange rates are updated daily.
          </p>
        </div>
      </div>
    </div>
  );
}
