'use client'

import { APP_PATHS } from '@/app/constants'
import { useListInvoiceClients } from '@/app/hooks/backend/invoice-client.hook'
import Link from 'next/link'
import ClientList from './ClientList'

export default function ClientsClient() {
    const { data, isLoading } = useListInvoiceClients()
    const clients = data?.data?.result?.rows ?? []

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="mx-auto px-4 md:px-6 py-6 md:py-10">
                <div className="flex justify-end mb-4 md:mb-6">
                    <Link
                        href={APP_PATHS.DASHBOARD.CLIENTS_CREATE}
                        className="px-3 py-1.5 text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
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
