'use client'

import { APP_PATHS } from '@/app/constants'
import { STARTER_PRICE } from '@/app/constants/plan'
import { useAuthContext } from '@/app/context/useAuthContext'
import { ArrowRight, Check, ShieldCheck, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const freeFeatures = [
    'Invoice history',
    'Upload logo up to 1MB',
    'Send up to 6 invoices via email',
    'Edit & download up to 12 invoices',
    'Up to 6 payment status tracking',
    'Ad-supported experience',
] as const

const starterFeatures = [
    'Everything in Free',
    'Upload logo up to 5MB',
    'Send up to 120 invoices via email',
    'Personalized email message',
    'Reminder email notifications',
    'Unlimited edit & download',
    'Unlimited payment status tracking',
    'No ads',
] as const

function FeatureList({
    items,
    checkClassName,
    textClassName,
    firstItemMuted,
}: {
    items: readonly string[]
    checkClassName: string
    textClassName: string
    firstItemMuted?: boolean
}) {
    return (
        <ul className="divide-y divide-gray-100">
            {items.map((feature, i) => (
                <li key={feature} className="flex items-start gap-2.5 py-2.5 first:pt-0 last:pb-0">
                    <Check
                        className={`mt-0.5 h-4 w-4 flex-shrink-0 ${checkClassName}`}
                        strokeWidth={2.5}
                        aria-hidden
                    />
                    <span
                        className={`text-sm leading-relaxed ${
                            firstItemMuted && i === 0
                                ? 'italic text-gray-500'
                                : textClassName
                        }`}
                    >
                        {feature}
                    </span>
                </li>
            ))}
        </ul>
    )
}

export default function PricingPage() {
    const router = useRouter()
    const { currentUser } = useAuthContext()

    const handleGetStarted = () => {
        if (currentUser) {
            router.push(APP_PATHS.DASHBOARD.SUBSCRIPTION)
            return
        }
        toast.info('You must be logged in to get started.')
        router.push(APP_PATHS.AUTH)
    }

    return (
        <main className="min-h-screen bg-white">
            <div className="mx-0 sm:mx-5 md:mx-8 lg:mx-20 xl:mx-24 2xl:mx-28">
                <div className="container mx-auto max-w-4xl px-4 py-12 lg:py-16">
                    <header className="mb-10 space-y-4 text-center lg:mb-12">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Pricing
                        </p>
                        <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                            Simple · No hidden fees
                        </span>
                        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl lg:leading-tight">
                            Save time and{' '}
                            <span className="text-emerald-600">get paid faster</span>
                        </h1>
                        <p className="mx-auto max-w-lg text-sm leading-relaxed text-gray-600">
                            Start free, then upgrade when you need more sends, reminders, and an
                            ad-free workflow.
                        </p>
                    </header>

                    <div className="grid gap-5 md:grid-cols-2 md:gap-6">
                        <section className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-colors hover:border-gray-300 sm:p-6">
                            <div className="mb-5 space-y-1">
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Plan
                                </span>
                                <h2 className="text-xl font-semibold tracking-tight text-gray-900">
                                    Free
                                </h2>
                            </div>

                            <div className="mb-6 rounded-xl border border-gray-100 bg-gray-50/80 p-4">
                                <p className="text-base font-semibold text-gray-900">Free forever</p>
                                <p className="mt-1 text-xs text-gray-500">No credit card required</p>
                                <p className="mt-4 rounded-lg border border-gray-200 bg-white py-2.5 text-center text-xs font-semibold text-gray-500">
                                    No subscription
                                </p>
                            </div>

                            <FeatureList
                                items={freeFeatures}
                                checkClassName="text-emerald-600"
                                textClassName="text-gray-900"
                            />
                        </section>

                        <section className="relative flex flex-col rounded-2xl border-2 border-emerald-500 bg-white p-5 pt-7 shadow-sm sm:p-6 sm:pt-8">
                            <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2">
                                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 shadow-sm">
                                    <Zap className="h-3 w-3" aria-hidden />
                                    Most popular
                                </span>
                            </div>

                            <div className="mb-5 space-y-1">
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Plan
                                </span>
                                <h2 className="text-xl font-semibold tracking-tight text-gray-900">
                                    Starter
                                </h2>
                            </div>

                            <div className="mb-6 rounded-xl border border-gray-100 bg-gray-50/80 p-4">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-bold text-gray-900">
                                        ${STARTER_PRICE}
                                    </span>
                                    <span className="text-xs text-gray-500">/ year</span>
                                </div>
                                <p className="mt-1 text-xs text-gray-600">
                                    Billed annually · about $2/mo
                                </p>
                                <button
                                    type="button"
                                    onClick={handleGetStarted}
                                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                >
                                    Get started
                                    <ArrowRight className="h-4 w-4" strokeWidth={2.5} aria-hidden />
                                </button>
                            </div>

                            <FeatureList
                                items={starterFeatures}
                                checkClassName="text-emerald-600"
                                textClassName="text-gray-900"
                                firstItemMuted
                            />

                            <div className="mt-6 flex items-start gap-2 border-t border-gray-100 pt-4">
                                <ShieldCheck
                                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600"
                                    aria-hidden
                                />
                                <p className="text-xs leading-relaxed text-gray-600">
                                    Most popular for freelancers & small teams
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    )
}
