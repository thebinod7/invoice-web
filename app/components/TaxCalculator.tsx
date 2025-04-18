import { RefreshCw } from 'lucide-react';
import React from 'react';

interface TaxCalculatorProps {
  taxRate: string;
  handleTaxInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TaxCalculator({
  taxRate,
  handleTaxInputChange,
}: TaxCalculatorProps) {
  return (
    <div className="flex items-center">
      <div className="relative flex-1">
        <input
          name="tax"
          type="text"
          value={taxRate}
          onChange={handleTaxInputChange}
          placeholder="0.00"
          className="w-24 pr-6 py-1 outline-none border border-gray-300 rounded-md text-right"
          aria-label="Tax rate percentage"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
          %
        </span>
      </div>
      {/* <button
        onClick={() => {}}
        className="h-5 w-5 ml-1"
        aria-label="Reset tax rate"
      >
        <RefreshCw className="h-4 w-4" />
      </button> */}
    </div>
  );
}
