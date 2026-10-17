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
                <div className="flex gap-2">
                    <div className="flex-1 rounded-lg border border-red-100 bg-red-50 px-3 py-2">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-red-700">Expiry</p>
                        <p className="font-medium text-red-900">{formatDate(subscriptionExpiryDate)}</p>
                    </div>
                    <div className="flex-1 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Last Login</p>
                        <p className="font-medium text-slate-900">
                            {lastLoginDate ? formatDate(lastLoginDate) : '—'}
                        </p>
                    </div>
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
            </CardContent>
        </Card>
    )
}
