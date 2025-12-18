import { Check } from 'lucide-react';

export default function InvoiceSavedInfo() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-4">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <Check className="w-5 h-5 text-green-600 mt-0.5" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-1">
            Invoice Saved
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Your invoice has been automatically saved to your local device. You
            can find it in your downloads folder.
          </p>
        </div>
      </div>
    </div>
  );
}
