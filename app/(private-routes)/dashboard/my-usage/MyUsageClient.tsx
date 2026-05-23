'use client'

import React from 'react'
import { formatDate } from '@/app/helpers'
import {
    BarChart3,
    Bell,
    CalendarRange,
    Download,
    Infinity,
    Mail,
    RefreshCw,
    Sparkles,
    Users,
    type LucideIcon,
} from 'lucide-react'
import { myFeatureUsageQuery } from '@/app/hooks/backend/user.hook'
import MiniLoader from '@/ui/MiniLoader'

type UsageFeature = {
    featureKey: string
    type: string
    limit: number | string
    used: number | string
    remaining: number | string
}

type UsageResult = {
    planCode: string
    period: string
    currentPeriodStart: string
    currentPeriodEnd: string
    features: UsageFeature[]
}

const FEATURE_META: Record<string, { label: string; icon: LucideIcon }> = {
    INVOICE_EMAIL_LIMIT: { label: 'Invoice Emails', icon: Mail },
    INVOICE_REMINDER_LIMIT: { label: 'Invoice Reminders', icon: Bell },
    INVOICE_EDIT_DOWNLOAD_LIMIT: { label: 'Edit & Download', icon: Download },
    INVOICE_STATUS_UPDATE_LIMIT: { label: 'Status Updates', icon: RefreshCw },
    MANAGE_CLIENT_LIMIT: { label: 'Clients', icon: Users },
    PROMPT_TO_INVOICE: { label: 'Prompt to Invoice', icon: Sparkles },
}

const UNLIMITED_THRESHOLD = 2000

function toNumber(value: number | string) {
    const parsed = typeof value === 'number' ? value : Number(value)
    return Number.isFinite(parsed) ? parsed : 0
}

function isUnlimitedLimit(limit: number | string) {
    return toNumber(limit) >= UNLIMITED_THRESHOLD
}

function getUsagePercent(used: number | string, limit: number | string) {
    const parsedLimit = toNumber(limit)
    const parsedUsed = toNumber(used)

    if (isUnlimitedLimit(parsedLimit) || parsedLimit <= 0) return 0
    return Math.min(100, Math.round((parsedUsed / parsedLimit) * 100))
}

function getProgressBarColor(percent: number) {
    if (percent >= 90) return 'bg-red-500'
    if (percent >= 70) return 'bg-amber-500'
    return 'bg-blue-600'
}

export default function MyUsageClient() {
    const { data, isLoading } = myFeatureUsageQuery()
    const result: UsageResult | null = data?.data?.result || null

    if (isLoading) return <div className="flex items-center justify-center h-full">
        <MiniLoader />
    </div>

    if (!result) return <div className="flex items-center justify-center h-full">
        <div className="text-center text-gray-500">No data found</div>
    </div>

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:px-8 md:py-10">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3">
                        <BarChart3 className="h-8 w-8 text-blue-600" />
                        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">My Usage</h1>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                        Track your plan limits and remaining quota for the current billing period.
                    </p>
                </div>

                {/* Plan summary */}
                <div className="mb-8 rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                Current Plan
                            </p>
                            <p className="mt-1 text-lg font-semibold text-gray-900">
                                {result.planCode}
                            </p>
                        </div>
                        <div className="flex items-start gap-2 text-sm text-gray-600">
                            <CalendarRange className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                            <div>
                                <p className="font-medium text-gray-900">Period {result.period}</p>
                                <p>
                                    {formatDate(result.currentPeriodStart)} –{' '}
                                    {formatDate(result.currentPeriodEnd)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feature usage grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {result.features.map((feature) => {
                        const meta = FEATURE_META[feature.featureKey] ?? {
                            label: feature.featureKey.replace(/_/g, ' '),
                            icon: BarChart3,
                        }
                        const Icon = meta.icon
                        const limit = toNumber(feature.limit)
                        const used = toNumber(feature.used)
                        const remaining = toNumber(feature.remaining)
                        const isUnlimited = isUnlimitedLimit(limit)
                        const percent = getUsagePercent(used, limit)
                        const progressColor = getProgressBarColor(percent)

                        return (
                            <div
                                key={feature.featureKey}
                                className="rounded-xl border border-gray-200 bg-white p-5"
                            >
                                <div className="mb-4 flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium text-gray-900">
                                            {meta.label}
                                        </p>
                                        <p className="mt-0.5 text-xs capitalize text-gray-500">
                                            {feature.type}
                                        </p>
                                    </div>
                                    <div className="rounded-lg bg-slate-100 p-2 text-slate-600">
                                        <Icon className="h-4 w-4" />
                                    </div>
                                </div>

                                {isUnlimited ? (
                                    <div className="space-y-3">
                                        <p className="text-2xl font-semibold text-gray-900">
                                            {used}
                                            <span className="text-base font-normal text-gray-400">
                                                {' '}
                                                used
                                            </span>
                                        </p>
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                                            <Infinity className="h-3.5 w-3.5" />
                                            Unlimited
                                        </span>
                                    </div>
                                ) : (
                                    <div className="mb-3 flex items-end justify-between gap-2">
                                        <p className="text-2xl font-semibold text-gray-900">
                                            {used}
                                            <span className="text-base font-normal text-gray-400">
                                                {' '}
                                                / {limit}
                                            </span>
                                        </p>
                                        <p className="text-xs font-medium text-gray-500">
                                            {remaining} left
                                        </p>
                                    </div>
                                )}

                                {!isUnlimited && (
                                    <>
                                        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                                            <div
                                                className={`h-full rounded-full transition-all ${progressColor}`}
                                                style={{ width: `${percent}%` }}
                                            />
                                        </div>
                                        <p className="mt-2 text-xs text-gray-500">{percent}% used</p>
                                    </>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
