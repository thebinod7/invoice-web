import {
    BellRing,
    Edit3,
    Eye,
    FileText,
    MessageCircle,
    Rocket,
    Send,
    Share2,
    Smartphone,
    Sparkles,
    Zap,
} from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import AdBanner from '../components/AdBanner'
import HomeHero from '../components/HomeHero'
import { APP, DEFAULT_METADATA, DEFAULT_OG_IMAGE_URL, GOOGLE_AD, SEO_KEYWORDS } from '../constants'
import ZohoInvoiceComparisonTable from '../components/ZohoInvoiceCompare'

export const generateMetadata = async (): Promise<Metadata> => {
    const title = APP.TITLE
    const description = APP.DESCRIPTION
    return {
        ...DEFAULT_METADATA,
        title,
        description,
        keywords: SEO_KEYWORDS,
        openGraph: {
            type: 'website',
            url: process?.env?.NEXT_PUBLIC_APP_URL,
            title,
            description,
            images: [
                {
                    url: DEFAULT_OG_IMAGE_URL,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [
                {
                    url: DEFAULT_OG_IMAGE_URL,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
    }
}

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="mx-0 sm:mx-5 md:mx-8 lg:mx-20 xl:mx-24 2xl:mx-28">
                <HomeHero />

                {/* Features Section */}
                <section
                    id="features"
                    className="border-t border-gray-100 bg-gray-50/80 py-16 lg:py-20"
                >
                    <div className="container mx-auto px-4">
                        <div className="mb-10 space-y-3 text-center lg:mb-12">
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Features
                            </p>
                            <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
                                Get Paid In Under a Minute
                            </h2>
                            <p className="mx-auto max-w-xl text-sm leading-relaxed text-gray-600">
                                Start sending invoices in seconds. No signup required to get
                                started.
                            </p>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            <div className="-rotate-2 rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm transition-all duration-300 ease-out hover:rotate-0 hover:border-emerald-200 hover:shadow-md hover:-translate-y-1 hover:scale-[1.02]">
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100">
                                    <Zap className="h-6 w-6 text-emerald-600" strokeWidth={2} aria-hidden />
                                </div>
                                <h3 className="mb-2 text-sm font-semibold text-gray-900">
                                    Create Professional Invoices
                                </h3>
                                <p className="text-sm leading-relaxed text-gray-600">
                                    Use our template and generate professional invoices in seconds.
                                    No more awkward formatting.
                                </p>
                            </div>
                            <div className="rotate-2 rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm transition-all duration-300 ease-out hover:rotate-0 hover:border-emerald-200 hover:shadow-md hover:-translate-y-1 hover:scale-[1.02]">
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50">
                                    <Send className="h-6 w-6 text-emerald-700" strokeWidth={2} aria-hidden />
                                </div>
                                <h3 className="mb-2 text-sm font-semibold text-gray-900">
                                    Send Directly. No Email Client Needed
                                </h3>
                                <p className="text-sm leading-relaxed text-gray-600">
                                    Hit send from inside Invomaker. Your client gets a clean,
                                    personalized invoice email.
                                </p>
                            </div>
                            <div className="-rotate-2 rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm transition-all duration-300 ease-out hover:rotate-0 hover:border-emerald-200 hover:shadow-md hover:-translate-y-1 hover:scale-[1.02]">
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100">
                                    <MessageCircle className="h-6 w-6 text-gray-700" strokeWidth={2} aria-hidden />
                                </div>
                                <h3 className="mb-2 text-sm font-semibold text-gray-900">
                                    One-Click Payment Reminders
                                </h3>
                                <p className="text-sm leading-relaxed text-gray-600">
                                    Send a polite, branded follow-up with one click. No awkward
                                    wording required.
                                </p>
                            </div>
                            <div className="rotate-2 rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm transition-all duration-300 ease-out hover:rotate-0 hover:border-emerald-200 hover:shadow-md hover:-translate-y-1 hover:scale-[1.02]">
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100">
                                    <Smartphone className="h-6 w-6 text-gray-700" strokeWidth={2} aria-hidden />
                                </div>
                                <h3 className="mb-2 text-sm font-semibold text-gray-900">
                                    Mobile friendly
                                </h3>
                                <p className="text-sm leading-relaxed text-gray-600">
                                    Works on phones and tablets so you can bill from anywhere.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section
                    id="how-it-works"
                    className="border-t border-gray-100 bg-white py-16 lg:py-20"
                >
                    <div className="container mx-auto px-4">
                        <div className="mb-10 space-y-3 text-center lg:mb-12">
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                How it works
                            </p>
                            <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
                                Three quick steps
                            </h2>
                            <p className="mx-auto max-w-xl text-sm leading-relaxed text-gray-600">
                                Build a polished invoice from start to finish. No signup required.
                            </p>
                        </div>
                        <div className="grid gap-6 md:grid-cols-3">
                            <div className="-rotate-2 rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm transition-all duration-300 ease-out hover:rotate-0 hover:border-emerald-200 hover:shadow-md hover:-translate-y-1 hover:scale-[1.02]">
                                <span className="mb-4 inline-flex rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-600">
                                    Step 1
                                </span>
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100">
                                    <Edit3 className="h-6 w-6 text-emerald-600" strokeWidth={2} aria-hidden />
                                </div>
                                <h3 className="mb-2 text-sm font-semibold text-gray-900">
                                    Fill your details with just one prompt
                                </h3>
                                <p className="text-sm leading-relaxed text-gray-600">
                                    Add your business info, client, line items, and logo.
                                </p>
                            </div>
                            <div className="rotate-2 rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm transition-all duration-300 ease-out hover:rotate-0 hover:border-emerald-200 hover:shadow-md hover:-translate-y-1 hover:scale-[1.02]">
                                <span className="mb-4 inline-flex rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-600">
                                    Step 2
                                </span>
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100">
                                    <Eye className="h-6 w-6 text-emerald-600" strokeWidth={2} aria-hidden />
                                </div>
                                <h3 className="mb-2 text-sm font-semibold text-gray-900">
                                    Preview & tweak
                                </h3>
                                <p className="text-sm leading-relaxed text-gray-600">
                                    Review live, then adjust tax, discounts, and wording until it
                                    looks right.
                                </p>
                            </div>
                            <div className="-rotate-2 rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm transition-all duration-300 ease-out hover:rotate-0 hover:border-emerald-200 hover:shadow-md hover:-translate-y-1 hover:scale-[1.02]">
                                <span className="mb-4 inline-flex rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-600">
                                    Step 3
                                </span>
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100">
                                    <Share2 className="h-6 w-6 text-emerald-600" strokeWidth={2} aria-hidden />
                                </div>
                                <h3 className="mb-2 text-sm font-semibold text-gray-900">
                                    Download or Send
                                </h3>
                                <p className="text-sm leading-relaxed text-gray-600">
                                    Download a PDF or send directly to your client from the app
                                    dashboard.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    id="zoho-comparison"
                    className="border-t border-gray-100 bg-gray-50/80 py-16 lg:py-20"
                >
                    <ZohoInvoiceComparisonTable />
                </section>

                {/* Google Ads Section */}
                <div className="mt-8">
                    <AdBanner adSlotId={GOOGLE_AD.HOMEPAGE_SLOT} />
                </div>

                {/* SEO Section */}
                <section
                    id="seo"
                    className="border-t border-gray-100 bg-white py-16 lg:py-20"
                >
                    <div className="container mx-auto px-4">
                        <div className="mb-10 space-y-3 text-center lg:mb-12">
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Why Invomaker
                            </p>
                            <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
                                Stop building invoices. Start getting paid.
                            </h2>
                        </div>
                        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-12 lg:gap-10 lg:items-stretch">
                            <div className="lg:col-span-7">
                                <div className="relative h-full overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-300 ease-out hover:shadow-md md:p-8">
                                    <div
                                        className="pointer-events-none absolute left-0 top-0 h-full w-1 bg-emerald-500"
                                        aria-hidden
                                    />
                                    <div
                                        className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-emerald-50"
                                        aria-hidden
                                    />
                                    <p className="relative text-sm leading-relaxed text-gray-600 md:text-base">
                                        Invomaker is an invoicing platform built for freelancers and
                                        small businesses who are tired of forms, forgotten
                                        follow-ups, and wondering if a client has actually seen
                                        their invoice. Most invoice tools hand you a blank form.
                                        Invomaker gives you a complete workflow from first prompt to
                                        payment confirmed without switching apps, hunting for
                                        templates, or writing awkward &ldquo;just following
                                        up&rdquo; emails.
                                    </p>
                                </div>
                            </div>
                            <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
                                {[
                                    {
                                        icon: Sparkles,
                                        label: 'Clean, and professional invoices in seconds',
                                    },
                                    {
                                        icon: Send,
                                        label: 'Send invoices directly from the app',
                                    },
                                    {
                                        icon: BellRing,
                                        label: 'No manual payment chasing',
                                    },
                                    {
                                        icon: Rocket,
                                        label: 'No signup to get started',
                                    },
                                ].map(({ icon: Icon, label }, i) => (
                                    <li
                                        key={label}
                                        className={`group flex items-center gap-3.5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md lg:hover:rotate-0 ${i % 2 === 0 ? 'lg:-rotate-1' : 'lg:rotate-1'}`}
                                    >
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 transition-colors duration-300 group-hover:bg-emerald-100">
                                            <Icon
                                                className="h-4 w-4 text-emerald-600 transition-transform duration-300 group-hover:scale-110"
                                                strokeWidth={2.5}
                                                aria-hidden
                                            />
                                        </div>
                                        <span className="text-sm font-medium text-gray-900">
                                            {label}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            </div>

            {/* CTA Section */}
            <section className="border-t border-gray-200 bg-gray-50/80 py-16 lg:py-20">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-xl space-y-4 text-center">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Get started
                        </p>
                        <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                            Ready to create your first invoice?
                        </h2>
                        <p className="text-sm leading-relaxed text-gray-600">
                            Join thousands of professionals who use our free invoice generator to
                            get paid faster.
                        </p>
                        <div className="pt-1">
                            <Link
                                href="/create-invoice"
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                            >
                                Ready to send your first invoice? It's free.
                                {/* <FileText className="h-4 w-4" strokeWidth={2.5} aria-hidden /> */}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
