'use client'

import { sanitizeError } from '@/app/helpers'
import { usePaidUsersQuery } from '@/app/hooks/backend/user.hook'
import MiniLoader from '@/ui/MiniLoader'
import { useEffect } from 'react'
import { toast } from 'sonner'
import PaidUserCard, { type PaidUser } from './PaidUserCard'

export default function BatmanClient() {
    const { data, isLoading, isError, error } = usePaidUsersQuery()
    const users: PaidUser[] = data?.data?.result ?? []

    useEffect(() => {
        if (isError) toast.error(sanitizeError(error))
    }, [isError, error])

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="mx-auto px-4 md:px-6 py-6 md:py-10">
                <div className="mb-6">
                    <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Paid Users</h1>
                    {!isLoading && (
                        <p className="mt-1 text-sm text-gray-600">
                            {users.length} {users.length === 1 ? 'user' : 'users'}
                        </p>
                    )}
                </div>

                {isLoading ? (
                    <MiniLoader />
                ) : isError ? (
                    <p className="text-center text-sm text-red-600">{sanitizeError(error)}</p>
                ) : users.length === 0 ? (
                    <p className="py-16 text-center text-gray-500">No paid users found</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {users.map((user) => (
                            <PaidUserCard key={user.email} {...user} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
