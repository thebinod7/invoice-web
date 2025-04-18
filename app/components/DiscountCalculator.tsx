import { RefreshCw } from 'lucide-react';
import React from 'react';

interface DiscountCalculatorProps {
  discount: string;
  handleDiscountInputChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export default function DiscountCalculator({
  discount,
  handleDiscountInputChange,
}: DiscountCalculatorProps) {
  return (
    <div className="flex items-center">
      <div className="relative flex-1">
        <input
          name="discount"
          type="text"
          value={discount}
          onChange={handleDiscountInputChange}
          placeholder="0.00"
          className="w-24 pr-6 py-1 outline-none border border-gray-300 rounded-md text-right"
          aria-label="Tax rate percentage"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
          %
        </span>
      </div>
      <button
        onClick={() => {}}
        className="h-5 w-5 ml-1"
        aria-label="Reset tax rate"
      >
        <RefreshCw className="h-4 w-4" />
      </button>
    </div>
  );
}
