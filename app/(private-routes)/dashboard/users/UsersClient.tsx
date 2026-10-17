'use client'

import { USER_ROLES, USERS_PER_PAGE } from '@/app/constants'
import { useAuthContext } from '@/app/context/useAuthContext'
import { isForbidden } from '@/app/helpers'
import { useListUsersQuery } from '@/app/hooks/backend/user.hook'
import { useDebounce } from '@/app/hooks/ui/debounce'
import MiniLoader from '@/ui/MiniLoader'
import { ShieldAlert } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import SearchBar from '../my-invoices/Searchbar'
import UserPagination from './UserPagination'
import UserTable from './UserTable'

const DEBOUNCE_DELAY = 500

export default function UsersClient() {
    const { currentUser, isLoading: isAuthLoading } = useAuthContext()
    const isAdmin = currentUser?.role === USER_ROLES.ADMIN

    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const debouncedSearch = useDebounce(search, DEBOUNCE_DELAY)

    const { data, isLoading, isFetching, isError, error } = useListUsersQuery(
        { search: debouncedSearch, page, perPage: USERS_PER_PAGE },
        isAdmin,
    )

    const users = useMemo(() => data?.data?.result?.rows ?? [], [data])
    const meta = data?.data?.result?.meta

    // Reset to the first page whenever the search term changes.
    useEffect(() => {
        setPage(1)
    }, [debouncedSearch])

    // Guard against landing on a page that no longer exists (e.g. after filtering).
    useEffect(() => {
        if (!meta?.lastPage) return
        if (page > meta.lastPage) setPage(meta.lastPage)
    }, [meta?.lastPage, page])

    useEffect(() => {
        if (isError) {
            toast.error(
                isForbidden(error)
                    ? 'You do not have permission to view users.'
                    : 'Could not load users. Please try again.',
            )
        }
    }, [isError, error])

    const handleSearchChange = (value: string) => {
        setSearch(value)
        setPage(1)
    }

    if (isAuthLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <MiniLoader />
            </div>
        )
    }

    if (!isAdmin) {
        return (
            <div className="min-h-screen bg-slate-50">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:px-8">
                    <div className="mx-auto max-w-md rounded-xl border border-gray-200 bg-white p-8 text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                            <ShieldAlert className="h-6 w-6" />
                        </div>
                        <h1 className="text-lg font-semibold text-gray-900">
                            Admin access required
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            You do not have permission to view the users list. Please contact an
                            administrator if you think this is a mistake.
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    const total = meta?.total ?? 0

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="mx-auto px-4 py-6 md:px-6 md:py-10">
                <div className="mb-4 md:mb-6">
                    <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Users</h1>
                    {!isLoading && (
                        <p className="mt-1 text-sm text-gray-600">
                            {total} {total === 1 ? 'user' : 'users'}
                        </p>
                    )}
                </div>

                <div className="mb-4 flex flex-col gap-2 sm:flex-row md:mb-6">
                    <SearchBar
                        value={search}
                        onChange={handleSearchChange}
                        placeholder="Search by first name..."
                    />
                </div>

                {isError ? (
                    <div className="rounded-xl border border-red-200 bg-red-50 py-16 text-center">
                        <p className="text-sm text-red-700">
                            {isForbidden(error)
                                ? 'You do not have permission to view users.'
                                : 'Could not load users. Please try again.'}
                        </p>
                    </div>
                ) : (
                    <>
                        <UserTable users={users} isLoading={isLoading} />

                        {meta && !isLoading && (
                            <UserPagination
                                currentPage={meta.currentPage}
                                lastPage={meta.lastPage}
                                total={meta.total}
                                perPage={meta.perPage}
                                isLoading={isFetching}
                                onPageChange={setPage}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
