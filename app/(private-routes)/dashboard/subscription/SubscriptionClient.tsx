'use client'
import PricingPlanCard from '@/app/components/PricingPlanCard'
import { API_ROUTES } from '@/app/constants/api-routes'
import { QUERY_KEYS } from '@/app/constants/query-keys'
import {
    PLAN_CODES,
    STARTER_PRICE,
    SUBSCRIPTION_INTERVALS,
    SUBSCRIPTION_PLANS,
} from '@/app/constants/plan'
import { formatDate, sanitizeError } from '@/app/helpers'
import { getRequest, patchRequest, postRequest } from '@/app/helpers/request'
import { useGetMeQuery } from '@/app/hooks/backend/user.hook'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { GlobalModal } from '@/ui/GlobalModal'
import { SpinnerButton } from '@/ui/SpinnerButton'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

type BillingInterval = (typeof SUBSCRIPTION_INTERVALS)[keyof typeof SUBSCRIPTION_INTERVALS]

const freeFeatureTexts = SUBSCRIPTION_PLANS.FREE.features.map((feature) => feature.text)
const starterFeatureTexts = SUBSCRIPTION_PLANS.STARTER.features.map((feature) => feature.text)

export default function SubscriptionClient() {
    const [billingInterval, setBillingInterval] = useState<BillingInterval>(
        SUBSCRIPTION_INTERVALS.MONTHLY,
    )
    const [showCancelModal, setShowCancelModal] = useState(false)
    const [cancelFormData, setCancelFormData] = useState({ reason: '', improvement: '' })
    const { data, isLoading } = useGetMeQuery()
    const result = data?.data?.result || null

    const isYearly = billingInterval === 'yearly'
    const starterPrice = isYearly ? STARTER_PRICE.yearly : STARTER_PRICE.monthly
    const yearlySavingsPercent = Math.round(
        (1 - STARTER_PRICE.yearly / (STARTER_PRICE.monthly * 12)) * 100,
    )

    const createCheckoutSessionMutation = useMutation({
        mutationFn: (interval: BillingInterval) => {
            return postRequest(`${API_ROUTES.SUBSCRIPTIONS}/checkout`, {
                planCode: PLAN_CODES.STARTER,
                interval: interval,
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
        return createCheckoutSessionMutation.mutate(billingInterval)
    }

    const queryClient = useQueryClient()

    const cancelSubscriptionMutation = useMutation({
        mutationFn: async () => {
            // `me` doesn't expose the subscription id; fetch the current
            // subscription to get the Dodo `customerSubscriptionId`.
            const { data } = await getRequest(`${API_ROUTES.SUBSCRIPTIONS}/current`)
            const subId = data?.result?.customerSubscriptionId
            return patchRequest(`${API_ROUTES.SUBSCRIPTIONS}/cancel/${subId}`, {})
        },
        onError: (error) => {
            toast.error(sanitizeError(error))
        },
        onSuccess: () => {
            setShowCancelModal(false)
            setCancelFormData({ reason: '', improvement: '' })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.USER.GET_ME],
            })
            toast.success(
                'Subscription will be cancelled at the end of the billing cycle! You will still have access to the paid features until then.',
            )
        },
        onSettled: () => {
            toast.dismiss()
        },
    })

    const handleCancelClick = () => {
        if (!isStarterActive || !result?.activeSubscription) {
            return toast.error('No active paid subscription to cancel.')
        }
        setShowCancelModal(true)
    }

    const handleCancelSubmit = () => {
        if (!cancelFormData.reason.trim() || !cancelFormData.improvement.trim()) {
            return toast.error('Please answer both questions before submitting.')
        }
        toast.loading('Cancelling subscription...')
        return cancelSubscriptionMutation.mutate()
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
                                    <div className="mb-3 inline-flex rounded-lg border border-gray-200 bg-white p-1">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setBillingInterval(SUBSCRIPTION_INTERVALS.MONTHLY)
                                            }
                                            className={cn(
                                                'rounded-md px-3 py-1.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1',
                                                billingInterval === SUBSCRIPTION_INTERVALS.MONTHLY
                                                    ? 'bg-emerald-600 text-white'
                                                    : 'text-gray-600 hover:text-gray-900',
                                            )}
                                        >
                                            Monthly
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setBillingInterval(SUBSCRIPTION_INTERVALS.YEARLY)
                                            }
                                            className={cn(
                                                'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1',
                                                billingInterval === SUBSCRIPTION_INTERVALS.YEARLY
                                                    ? 'bg-emerald-600 text-white'
                                                    : 'text-gray-600 hover:text-gray-900',
                                            )}
                                        >
                                            Yearly
                                            <span
                                                className={cn(
                                                    'rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide',
                                                    billingInterval ===
                                                        SUBSCRIPTION_INTERVALS.YEARLY
                                                        ? 'bg-emerald-500 text-white'
                                                        : 'bg-emerald-50 text-emerald-700',
                                                )}
                                            >
                                                Save {yearlySavingsPercent}%
                                            </span>
                                        </button>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-bold text-gray-900">
                                            ${starterPrice}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            /{' '}
                                            {billingInterval === SUBSCRIPTION_INTERVALS.YEARLY
                                                ? SUBSCRIPTION_INTERVALS.YEARLY
                                                : SUBSCRIPTION_INTERVALS.MONTHLY}
                                        </span>
                                    </div>
                                    {billingInterval === SUBSCRIPTION_INTERVALS.YEARLY && (
                                        <p className="mt-1 text-xs text-gray-500">
                                            ${(STARTER_PRICE.yearly / 12).toFixed(2)} / month billed
                                            annually
                                        </p>
                                    )}
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
                    {/* Remove 'hidden' and add 'flex' to display button */}
                    <div className="mt-0 justify-center xl:col-span-2 hidden">
                        <button
                            type="button"
                            onClick={handleCancelClick}
                            className="text-center text-xs font-semibold text-gray-700 underline-offset-4 transition-colors hover:text-red-600 hover:underline focus:outline-none focus-visible:underline disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={!isStarterActive || !result?.activeSubscription}
                        >
                            Cancel Subscription
                        </button>
                    </div>
                </div>

                <GlobalModal
                    isOpen={showCancelModal}
                    onOpenChange={setShowCancelModal}
                    title="Cancel Subscription"
                    description="We're sorry to see you go. Help us improve by answering two quick questions."
                    size="md"
                    processing={cancelSubscriptionMutation.isPending}
                    actions={[
                        {
                            label: 'Keep Subscription',
                            onClick: () => setShowCancelModal(false),
                            variant: 'outline',
                        },
                        {
                            label: 'Cancel Subscription',
                            onClick: handleCancelSubmit,
                            variant: 'destructive',
                        },
                    ]}
                >
                    <div className="px-4 pb-0">
                        <form className="space-y-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="cancelReason" className="text-sm font-medium">
                                    Why are you cancelling? <span className="text-red-500">*</span>
                                </Label>
                                <Textarea
                                    id="cancelReason"
                                    name="cancelReason"
                                    placeholder="Tell us what went wrong..."
                                    className="min-h-[80px]"
                                    value={cancelFormData.reason}
                                    onChange={(e) =>
                                        setCancelFormData({
                                            ...cancelFormData,
                                            reason: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="improvement" className="text-sm font-medium">
                                    What can we do better? <span className="text-red-500">*</span>
                                </Label>
                                <Textarea
                                    id="improvement"
                                    name="improvement"
                                    placeholder="Share your feedback..."
                                    className="min-h-[80px]"
                                    value={cancelFormData.improvement}
                                    onChange={(e) =>
                                        setCancelFormData({
                                            ...cancelFormData,
                                            improvement: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </form>
                    </div>
                </GlobalModal>
            </div>
        </div>
    )
}
