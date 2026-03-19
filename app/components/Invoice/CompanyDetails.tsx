import { Building, User } from 'lucide-react'
import React from 'react'

export default function CompanyDetails({
    senderDetails,
    receiverDetails,
    handleInputChange,
}: {
    senderDetails: string
    receiverDetails: string
    handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}) {
    return (
        <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                {/* Sender */}
                <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 text-[11px] font-medium tracking-widest text-stone-500 uppercase">
                        <User className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                        Sender Details
                        <span className="ml-auto text-[10px] tracking-wider text-red-600 border border-stone-200 rounded-full px-2 py-0.5">
                            Required
                        </span>
                    </label>
                    <textarea
                        name="senderDetails"
                        value={senderDetails || ''}
                        onChange={handleInputChange}
                        rows={7}
                        className="
              w-full px-3.5 py-3
              bg-stone-50 hover:bg-white
              border border-stone-200
              rounded-md
              text-xs text-stone-800 leading-relaxed
              placeholder:text-stone-500
              resize-vertical
              transition-colors duration-150
              focus:outline-none focus:bg-white focus:border-stone-400
            "
                        placeholder={`XYZ Corporation\n123 Main Street, Suite 400\n(555) 123-4567\nbilling@xyz.com`}
                    />
                </div>

                {/* Receiver */}
                <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 text-[11px] font-medium tracking-widest text-stone-500 uppercase">
                        <Building className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                        Receiver Details
                        <span className="ml-auto text-[10px] tracking-wider text-red-600 border border-stone-200 rounded-full px-2 py-0.5">
                            Required
                        </span>
                    </label>
                    <textarea
                        name="receiverDetails"
                        value={receiverDetails || ''}
                        onChange={handleInputChange}
                        rows={7}
                        className="
              w-full px-3.5 py-3
              bg-stone-50 hover:bg-white
              border border-stone-200
              rounded-md
              text-xs text-stone-800 leading-relaxed
              placeholder:text-stone-500
              resize-vertical
              transition-colors duration-150
              focus:outline-none focus:bg-white focus:border-stone-400
            "
                        placeholder={`ABC Inc\n123 Main Street, Suite 400\n(555) 123-5678\nbilling@abc.com`}
                    />
                </div>
            </div>
        </div>
    )
}
