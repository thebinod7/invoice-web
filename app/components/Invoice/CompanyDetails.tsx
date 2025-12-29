import { Building, User } from 'lucide-react';
import React from 'react';

export default function CompanyDetails({
  senderDetails,
  receiverDetails,
  handleInputChange,
}: {
  senderDetails: string;
  receiverDetails: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div className="lg:col-span-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2 flex-wrap">
            <User className="h-4 w-4 text-blue-600" />
            <span>Sender Details</span>
            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
              Required
            </span>
          </label>
          <textarea
            name="senderDetails"
            value={senderDetails || ''}
            onChange={(e) => handleInputChange(e)}
            rows={7}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical text-sm"
            placeholder={`Eg: XYZ Corporation\n123 Main Street, Suite 400 \n(555) 123-4567 \nbilling@xyz.com\nmore details...`}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2 flex-wrap">
            <Building className="h-4 w-4 text-blue-600" />
            <span>Receiver Details</span>
            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
              Required
            </span>
          </label>
          <textarea
            name="receiverDetails"
            value={receiverDetails || ''}
            onChange={(e) => handleInputChange(e)}
            rows={7}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical text-sm"
            placeholder={`Eg: ABC Inc\n123 Main Street, Suite 400 \n(555) 123-5678 \nbilling@abc.com\nmore details...`}
          />
        </div>
      </div>
    </div>
  );
}
