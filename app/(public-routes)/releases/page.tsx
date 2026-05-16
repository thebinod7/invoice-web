'use client'

import { APP_NAME } from '@/app/constants'
import type { LucideIcon } from 'lucide-react'
import {
    Calendar,
    FormInputIcon,
    Home,
    Image,
    LayoutTemplate,
    List,
    Lock,
    Newspaper,
    Search,
    ShieldAlert,
    Sparkles,
    View,
} from 'lucide-react'

interface FeatureRelease {
    id: string
    title: string
    description: string
    date: string
    version: string
    icon: LucideIcon
    isNew: boolean
}

const featureReleases: FeatureRelease[] = [
    {
        id: '188',
        title: 'UI Improvements',
        description: 'Improved the UI for a more intuitive experience, and improved navigation.',
        date: '2026-05-16',
        version: 'v2.2.0',
        icon: Home,
        isNew: true,
    },
    {
        id: '189',
        title: 'Google one tap login',
        description: 'You can now login with one tap using your Google account.',
        date: '2026-03-24',
        version: 'v2.1.0',
        icon: Lock,
        isNew: false,
    },
    {
        id: '190',
        title: 'Invoice history',
        description: 'A new feature that allows you to view your invoice history.',
        date: '2025-12-28',
        version: 'v2.0.0',
        icon: List,
        isNew: false,
    },
    {
        id: '191',
        title: 'Branding updates',
        description:
            'Made small branding updates to make the app more visually appealing and user-friendly.',
        date: '2025-12-16',
        version: 'v1.2.4',
        icon: LayoutTemplate,
        isNew: false,
    },
    {
        id: '192',
        title: 'Save basic invoice template',
        description:
            'You can now save basic invoice template like logo, currency, sender, and reciever details. This will help you to create invoice faster.',
        date: '2025-08-30',
        version: 'v1.2.3',
        icon: LayoutTemplate,
        isNew: false,
    },
    {
        id: '193',
        title: 'New Invoice Generation Form',
        description:
            'We have introduced a new invoice generation form that simplifies the process of creating and managing invoices.',
        date: '2025-07-19',
        version: 'v1.2.2',
        icon: FormInputIcon,
        isNew: false,
    },
    {
        id: '194',
        title: 'Feedback Form',
        description:
            'We have added a feedback form to gather your thoughts and suggestions for future improvements.',
        date: '2025-07-05',
        version: 'v1.2.1',
        icon: Newspaper,
        isNew: false,
    },
    {
        id: '195',
        title: 'Added Blog Articles',
        description:
            'We have added a new section for blog articles to keep you updated with the latest news and insights.',
        date: '2025-07-05',
        version: 'v1.2.0',
        icon: Newspaper,
        isNew: false,
    },
    {
        id: '196',
        title: 'Landing Page Improvements',
        description: 'Improved the landing page with better design and performance optimizations.',
        date: '2025-06-07',
        version: 'v1.1.3',
        icon: Home,
        isNew: false,
    },
    {
        id: '197',
        title: 'Validation and Error Handling',
        description:
            'We have added comprehensive validation and error handling to ensure data integrity and improve user experience.',
        date: '2025-05-14',
        version: 'v1.1.2',
        icon: ShieldAlert,
        isNew: false,
    },
    {
        id: '198',
        title: 'UI/UX Improvements',
        description:
            'We have revamped the user interface for a more intuitive experience, and improved navigation.',
        date: '2025-05-07',
        version: 'v1.1.1',
        icon: View,
        isNew: false,
    },
    {
        id: '199',
        title: 'Support company logo',
        description: 'You can now upload company logo for better branding.',
        date: '2025-04-14',
        version: 'v1.1.0',
        icon: Image,
        isNew: false,
    },
    {
        id: '200',
        title: 'Launch',
        description: `Inception of ${APP_NAME}`,
        date: '2025-04-07',
        version: 'v1.0.0',
        icon: Sparkles,
        isNew: false,
    },
]

export default function FeatureReleases() {
    const filteredReleases = [...featureReleases].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    )

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="mx-0 sm:mx-5 md:mx-8 lg:mx-20 xl:mx-24 2xl:mx-28">
                <section className="border-b border-gray-100 py-10 lg:py-16">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-2xl space-y-3 text-center">
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Changelog
                            </p>
                            <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                                {"What's new"}
                            </h1>
                            <p className="mx-auto max-w-lg text-sm leading-relaxed text-gray-600">
                                Recent features and improvements. We ship small updates often so
                                invoicing stays simple.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-10 lg:py-16">
                    <div className="container mx-auto px-4">
                        {filteredReleases.length > 0 ? (
                            <ul className="mx-auto max-w-2xl list-none space-y-3 p-0">
                                {filteredReleases.map((release) => {
                                    const IconComponent = release.icon

                                    return (
                                        <li key={release.id}>
                                            <article className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-colors hover:border-gray-300">
                                                <div className="flex gap-3 sm:gap-4">
                                                    <div className="shrink-0">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                                                            <IconComponent
                                                                className="h-4 w-4 text-emerald-600"
                                                                strokeWidth={2.5}
                                                                aria-hidden
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="min-w-0 flex-1 space-y-2">
                                                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500">
                                                            <span className="inline-flex items-center gap-1">
                                                                <Calendar
                                                                    className="h-3.5 w-3.5 shrink-0"
                                                                    strokeWidth={2.5}
                                                                    aria-hidden
                                                                />
                                                                {formatDate(release.date)}
                                                            </span>
                                                            <span className="text-gray-300" aria-hidden>
                                                                ·
                                                            </span>
                                                            <span className="font-medium text-emerald-700">
                                                                {release.version}
                                                            </span>
                                                            {release.isNew && (
                                                                <>
                                                                    <span
                                                                        className="text-gray-300"
                                                                        aria-hidden
                                                                    >
                                                                        ·
                                                                    </span>
                                                                    <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
                                                                        New
                                                                    </span>
                                                                </>
                                                            )}
                                                        </div>
                                                        <h2 className="text-sm font-semibold text-gray-900">
                                                            {release.title}
                                                        </h2>
                                                        <p className="text-sm leading-relaxed text-gray-600">
                                                            {release.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </article>
                                        </li>
                                    )
                                })}
                            </ul>
                        ) : (
                            <div className="mx-auto max-w-md py-12 text-center">
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-gray-200 bg-gray-50">
                                    <Search
                                        className="h-5 w-5 text-gray-400"
                                        strokeWidth={2.5}
                                        aria-hidden
                                    />
                                </div>
                                <h2 className="mb-1.5 text-sm font-semibold text-gray-900">
                                    No releases found
                                </h2>
                                <p className="text-sm leading-relaxed text-gray-600">
                                    Try adjusting your search terms or category filter to find what
                                    you are looking for.
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    )
}
