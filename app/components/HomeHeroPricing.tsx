import Link from 'next/link'
import { Check, Lock, MoveRight, ShieldCheck, Zap } from 'lucide-react'
import { APP_PATHS } from '@/app/constants'
import { STARTER_PRICE } from '@/app/constants/plan'

const freeIncluded = [
    'Invoice history',
    'Upload logo up to 1MB',
    'Send up to 6 invoices via email',
] as const

const starterPreviewLocked = [
    'Unlimited edit & download',
    'Reminder email notifications',
    'Custom email messages',
    'Send up to 120 invoices via email',
    'No ads',
] as const

export default function HomeHeroPricing() {
    return (
        <div className="space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Your plan
                    </span>
                    <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                        Free
                    </span>
                </div>
                <div className="divide-y divide-gray-100">
                    {freeIncluded.map((label) => (
                        <div key={label} className="flex items-start gap-2.5 py-2.5 first:pt-0 last:pb-0">
                            <Check
                                className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600"
                                strokeWidth={2.5}
                                aria-hidden
                            />
                            <span className="text-sm text-gray-900">{label}</span>
                        </div>
                    ))}
                    {starterPreviewLocked.map((label) => (
                        <div
                            key={label}
                            className="flex items-center justify-between gap-2 py-2.5 first:pt-0 last:pb-0"
                        >
                            <div className="flex min-w-0 flex-1 items-start gap-2.5">
                                <Lock
                                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400"
                                    strokeWidth={2}
                                    aria-hidden
                                />
                                <span className="text-sm text-gray-500">{label}</span>
                            </div>
                            <span className="flex-shrink-0 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-900 ring-1 ring-amber-200/80">
                                Starter
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative rounded-2xl border-2 border-emerald-500 bg-white p-4 pt-6 shadow-sm">
                <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 shadow-sm">
                        <Zap className="h-3 w-3" aria-hidden />
                        Most popular
                    </span>
                </div>

                <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-900">Starter</h3>
                    <div className="mt-1 flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-gray-900">${STARTER_PRICE}</span>
                        <span className="text-xs text-gray-500">/ year</span>
                    </div>
                </div>

                <Link
                    href={APP_PATHS.DASHBOARD.SUBSCRIPTION}
                    className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                    <MoveRight className="h-4 w-4 text-emerald-600" strokeWidth={2.5} aria-hidden />
                    View Subscription
                </Link>

                <div className="flex items-start gap-2 border-t border-gray-100 pt-3">
                    <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" aria-hidden />
                    <p className="text-xs leading-relaxed text-gray-600">
                        Most popular for freelancers & small teams
                    </p>
                </div>
            </div>
        </div>
    )
}
