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
    'flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-md border border-stone-200 bg-stone-50 transition-colors duration-150 hover:border-stone-300 hover:bg-white focus-within:border-stone-400 focus-within:bg-white'

const textareaClass =
    'w-full min-h-[148px] flex-1 resize-vertical bg-transparent px-3.5 py-3 text-xs leading-relaxed text-stone-800 placeholder:text-stone-400 focus:outline-none'

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
        <div className="lg:col-span-2 min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 sm:items-stretch">
                {/* Sender */}
                <div className="flex min-w-0 flex-col gap-2">
                    <label className="flex min-h-7 items-center gap-2 text-[11px] font-medium tracking-widest text-black-500 uppercase">
                        <User className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                        Sender Details
                        <span className="ml-auto text-[10px] tracking-wider text-red-600 border border-stone-200 rounded-full px-2 py-0.5">
                            Required
                        </span>
                    </label>
                    <div className={fieldShellClass}>
                        <textarea
                            name="senderDetails"
                            value={senderDetails || ''}
                            onChange={handleInputChange}
                            rows={7}
                            className={textareaClass}
                            placeholder={`Eg: XYZ Corporation\n123 Main Street, Suite 400\n(555) 123-4567\nbilling@xyz.com`}
                        />
                    </div>
                </div>

                {/* Receiver */}
                <div className="flex min-w-0 flex-col gap-2">
                    <label className="flex min-h-7 items-center gap-2 text-[11px] font-medium tracking-widest text-black-500 uppercase">
                        <Building className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                        Receiver Details
                        <span className="ml-auto text-[10px] tracking-wider text-red-600 border border-stone-200 rounded-full px-2 py-0.5">
                            Required
                        </span>
                    </label>
                    <div className={fieldShellClass}>
                        {isLoggedIn && (
                            <div className="flex items-center gap-2 border-b border-stone-200 bg-white/70 px-2.5 py-1">
                                <Users className="h-3.5 w-3.5 shrink-0 text-stone-400" />
                                <Select
                                    onValueChange={handleClientSelect}
                                    disabled={isLoading || isEmpty}
                                >
                                    <SelectTrigger className="h-7 min-w-0 flex-1 border-0 bg-transparent px-1 text-xs shadow-none focus:ring-0 focus:ring-offset-0 data-[placeholder]:text-stone-400 [&>svg]:h-3.5 [&>svg]:w-3.5">
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
                                                        <span className="truncate font-medium text-stone-800">
                                                            {client.name}
                                                        </span>
                                                        {client.email ? (
                                                            <span className="truncate text-[10px] text-stone-400">
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
                            rows={7}
                            className={textareaClass}
                            placeholder={`Eg: ABC Inc\n123 Main Street, Suite 400\n(555) 123-5678\nbilling@abc.com`}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
