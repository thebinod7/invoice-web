'use client'

import { useGoogleOneTapLogin } from '@react-oauth/google'
import { useMutation } from '@tanstack/react-query'
import {
    ArrowRight,
    Eye,
    FileText,
    Play,
    Users,
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { APP_PATHS, SOCIAL_LINKS } from '../constants'
import { API_ROUTES } from '../constants/api-routes'
import { useAuthContext } from '../context/useAuthContext'
import { getReferralCode } from '../helpers/local-storage'
import { postRequest } from '../helpers/request'
import { useHomepagePublicDataQuery } from '../hooks/backend/user.hook'
import { useEffect, useState } from 'react'


function DashboardMock() {
    return (
        <div className="relative mx-auto w-full max-w-md lg:max-w-none" aria-hidden>
            {/* Dashboard shell */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="flex min-h-[260px] sm:min-h-[300px]">
                    {/* Sidebar — hidden on very small screens */}
                    <aside className="hidden w-24 shrink-0 border-r border-gray-100 bg-gray-50 p-3 sm:block">
                        <div className="mb-4 h-2 w-12 rounded bg-emerald-200" />
                        <div className="space-y-2.5">
                            {['Dashboard', 'Invoice', 'Clients', 'Settings'].map((label) => (
                                <div
                                    key={label}
                                    className={`rounded-md px-2 py-1.5 text-[10px] font-medium ${label === 'Overview'
                                        ? 'bg-emerald-50 text-emerald-700'
                                        : 'text-gray-500'
                                        }`}
                                >
                                    {label}
                                </div>
                            ))}
                        </div>
                    </aside>

                    <div className="min-w-0 flex-1 p-3 sm:p-4">
                        <div className="mb-3 flex items-center justify-between">
                            <div className="h-2.5 w-20 rounded bg-gray-200" />
                            <div className="h-6 w-6 rounded-full bg-emerald-100" />
                        </div>

                        {/* Mini stat chips */}
                        <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                            {[
                                { label: 'Invoices', value: '150' },
                                { label: 'Paid', value: '130' },
                                { label: 'Sent', value: '125' },
                                { label: 'Pending', value: '12' },
                            ].map((stat) => (
                                <div
                                    key={stat.label}
                                    className="rounded-lg border border-gray-100 bg-gray-50 px-2 py-1.5"
                                >
                                    <p className="text-[9px] text-gray-500">{stat.label}</p>
                                    <p className="text-xs font-semibold text-gray-900">
                                        {stat.value}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Fake chart */}
                        <div className="mb-3 flex h-16 items-end gap-1 rounded-lg border border-gray-100 bg-gray-50/80 px-2 pb-2 pt-3">
                            {[40, 65, 45, 80, 55, 90, 70, 85].map((h, i) => (
                                <div
                                    key={i}
                                    className="flex-1 rounded-sm bg-emerald-200"
                                    style={{ height: `${h}%` }}
                                />
                            ))}
                        </div>

                        {/* Tiny table */}
                        <div className="space-y-1.5">
                            {['INV-1042', 'INV-1041', 'INV-1040'].map((id, i) => (
                                <div
                                    key={id}
                                    className="flex items-center justify-between rounded-md px-1.5 py-1 text-[10px]"
                                >
                                    <span className="font-medium text-gray-700">{id}</span>
                                    <span className="text-gray-400">
                                        {i === 0 ? 'Paid' : 'Pending'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlapping invoice card */}
            <div className="absolute -bottom-4 -right-2 w-[70%] max-w-[240px] rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:-bottom-6 sm:-right-4 sm:max-w-[260px] sm:p-5">
                <div className="mb-3 flex items-start justify-between gap-2">
                    <div>
                        <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                            Bill To
                        </p>
                        <p className="text-sm font-semibold text-gray-900">Acme Studio</p>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                        Paid
                    </span>
                </div>
                <p className="mb-3 text-[10px] text-gray-500">Invoice #INV-1042</p>
                <div className="space-y-2 border-t border-gray-100 pt-2">
                    {[
                        { name: 'Design sprint', amount: '$1,200' },
                        { name: 'Brand assets', amount: '$450' },
                    ].map((item) => (
                        <div
                            key={item.name}
                            className="flex items-center justify-between text-[11px]"
                        >
                            <span className="text-gray-600">{item.name}</span>
                            <span className="font-medium text-gray-900">{item.amount}</span>
                        </div>
                    ))}
                    <div className="flex items-center justify-between border-t border-gray-100 pt-2 text-xs">
                        <span className="font-semibold text-gray-900">Total</span>
                        <span className="font-semibold text-emerald-600">$1,650</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function HomeHeroV2() {
    const { isLoading, currentUser } = useAuthContext()
    const { data: homepageData, isLoading: isHomepageLoading } = useHomepagePublicDataQuery()
    const totalUsers = homepageData?.data?.result?.totalUsers
    const lastThreeUsersInitial = homepageData?.data?.result?.lastThreeUsersInitial || [
        'A',
        'M',
        'S',
    ]

    const [stats, setStats] = useState({
        pageViews: 0,
        visitors: 0,
        invoices: 0,
        loading: true,
    })

    const formatNumber = (num: number) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k'
        }
        return num.toLocaleString()
    }

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/analytics')
                const r = await res.json()
                const currentWeekStats = {
                    pageViews: r.pageViews,
                    visitors: r.visitors,
                    invoices: r.invoices,
                    loading: false,
                }

                setStats(currentWeekStats)
            } catch (error) {
                console.error('Failed to fetch stats:', error)
                setStats((prev) => ({ ...prev, loading: false }))
            }
        }

        fetchStats()
    }, [])

    const loginWithGoogleMutation = useMutation({
        mutationFn: (payload: { googleToken?: string; referralCode: string | null; action: string }) => {
            return postRequest(API_ROUTES.AUTH + '/google-login', payload)
        },
        onError: () => {
            toast.error('Failed to login with Google, Please try again.')
        },
        onSuccess: () => {
            toast.success('Successfully logged in with Google!')
            window.location.replace(APP_PATHS.DASHBOARD.HOME)
        },
    })

    const showOneTap = !isLoading && !currentUser

    useGoogleOneTapLogin({
        disabled: !showOneTap,
        auto_select: false,
        onSuccess: (response) => {
            const refCode = getReferralCode()
            return loginWithGoogleMutation.mutateAsync({
                googleToken: response.credential,
                referralCode: refCode,
                action: 'one_tap',
            })
        },
        onError: () => {
            toast.error('Google Login Failed! Please try again.')
        },
    })

    return (
        <>
            <section className="relative overflow-hidden bg-white py-12 lg:py-20">
                <div className="container relative mx-auto px-4">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
                        {/* Left: copy */}
                        <div className="min-w-0 space-y-6 text-center lg:text-left">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                                Free to start. No credit card required.
                            </span>

                            <div className="space-y-3">
                                <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl lg:leading-tight">
                                    Professional Invoices,{' '}
                                    <span className="text-emerald-600">in Minutes.</span>
                                </h1>
                                <p className="mx-auto max-w-lg text-sm leading-relaxed text-gray-600 lg:mx-0">
                                    Generate professional invoices for freelancers and small businesses. Track payment status, send one-click reminders, and manage your clients in one place.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                                <Link
                                    href={APP_PATHS.CREATE_INVOICE}
                                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                >
                                    Create Your Invoice
                                    <ArrowRight className="h-4 w-4" strokeWidth={2.5} aria-hidden />
                                </Link>
                                <a
                                    href={SOCIAL_LINKS.DEMO_VIDEO_LINK}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                                >
                                    <Play className="h-4 w-4 text-emerald-600" aria-hidden />
                                    Watch Demo
                                </a>
                            </div>

                            {isHomepageLoading ? (
                                <div className="mx-auto h-9 w-56 animate-pulse rounded-lg bg-gray-200 lg:mx-0" />
                            ) : typeof totalUsers === 'number' ? (
                                <div className="flex items-center justify-center gap-3 lg:justify-start">
                                    <div className="flex -space-x-2" aria-hidden>
                                        {lastThreeUsersInitial.map((initial: string) => (
                                            <span
                                                key={initial}
                                                className="relative z-[3] flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-emerald-600 text-[10px] font-semibold text-white"
                                            >
                                                {initial}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="min-w-0 text-left">
                                        <p className="text-sm font-semibold tracking-tight text-gray-900">
                                            Trusted by{' '}
                                            <span className="tabular-nums text-emerald-600">
                                                {totalUsers.toLocaleString()}+
                                            </span>{' '}
                                            professionals
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Freelancers & small businesses worldwide
                                        </p>
                                    </div>
                                </div>
                            ) : null}


                        </div>

                        {/* Right: decorative mock */}
                        <div className="relative min-w-0 pb-8 sm:pb-10">
                            <DashboardMock />
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust bar */}
            <section className="border-t border-gray-100 bg-white py-10 lg:py-12">
                <div className="container mx-auto px-4">
                    <p className="mb-6 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Monthly Stats
                    </p>
                    <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10 lg:gap-16">
                        {(
                            [
                                { icon: FileText, label: 'Invoices', value: stats.invoices },
                                { icon: Users, label: 'Unique Visits', value: stats.visitors },
                                { icon: Eye, label: 'Views', value: stats.pageViews },
                            ] as const
                        ).map(({ icon: Icon, label, value }) => (
                            <div key={label} className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
                                    <Icon className="h-4 w-4 text-emerald-600" aria-hidden />
                                </div>
                                <div>
                                    {stats.loading ? (
                                        <div className="space-y-1.5">
                                            <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                                            <div className="h-3 w-20 animate-pulse rounded bg-gray-100" />
                                        </div>
                                    ) : (
                                        <>
                                            <p className="text-sm font-semibold tabular-nums text-gray-900">
                                                {formatNumber(value)}+
                                            </p>
                                            <p className="text-xs text-gray-500">{label}</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
