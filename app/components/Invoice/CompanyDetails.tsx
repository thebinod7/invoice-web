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
import { Building, User } from 'lucide-react'
import React from 'react'

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
        <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                {/* Sender */}
                <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 text-[11px] font-medium tracking-widest text-black-500 uppercase">
                        <User className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                        Sender Details
                        <span className="ml-auto text-[10px] tracking-wider text-red-600 border border-stone-200 rounded-full px-2 py-0.5">
                            Required
                        </span>
                    </label>
                    <textarea
                        name="senderDetails"
                        value={senderDetails || ''}
                        onChange={handleInputChange}
                        rows={7}
                        className="
              w-full px-3.5 py-3
              bg-stone-50 hover:bg-white
              border border-stone-200
              rounded-md
              text-xs text-stone-800 leading-relaxed
              placeholder:text-stone-400
              resize-vertical
              transition-colors duration-150
              focus:outline-none focus:bg-white focus:border-stone-400
            "
                        placeholder={`Eg: XYZ Corporation\n123 Main Street, Suite 400\n(555) 123-4567\nbilling@xyz.com`}
                    />
                </div>

                {/* Receiver */}
                <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 text-[11px] font-medium tracking-widest text-black-500 uppercase">
                        <Building className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                        Receiver Details
                        <span className="ml-auto text-[10px] tracking-wider text-red-600 border border-stone-200 rounded-full px-2 py-0.5">
                            Required
                        </span>
                    </label>
                    {isLoggedIn && (
                        <Select
                            onValueChange={handleClientSelect}
                            disabled={isLoading || isEmpty}
                        >
                            <SelectTrigger className="h-10 text-xs border-stone-200 bg-stone-50 shadow-none focus:ring-0 focus:border-stone-400">
                                <SelectValue
                                    placeholder={
                                        isLoading
                                            ? 'Loading…'
                                            : isEmpty
                                                ? 'No saved clients'
                                                : 'Select a client'
                                    }
                                />
                            </SelectTrigger>
                            <SelectContent>
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
                                            <span className="flex min-w-0 flex-col items-start">
                                                <span>{client.name}</span>
                                                {client.email ? (
                                                    <span className="text-[10px] text-stone-400">
                                                        {client.email}
                                                    </span>
                                                ) : null}
                                            </span>
                                        </SelectItem>
                                    ),
                                )}
                            </SelectContent>
                        </Select>
                    )}
                    <textarea
                        name="receiverDetails"
                        value={receiverDetails || ''}
                        onChange={handleInputChange}
                        rows={7}
                        className="
              w-full px-3.5 py-3
              bg-stone-50 hover:bg-white
              border border-stone-200
              rounded-md
              text-xs text-stone-800 leading-relaxed
              placeholder:text-stone-400
              resize-vertical
              transition-colors duration-150
              focus:outline-none focus:bg-white focus:border-stone-400
            "
                        placeholder={`Eg: ABC Inc\n123 Main Street, Suite 400\n(555) 123-5678\nbilling@abc.com`}
                    />
                </div>
            </div>
        </div>
    )
}
