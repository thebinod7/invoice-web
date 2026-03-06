import { Button } from '@/components/ui/button'
import { CheckCircle, Clock, User } from 'lucide-react'

interface ReferralCardProps {
    id: string
    name: string
    status: 'qualified' | 'pending' | 'claimed'
    dateReferred: string
    onClaim?: () => void
}

export default function RefCard({ id, name, status, dateReferred, onClaim }: ReferralCardProps) {
    const statusConfig = {
        qualified: {
            label: 'Qualified',
            color: 'bg-green-50 text-green-700 border-green-200',
            icon: CheckCircle,
        },
        pending: {
            label: 'Pending',
            color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
            icon: Clock,
        },
        claimed: {
            label: 'Claimed',
            color: 'bg-gray-50 text-gray-700 border-gray-200',
            icon: CheckCircle,
        },
    }

    const config = statusConfig[status]
    const StatusIcon = config.icon

    const isQualified = status === 'qualified'

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            {/* Header with icon and name */}
            <div className="flex items-start gap-3 mb-4">
                <div className="bg-blue-100 rounded-full p-2">
                    <User className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{name}</h3>
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
            <div className="mb-6">
                <p className="text-sm text-gray-600">Date Referred</p>
                <p className="text-sm font-medium text-gray-900">{dateReferred}</p>
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
                    {status === 'claimed' ? 'Claimed' : 'Not Qualified'}
                </Button>
            )}
        </div>
    )
}
