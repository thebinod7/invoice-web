'use client'

import { useAuthContext } from '@/app/context/useAuthContext'
import { useListInvoiceClients } from '@/app/hooks/backend/invoice-client.hook'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Building, User, Users } from 'lucide-react'
import React from 'react'

const fieldShellClass =
    'flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-colors duration-150 hover:border-gray-300 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500/20'

const textareaClass =
    'w-full min-h-[96px] flex-1 resize-vertical bg-transparent px-3 py-2 text-sm leading-snug text-gray-900 placeholder:text-gray-400 focus:outline-none'

function formatClientDetails(client: {
    name?: string
    address?: string
    phone?: string
    email?: string
}) {
    return [client.name, client.address, client.phone, client.email]
        .map((s) => s?.trim())
        .filter(Boolean)
        .join('\n')
}

export default function CompanyDetails({
    senderDetails,
    receiverDetails,
    handleInputChange,
}: {
    senderDetails: string
    receiverDetails: string
    handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}) {
    const { isLoggedIn } = useAuthContext()
    const { data, isLoading } = useListInvoiceClients(isLoggedIn)
    const clients = data?.data?.result?.rows ?? []
    const isEmpty = !isLoading && clients.length === 0

    const handleClientSelect = (id: string) => {
        const client = clients.find((c: { _id: string }) => c._id === id)
        if (!client) return
        handleInputChange({
            target: { name: 'receiverDetails', value: formatClientDetails(client) },
        } as React.ChangeEvent<HTMLTextAreaElement>)
    }

    return (
        <div className="min-w-0 lg:col-span-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-stretch sm:gap-4">
                {/* Sender */}
                <div className="flex min-w-0 flex-col gap-1.5">
                    <label className="flex min-h-6 items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                        <User className="h-3 w-3 shrink-0 text-gray-400" />
                        Sender Details
                        <span className="ml-auto rounded-full bg-red-50 px-1.5 py-0.5 text-[9px] font-medium tracking-wide text-red-600">
                            Required
                        </span>
                    </label>
                    <div className={fieldShellClass}>
                        <textarea
                            name="senderDetails"
                            value={senderDetails || ''}
                            onChange={handleInputChange}
                            rows={4}
                            className={textareaClass}
                            placeholder={`Eg: XYZ Corporation\n123 Main Street, Suite 400\n(555) 123-4567\nbilling@xyz.com`}
                        />
                    </div>
                </div>

                {/* Receiver */}
                <div className="flex min-w-0 flex-col gap-1.5">
                    <label className="flex min-h-6 items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                        <Building className="h-3 w-3 shrink-0 text-gray-400" />
                        Receiver Details
                        <span className="ml-auto rounded-full bg-red-50 px-1.5 py-0.5 text-[9px] font-medium tracking-wide text-red-600">
                            Required
                        </span>
                    </label>
                    <div className={fieldShellClass}>
                        {isLoggedIn && (
                            <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50/80 px-2 py-1">
                                <Users className="h-3 w-3 shrink-0 text-gray-400" />
                                <Select
                                    onValueChange={handleClientSelect}
                                    disabled={isLoading || isEmpty}
                                >
                                    <SelectTrigger className="h-6 min-w-0 flex-1 border-0 bg-transparent px-1 text-[11px] shadow-none focus:ring-0 focus:ring-offset-0 data-[placeholder]:text-gray-400 [&>svg]:h-3 [&>svg]:w-3">
                                        <SelectValue
                                            placeholder={
                                                isLoading
                                                    ? 'Loading…'
                                                    : isEmpty
                                                      ? 'No saved clients'
                                                      : 'Fill from saved client'
                                            }
                                        />
                                    </SelectTrigger>
                                    <SelectContent
                                        align="end"
                                        className="min-w-[var(--radix-select-trigger-width)]"
                                    >
                                        {clients.map(
                                            (client: {
                                                _id: string
                                                name: string
                                                email?: string
                                            }) => (
                                                <SelectItem
                                                    key={client._id}
                                                    value={client._id}
                                                    className="text-xs"
                                                >
                                                    <span className="flex min-w-0 items-baseline gap-2">
                                                        <span className="truncate font-medium text-gray-800">
                                                            {client.name}
                                                        </span>
                                                        {client.email ? (
                                                            <span className="truncate text-[10px] text-gray-400">
                                                                {client.email}
                                                            </span>
                                                        ) : null}
                                                    </span>
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                        <textarea
                            name="receiverDetails"
                            value={receiverDetails || ''}
                            onChange={handleInputChange}
                            rows={4}
                            className={textareaClass}
                            placeholder={`Eg: ABC Inc\n123 Main Street, Suite 400\n(555) 123-5678\nbilling@abc.com`}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
