'use client'

import { APP_PATHS } from '@/app/constants'
import { Pencil } from 'lucide-react'
import Link from 'next/link'
import { InvoiceClient } from './ClientList'

interface ClientCardProps {
    client: InvoiceClient
}

export default function ClientCard({ client }: ClientCardProps) {


    return (
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 p-3.5 md:p-4 bg-white border border-slate-200 rounded-xl hover:shadow-md transition-shadow">
            <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-slate-900 line-clamp-2">
                    {client.name}
                </div>
                <div className="text-xs text-slate-400 mt-1">{client.email}</div>
                <div className="text-xs text-slate-400 mt-1">{client.address || '—'}</div>
            </div>

            <div className="flex items-center gap-2">
                <Link
                    href={`${APP_PATHS.DASHBOARD.CLIENTS_EDIT}/${client._id}`}
                    className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors"
                    aria-label="Edit client"
                >
                    <Pencil size={16} />
                </Link>
            </div>
        </div>
    )
}
