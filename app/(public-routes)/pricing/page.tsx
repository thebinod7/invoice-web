'use client'

import { APP_PATHS } from '@/app/constants'
import { STARTER_PRICE } from '@/app/constants/plan'
import { useAuthContext } from '@/app/context/useAuthContext'
import { Check, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

const freeFeatures = [
    'Invoice history',
    'Upload logo up to 1MB',
    'Send up to 6 invoices via email',
    'Edit & download up to 12 invoices',
    'Up to 6 payment status tracking',
    'Ad-supported experience',
]

const starterFeatures = [
    'Everything in Free',
    'Upload logo up to 5MB',
    'Send up to 120 invoices via email',
    'Personalized email message',
    'Reminder email notifications',
    'Unlimited edit & download',
    'Unlimited payment status tracking',
    'No ads',
]

export default function PricingPage() {
    const [hovered, setHovered] = useState<string | null>(null)
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
        <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-20 font-['Instrument_Serif']">
            <div className="relative w-full max-w-4xl">
                <div className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 border border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-['DM_Mono'] tracking-widest uppercase px-4 py-2 rounded-full mb-7">
                        <Sparkles size={11} className="text-emerald-500" />
                        <span>Simple pricing, no hidden fees</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl text-black leading-[1.08] tracking-tight mb-5">
                        Save time. <span className="text-emerald-600 italic">Get paid faster.</span>
                        <br />
                        Stay organized.
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div
                        className="relative bg-white rounded-2xl p-8 border-2 border-gray-100 transition-all duration-300 cursor-default"
                        onMouseEnter={() => setHovered('free')}
                        onMouseLeave={() => setHovered(null)}
                        style={{
                            boxShadow:
                                hovered === 'free'
                                    ? '0 20px 60px -12px rgba(0,0,0,0.12)'
                                    : '0 4px 20px -4px rgba(0,0,0,0.06)',
                            transform: hovered === 'free' ? 'translateY(-4px)' : 'translateY(0)',
                        }}
                    >
                        <div className="mb-6">
                            <span className="text-xs font-['DM_Mono'] tracking-[0.18em] text-gray-400 uppercase">
                                Plan
                            </span>
                            <h2 className="text-3xl font-medium mt-1 text-black tracking-tight">
                                Free
                            </h2>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-5 mb-7 border border-gray-100">
                            <p className="text-black font-semibold text-xl mb-1">Free forever</p>
                            <p className="text-gray-500 font-['DM_Mono'] text-xs mb-5">
                                No credit card required
                            </p>
                            <button className="w-full py-3 rounded-lg border-2 border-gray-200 text-gray-400 font-['DM_Mono'] text-sm tracking-wide cursor-default bg-white">
                                No subscription
                            </button>
                        </div>

                        <ul className="space-y-3.5">
                            {freeFeatures.map((feature, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full border-2 border-gray-200 flex items-center justify-center flex-shrink-0 bg-white">
                                        <Check
                                            size={10}
                                            strokeWidth={3}
                                            className="text-gray-400"
                                        />
                                    </div>
                                    <span className="text-gray-700 text-md font-['DM_Mono']">
                                        {feature}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div
                        className="relative bg-black rounded-2xl p-8 transition-all duration-300 overflow-hidden cursor-default"
                        onMouseEnter={() => setHovered('starter')}
                        onMouseLeave={() => setHovered(null)}
                        style={{
                            boxShadow:
                                hovered === 'starter'
                                    ? '0 20px 60px -12px rgba(16,185,129,0.4)'
                                    : '0 4px 24px -4px rgba(0,0,0,0.3)',
                            transform: hovered === 'starter' ? 'translateY(-4px)' : 'translateY(0)',
                        }}
                    >
                        <div className="absolute -top-20 -right-20 w-56 h-56 bg-emerald-500 rounded-full opacity-10 blur-3xl pointer-events-none" />

                        <div className="mb-6">
                            <span className="text-xs font-['DM_Mono'] tracking-[0.18em] text-gray-500 uppercase">
                                Plan
                            </span>
                            <h2 className="text-3xl font-medium mt-1 text-white tracking-tight">
                                Starter
                            </h2>
                        </div>

                        <div className="bg-white/5 rounded-xl p-5 mb-7 border border-white/10">
                            <div className="flex items-baseline gap-1.5 mb-1">
                                <span className="text-white font-semibold text-3xl">
                                    ${STARTER_PRICE}
                                </span>
                                <span className="text-gray-400 font-['DM_Mono'] text-sm">
                                    / year
                                </span>
                            </div>
                            <p className="text-gray-500 font-['DM_Mono'] text-md mb-5">
                                Billed annually · just $2/mo
                            </p>
                            <button
                                onClick={handleGetStarted}
                                className="w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white font-['DM_Mono'] text-sm tracking-wide transition-colors duration-200 flex items-center justify-center gap-2 group font-semibold"
                            >
                                Get Started
                                <ArrowRight
                                    size={14}
                                    className="group-hover:translate-x-1 transition-transform duration-200"
                                />
                            </button>
                        </div>

                        <ul className="space-y-3.5">
                            {starterFeatures.map((feature, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center flex-shrink-0">
                                        <Check
                                            size={10}
                                            strokeWidth={3}
                                            className="text-emerald-400"
                                        />
                                    </div>
                                    <span
                                        className={`text-md font-['DM_Mono'] ${i === 0 ? 'text-gray-400 italic' : 'text-gray-200'}`}
                                    >
                                        {feature}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2">
                            <ShieldCheck size={13} className="text-emerald-500 flex-shrink-0" />
                            <span className="text-gray-400 font-['DM_Mono'] text-xs">
                                Most popular for freelancers & small teams
                            </span>
                        </div>
                    </div>
                </div>

                <p className="text-center mt-10 text-gray-400 font-['DM_Mono'] text-xs tracking-wide">
                    SSL security included · No extra charges
                </p>
            </div>
        </main>
    )
}
