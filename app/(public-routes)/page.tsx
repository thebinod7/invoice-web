import {
    DollarSign,
    Edit3,
    Eye,
    FileText,
    MessageCircle,
    Share2,
    Smartphone,
    Zap,
} from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import AdBanner from '../components/AdBanner'
import HomeHero from '../components/HomeHero'
import { APP, DEFAULT_METADATA, DEFAULT_OG_IMAGE_URL, GOOGLE_AD, SEO_KEYWORDS } from '../constants'

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
                <section id="features" className="border-t border-gray-100 bg-gray-50/80 py-16 lg:py-20">
                    <div className="container mx-auto px-4">
                        <div className="mb-10 space-y-3 text-center lg:mb-12">
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Features
                            </p>
                            <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
                                Everything you need for professional invoices
                            </h2>
                            <p className="mx-auto max-w-xl text-sm leading-relaxed text-gray-600">
                                A free invoice generator with the essentials so you can send polished
                                invoices and get paid faster.
                            </p>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
                            <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm transition-colors hover:border-gray-300">
                                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                                    <Zap className="h-4 w-4 text-emerald-600" strokeWidth={2.5} aria-hidden />
                                </div>
                                <h3 className="mb-1.5 text-sm font-semibold text-gray-900">
                                    Simple and fast
                                </h3>
                                <p className="text-sm leading-relaxed text-gray-600">
                                    Create invoices in under a minute with a clear, focused flow.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm transition-colors hover:border-gray-300">
                                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                                    <DollarSign className="h-4 w-4 text-emerald-700" strokeWidth={2.5} aria-hidden />
                                </div>
                                <h3 className="mb-1.5 text-sm font-semibold text-gray-900">100% free</h3>
                                <p className="text-sm leading-relaxed text-gray-600">
                                    Unlimited invoices at no cost. No account required to start.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm transition-colors hover:border-gray-300">
                                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                                    <MessageCircle className="h-4 w-4 text-gray-700" strokeWidth={2.5} aria-hidden />
                                </div>
                                <h3 className="mb-1.5 text-sm font-semibold text-gray-900">
                                    Email & reminders
                                </h3>
                                <p className="text-sm leading-relaxed text-gray-600">
                                    Send invoices by email and nudge clients with reminders when it
                                    helps.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm transition-colors hover:border-gray-300">
                                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                                    <Smartphone className="h-4 w-4 text-gray-700" strokeWidth={2.5} aria-hidden />
                                </div>
                                <h3 className="mb-1.5 text-sm font-semibold text-gray-900">
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
                <section id="how-it-works" className="border-t border-gray-100 bg-white py-16 lg:py-20">
                    <div className="container mx-auto px-4">
                        <div className="mb-10 space-y-3 text-center lg:mb-12">
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                How it works
                            </p>
                            <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
                                Three quick steps
                            </h2>
                            <p className="mx-auto max-w-xl text-sm leading-relaxed text-gray-600">
                                Build a polished invoice from start to finish—no registration
                                required.
                            </p>
                        </div>
                        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
                            <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm transition-colors hover:border-gray-300">
                                <span className="mb-3 inline-flex rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-600">
                                    Step 1
                                </span>
                                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                                    <Edit3 className="h-4 w-4 text-emerald-600" strokeWidth={2.5} aria-hidden />
                                </div>
                                <h3 className="mb-1.5 text-sm font-semibold text-gray-900">
                                    Fill your details
                                </h3>
                                <p className="text-sm leading-relaxed text-gray-600">
                                    Add your business info, client, line items, and logo.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm transition-colors hover:border-gray-300">
                                <span className="mb-3 inline-flex rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-600">
                                    Step 2
                                </span>
                                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                                    <Eye className="h-4 w-4 text-emerald-600" strokeWidth={2.5} aria-hidden />
                                </div>
                                <h3 className="mb-1.5 text-sm font-semibold text-gray-900">
                                    Preview & tweak
                                </h3>
                                <p className="text-sm leading-relaxed text-gray-600">
                                    Review live, then adjust tax, discounts, and wording until it
                                    looks right.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm transition-colors hover:border-gray-300">
                                <span className="mb-3 inline-flex rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-600">
                                    Step 3
                                </span>
                                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                                    <Share2 className="h-4 w-4 text-emerald-600" strokeWidth={2.5} aria-hidden />
                                </div>
                                <h3 className="mb-1.5 text-sm font-semibold text-gray-900">
                                    Download or share
                                </h3>
                                <p className="text-sm leading-relaxed text-gray-600">
                                    Export a PDF and send it to your client by email when you are
                                    ready.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Google Ads Section */}
                <div className="mt-8">
                    <AdBanner adSlotId={GOOGLE_AD.HOMEPAGE_SLOT} />
                </div>

                {/* SEO Section */}
                <section id="seo" className="border-t border-gray-100 bg-gray-50/80 py-16 lg:py-20">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-3xl space-y-6 text-center">
                            <div className="space-y-3">
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Free invoice generator
                                </p>
                                <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
                                    The best free invoice generator online
                                </h2>
                            </div>
                            <div className="rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm md:p-6">
                                <div className="space-y-3 text-sm leading-relaxed text-gray-600">
                                    <p>
                                        Our{' '}
                                        <strong className="font-semibold text-gray-900">
                                            free invoice generator
                                        </strong>{' '}
                                        is the perfect solution for freelancers, small business owners,
                                        and entrepreneurs who need to create professional invoices
                                        quickly and easily. As a comprehensive{' '}
                                        <strong className="font-semibold text-gray-900">
                                            PDF invoice maker
                                        </strong>
                                        {', our tool allows you to generate unlimited invoices without '}
                                        any cost or registration requirements.
                                    </p>
                                    <p>
                                        Whether you are looking for an{' '}
                                        <strong className="font-semibold text-gray-900">
                                            invoice creator online
                                        </strong>{' '}
                                        or a reliable{' '}
                                        <strong className="font-semibold text-gray-900">
                                            invoice generator free
                                        </strong>{' '}
                                        solution, our platform provides all the features you need.
                                        Create customized invoices with your logo, add multiple line
                                        items, calculate taxes automatically, and download
                                        professional PDF invoices that you can send to clients
                                        immediately.
                                    </p>
                                    <p>
                                        Join thousands of professionals who trust our{' '}
                                        <strong className="font-semibold text-gray-900">
                                            free invoice maker
                                        </strong>{' '}
                                        to handle their billing needs. Start creating professional
                                        invoices today with our easy-to-use{' '}
                                        <strong className="font-semibold text-gray-900">
                                            online invoice generator
                                        </strong>
                                        {'.'}
                                    </p>
                                </div>
                            </div>
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
                                Start creating invoices
                                <FileText className="h-4 w-4" strokeWidth={2.5} aria-hidden />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
