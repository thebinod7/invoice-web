'use client'

import AdBanner from '@/app/components/AdBanner'
import MagicLoginForm from '@/app/components/MagicSignupForm'
import { APP_PATHS, GOOGLE_AD } from '@/app/constants'
import { useAuthContext } from '@/app/context/useAuthContext'
import { Skeleton } from '@/components/ui/skeleton'
import { MoveRight } from 'lucide-react'
import Link from 'next/link'
import CTA from './CTA'
import InvoiceGenSuccess from './InvoiceGenSuccess'
import InvoiceSavedInfo from './InvoiceSavedInfo'

function ThankYouSkeleton() {
    return (
        <div className="flex flex-col items-center gap-4 py-2">
            <Skeleton className="h-20 w-20 rounded-full" />
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-5 w-64" />
            <div className="mt-2 w-full space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-11 w-full rounded-lg" />
                <Skeleton className="h-11 w-full rounded-lg" />
                <Skeleton className="h-11 w-full rounded-lg" />
            </div>
            <Skeleton className="mt-4 h-24 w-full rounded-lg" />
        </div>
    )
}

export default function ThankYouPage() {
    const { isLoggedIn, isPremium, isLoading } = useAuthContext()

    return (
        <>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full my-2">
                    {isLoading ? (
                        <ThankYouSkeleton />
                    ) : (
                        <>
                            <InvoiceGenSuccess />

                            <div className="mt-2">
                                {isLoggedIn ? (
                                    <>
                                        <InvoiceSavedInfo />
                                        <div className="space-y-4 mt-2">
                                            <Link
                                                href={APP_PATHS.DASHBOARD.HOME}
                                                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-normal py-2 px-6 duration-200 flex items-center justify-center space-x-2 shadow-sm text-md rounded-lg transition-colors focus:outline-none"
                                            >
                                                <MoveRight className="w-5 h-5" />
                                                <span>Go to Dashboard</span>
                                            </Link>
                                        </div>
                                    </>
                                ) : (
                                    <MagicLoginForm />
                                )}
                            </div>

                            <CTA />

                            <div className="mt-8">
                                {!isPremium && <AdBanner adSlotId={GOOGLE_AD.THANK_YOU_PAGE_SLOT} />}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
