'use client'
import PricingPlanCard from '@/app/components/PricingPlanCard'
import { API_ROUTES } from '@/app/constants/api-routes'
import { PLAN_CODES, STARTER_PRICE, SUBSCRIPTION_PLANS } from '@/app/constants/plan'
import { formatDate, sanitizeError } from '@/app/helpers'
import { postRequest } from '@/app/helpers/request'
import { useGetMeQuery } from '@/app/hooks/backend/user.hook'
import { SpinnerButton } from '@/ui/SpinnerButton'
import { useMutation } from '@tanstack/react-query'
import { CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'

const freeFeatureTexts = SUBSCRIPTION_PLANS.FREE.features.map((feature) => feature.text)
const starterFeatureTexts = SUBSCRIPTION_PLANS.STARTER.features.map((feature) => feature.text)

export default function SubscriptionClient() {
    const { data, isLoading } = useGetMeQuery()
    const result = data?.data?.result || null

    const createCheckoutSessionMutation = useMutation({
        mutationFn: () => {
            return postRequest(`${API_ROUTES.SUBSCRIPTIONS}/checkout`, {
                planCode: PLAN_CODES.STARTER,
            })
        },
        onError: (error) => {
            toast.error(sanitizeError(error))
        },
        onSuccess: ({ data }) => {
            if (!data.result.checkout_url) {
                return toast.error('Failed to checkout! Please try again.')
            }
            window.location.replace(data.result.checkout_url)
        },
    })

    const handleUpgradeClick = () => {
        return createCheckoutSessionMutation.mutate()
    }

    const activePlanCode = result?.activeSubscription?.planCode
    const isFreeActive = activePlanCode === SUBSCRIPTION_PLANS.FREE.plan
    const isStarterActive = activePlanCode === SUBSCRIPTION_PLANS.STARTER.plan
    const isCheckoutLoading = createCheckoutSessionMutation.isPending

    return (
        <div className="min-h-screen px-4 xs-sm:px-16 md:px-32 lg:px-48 2xl:px-72 py-14">
            <div className="mx-auto max-w-7xl min-w-0">
                <header className="mb-10 space-y-4 text-center lg:mb-12">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Subscription
                    </p>
                    {isStarterActive && result?.activeSubscription && (
                        <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                            Expires {formatDate(result.activeSubscription.currentPeriodEnd)}
                        </span>
                    )}
                    <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:leading-tight">
                        Save time. <span className="text-emerald-600">Get paid faster.</span> Stay
                        organized.
                    </h1>
                    <p className="mx-auto max-w-lg text-sm leading-relaxed text-gray-600">
                        {isFreeActive
                            ? 'Start free, then upgrade when you need more sends, reminders, and an ad-free workflow.'
                            : 'Manage your plan and billing preferences below.'}
                    </p>
                </header>

                <div className="grid min-w-0 grid-cols-1 items-stretch gap-6 py-4 xl:grid-cols-2 xl:gap-8">
                    <div className="flex min-w-0 h-full">
                        <PricingPlanCard
                            className="w-full"
                            title="Free Plan"
                            features={freeFeatureTexts}
                            highlighted={isFreeActive}
                            pricing={
                                <>
                                    <p className="text-base font-semibold text-gray-900">
                                        Free forever
                                    </p>
                                    <p className="mt-1 text-xs text-gray-500">
                                        No credit card required
                                    </p>
                                    {isLoading ? (
                                        <div className="mt-4">
                                            <SpinnerButton />
                                        </div>
                                    ) : isFreeActive ? (
                                        <p className="mt-4 flex items-center justify-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 py-2.5 text-xs font-semibold text-emerald-700">
                                            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
                                            Active
                                        </p>
                                    ) : (
                                        <p className="mt-4 rounded-lg border border-gray-200 bg-white py-2.5 text-center text-xs font-semibold text-gray-400">
                                            —
                                        </p>
                                    )}
                                </>
                            }
                        />
                    </div>

                    <div className="flex min-w-0 h-full">
                        <PricingPlanCard
                            className="w-full"
                            title="Starter Plan"
                            features={starterFeatureTexts}
                            highlighted={isStarterActive}
                            firstItemMuted
                            pricing={
                                <>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-bold text-gray-900">
                                            ${STARTER_PRICE.monthly}
                                        </span>
                                        <span className="text-xs text-gray-500">/ month</span>
                                    </div>
                                    {isLoading || isCheckoutLoading ? (
                                        <div className="mt-4">
                                            <SpinnerButton
                                                message={
                                                    isCheckoutLoading ? 'Redirecting…' : undefined
                                                }
                                            />
                                        </div>
                                    ) : isStarterActive ? (
                                        <p className="mt-4 flex items-center justify-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 py-2.5 text-xs font-semibold text-emerald-700">
                                            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
                                            Active
                                        </p>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={handleUpgradeClick}
                                            className="mt-4 w-full rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                        >
                                            Upgrade
                                        </button>
                                    )}
                                </>
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
