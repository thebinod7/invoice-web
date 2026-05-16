'use client'
import { useGoogleOneTapLogin } from '@react-oauth/google'
import { useMutation } from '@tanstack/react-query'
import { Eye, FileText, Sparkles, Users } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { postRequest } from '../helpers/request'
import { API_ROUTES } from '../constants/api-routes'
import { toast } from 'sonner'
import { APP_PATHS } from '../constants'
import { getReferralCode } from '../helpers/local-storage'
import { useAuthContext } from '../context/useAuthContext'
import HomeHeroPricing from './HomeHeroPricing'

export default function HomeHero() {
    const { isLoading, currentUser } = useAuthContext()
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
        mutationFn: (payload: any) => {
            return postRequest(API_ROUTES.AUTH + '/google-login', payload)
        },
        onError: (err) => {
            toast.error('Failed to login with Google, Please try again.')
        },
        onSuccess: ({ data }) => {
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
        <section className="py-10 lg:py-16">
            <div className="container mx-auto px-4">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
                    <div className="min-w-0 space-y-10 lg:space-y-12">
                        <div className="relative" id="stats">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center lg:text-left">
                                Monthly Stats
                            </h3>

                            {stats.loading ? (
                                <div className="mb-4 space-y-2">
                                    <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-3 bg-gray-100 rounded animate-pulse w-16"></div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 bg-emerald-100 rounded-md">
                                                <FileText className="h-3 w-3 text-emerald-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Invoices</p>
                                                <p className="text-sm font-semibold text-gray-900">
                                                    {formatNumber(stats.invoices) + '+'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 bg-blue-100 rounded-md">
                                                <Users className="h-3 w-3 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Unique Visits</p>
                                                <p className="text-sm font-semibold text-gray-900">
                                                    {formatNumber(stats.visitors) + '+'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 bg-purple-100 rounded-md">
                                                <Eye className="h-3 w-3 text-purple-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Views</p>
                                                <p className="text-sm font-semibold text-gray-900">
                                                    {formatNumber(stats.pageViews) + '+'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>


                        <div className="space-y-5 text-center lg:text-left">
                            <div className="space-y-3">
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Invoice maker
                                </p>
                                <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                                    Free · No sign-up
                                </span>
                                <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl lg:leading-tight">
                                    Create professional invoices for{' '}
                                    <span className="text-emerald-600">free</span>
                                </h1>
                                <p className="mx-auto max-w-lg text-sm leading-relaxed text-gray-600 lg:mx-0">
                                    Generate and download ready-to-send invoices in seconds—no
                                    account required.
                                </p>
                            </div>
                            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                                <Link
                                    href="/create-invoice"
                                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                >
                                    Create an invoice
                                    <FileText className="h-4 w-4" strokeWidth={2.5} aria-hidden />
                                </Link>
                                <a
                                    href="#seo"
                                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                                >
                                    Why us?
                                    <Sparkles className="h-4 w-4 text-emerald-600" strokeWidth={2.5} aria-hidden />
                                </a>
                            </div>
                        </div>

                    </div>
                    <div className="min-w-0 w-full lg:max-w-lg lg:justify-self-end">
                        <HomeHeroPricing />
                    </div>
                </div>
            </div>
        </section>
    )
}
