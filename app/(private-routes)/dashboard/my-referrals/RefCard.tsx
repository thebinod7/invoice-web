import { formatDate } from '@/app/helpers'
import { Button } from '@/components/ui/button'
import { CheckCircle, Clock, User } from 'lucide-react'

const REFERRAL_STATUS = {
    PENDING: 'PENDING',
    QUALIFIED: 'QUALIFIED',
    REWARDED: 'REWARDED',
}

type ReferralStatus = 'QUALIFIED' | 'PENDING' | 'REWARDED'

interface ReferralCardProps {
    referredUserId: Record<string, any>
    referrerUserId: string
    status: string
    createdAt: string
    onClaim?: () => void
}

export default function RefCard({ referredUserId, status, createdAt, onClaim }: ReferralCardProps) {
    const statusConfig: Record<
        ReferralStatus,
        {
            label: string
            color: string
            icon: any
        }
    > = {
        QUALIFIED: {
            label: 'Qualified',
            color: 'bg-green-50 text-green-700 border-green-200',
            icon: CheckCircle,
        },
        PENDING: {
            label: 'Pending',
            color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
            icon: Clock,
        },
        REWARDED: {
            label: 'Rewarded',
            color: 'bg-gray-50 text-gray-700 border-gray-200',
            icon: CheckCircle,
        },
    }

    const config = statusConfig[status as ReferralStatus]
    const StatusIcon = config.icon
    const isQualified = status === REFERRAL_STATUS.QUALIFIED

    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
            {/* Header with icon and name */}
            <div className="flex items-start gap-3 mb-4">
                <div className="bg-blue-100 rounded-full p-2">
                    <User className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {referredUserId.firstName} {referredUserId.lastName}
                    </h3>
                </div>
            </div>

            {/* Status badge */}
            <div className="mb-4">
                <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium ${config.color}`}
                >
                    <StatusIcon className="w-4 h-4" />
                    <span>{config.label}</span>
                </div>
            </div>

            {/* Date referred */}
            <div className="mb-4">
                <p className="text-xs font-medium text-gray-600">Joined On</p>
                <p className="text-xs font-medium text-gray-900">{formatDate(createdAt)}</p>
            </div>

            {/* CTA Button - only for qualified users */}
            {isQualified && (
                <Button disabled={false} onClick={onClaim} className="w-full h-10 mt-8">
                    Claim
                </Button>
            )}

            {/* Disabled state for non-qualified */}
            {!isQualified && (
                <Button variant={'default'} disabled className="w-full mt-8 cursor-not-allowed">
                    {status === REFERRAL_STATUS.REWARDED ? 'Claimed' : 'Not Qualified'}
                </Button>
            )}
        </div>
    )
}
