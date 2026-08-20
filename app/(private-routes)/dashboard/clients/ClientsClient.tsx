'use client'

import { APP_PATHS } from '@/app/constants'
import { useListInvoiceClients } from '@/app/hooks/backend/invoice-client.hook'
import { Info } from 'lucide-react'
import Link from 'next/link'
import ClientList from './ClientList'

export default function ClientsClient() {
    const { data, isLoading } = useListInvoiceClients()
    const clients = data?.data?.result?.rows ?? []

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="mx-auto px-4 md:px-6 py-6 md:py-10">
                <div className="mb-4 md:mb-6 flex flex-col items-stretch gap-3 md:flex-row">
                    <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800">
                        <Info className="h-4 w-4 shrink-0" />
                        <p className="leading-snug">
                            Save clients here, then select them when creating an invoice to fill in their details.
                        </p>
                    </div>
                    <Link
                        href={APP_PATHS.DASHBOARD.CLIENTS_CREATE}
                        className="flex items-center justify-center px-3 py-2 text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors md:shrink-0 md:py-0"
                    >
                        Add client
                    </Link>
                </div>

                {isLoading ? (
                    <div className="text-center py-10">Loading...</div>
                ) : (
                    <ClientList clients={clients} />
                )}
            </div>
        </div>
    )
}
