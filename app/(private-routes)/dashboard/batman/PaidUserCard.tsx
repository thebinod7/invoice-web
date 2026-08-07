import { formatDate } from '@/app/helpers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export type PaidUser = {
    name: string
    email: string
    subscriptionExpiryDate: string
    onboardedFrom: string | null
    primaryGoal: string | null
    numberOfInvoices: number
    numberOfEmailsSent: number
    lastLoginDate: string | null
}

function humanize(value: string | null) {
    if (!value) return '—'
    return value.replace(/_/g, ' ')
}

export default function PaidUserCard({
    name,
    email,
    subscriptionExpiryDate,
    onboardedFrom,
    primaryGoal,
    numberOfInvoices,
    numberOfEmailsSent,
    lastLoginDate,
}: PaidUser) {
    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="text-base text-slate-900 truncate">{name}</CardTitle>
                <p className="text-sm text-slate-500 truncate">{email}</p>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
                <div>
                    <p className="text-xs font-medium text-slate-500">Expiry</p>
                    <p className="text-slate-900">{formatDate(subscriptionExpiryDate)}</p>
                </div>
                <div>
                    <p className="text-xs font-medium text-slate-500">Source / Goal</p>
                    <p className="text-slate-900 capitalize">
                        {humanize(onboardedFrom)} / {humanize(primaryGoal)}{' '}
                    </p>
                </div>
                <div>
                    <p className="text-xs font-medium text-slate-500">Invoice Created / Sent</p>
                    <p className="text-slate-900">
                        {numberOfInvoices} / {numberOfEmailsSent}
                    </p>
                </div>
                <div>
                    <p className="text-xs font-medium text-slate-500">Last Login</p>
                    <p className="text-slate-900">
                        {lastLoginDate ? formatDate(lastLoginDate) : '—'}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
