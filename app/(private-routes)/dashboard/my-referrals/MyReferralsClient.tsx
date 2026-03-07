'use client'
import { API_ROUTES } from '@/app/constants/api-routes'
import { sanitizeError } from '@/app/helpers'
import { postRequest } from '@/app/helpers/request'
import { useListMyReferralQuery } from '@/app/hooks/backend/user.hook'
import MiniLoader from '@/ui/MiniLoader'
import { useMutation } from '@tanstack/react-query'
import { Award } from 'lucide-react'
import { toast } from 'sonner'
import RefCard from './RefCard'
import { useRouter } from 'next/navigation'
import { APP_PATHS } from '@/app/constants'

export default function MyReferralsClient() {
    const { data, isLoading } = useListMyReferralQuery()
    const router = useRouter()

    const claimRewardMutation = useMutation({
        mutationFn: (payload: any) => {
            return postRequest(`${API_ROUTES.USERS}/me/referral-claim/${payload.referralId}`, {})
        },
        onError: (error) => {
            toast.error(sanitizeError(error))
        },
        onSuccess: () => {
            toast.success('Congrats! Reward claimed successfully!')
            router.push(APP_PATHS.DASHBOARD.SUBSCRIPTION)
        },
    })

    const handleClaim = (referralId: string) => {
        return claimRewardMutation.mutateAsync({
            referralId,
        })
    }

    const result = data?.data?.result || null

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="mx-auto px-4 md:px-6 py-6 md:py-10">
                {/* Header Section */}
                <div className="bg-white border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-3 mb-2">
                            <Award className="w-8 h-8 text-blue-600" />
                            <h1 className="text-md sm:text-xl font-bold text-gray-900">
                                Your Referrals ({result?.meta.total || 0})
                            </h1>
                        </div>
                        <p className="text-gray-600 text-sm">
                            Track your referrals and claim your rewards. Reward is granted after the
                            referred user purchases a plan.
                        </p>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                    {isLoading ? (
                        <MiniLoader />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {result?.rows.map((referral: any) => (
                                <RefCard
                                    key={referral._id}
                                    {...referral}
                                    status={referral.status}
                                    handleClaim={() => handleClaim(referral._id)}
                                    isClaiming={claimRewardMutation.isPending}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {!isLoading && result?.rows.length === 0 && (
                    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
                        <h3 className="text-lg font-medium">You haven't referred anyone yet.</h3>
                        <p className="text-gray-500 text-sm font-medium mt-2">
                            Start sharing your referral link with people who could find this
                            platform useful.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
