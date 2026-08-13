'use client'

import ClientCard from "./ClientCard"


export interface InvoiceClient {
    _id: string
    name: string
    email: string
    address?: string
}

interface ClientListProps {
    clients: InvoiceClient[]
}

export default function ClientList({ clients }: ClientListProps) {
    if (clients.length === 0) {
        return (
            <div className="py-12 text-center">
                <p className="text-slate-400 text-sm">No clients found</p>
            </div>
        )
    }

    return (
        <div className="space-y-2">
            {clients.map((client) => (
                <ClientCard key={client._id} client={client} />
            ))}
        </div>
    )
}
