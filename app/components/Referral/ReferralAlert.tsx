'use client'

import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

export const WEBSITE_URL = process?.env?.NEXT_PUBLIC_APP_URL

export default function ReferralAlert({ referralCode }: { referralCode: string }) {
    const [copied, setCopied] = useState(false)

    const referralLink = `${WEBSITE_URL}?refCode=${referralCode}`

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        })
    }

    return (
        <div className="w-full">
            <div className="h-12 flex items-center gap-3 px-4 rounded-lg border border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors">
                <div className="flex-1 flex items-center gap-3 min-w-0">
                    <span className="text-sm font-medium text-blue-900">
                        <span>Invite friends</span>.{' '}
                        <span className="hidden md:inline-block">
                            Earn 3 months of PRO for free.
                        </span>
                    </span>
                    {/* <span className="text-xs text-blue-700 font-mono truncate">
                            {referralLink}
                        </span> */}
                </div>

                <button
                    onClick={handleCopy}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium text-sm whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                        copied
                            ? 'bg-emerald-500 text-white'
                            : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                    }`}
                >
                    {copied ? (
                        <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copied</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                        </>
                    )}
                </button>
                {/* <Link title="See details" href={'#'} target="_blank">
                    <Info size={18} />
                </Link> */}
            </div>
        </div>
    )
}
