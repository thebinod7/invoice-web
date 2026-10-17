'use client'

import { formatDate, getNameInitials } from '@/app/helpers'
import type { IUserListItem, UserRole } from '@/app/hooks/backend/user.hook'
import { cn } from '@/lib/utils'

interface UserTableProps {
    users: IUserListItem[]
    isLoading: boolean
}

const ROLE_BADGE_STYLES: Record<UserRole, string> = {
    ADMIN: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    MANAGER: 'bg-blue-50 text-blue-700 border-blue-200',
    USER: 'bg-slate-100 text-slate-600 border-slate-200',
    GUEST: 'bg-amber-50 text-amber-700 border-amber-200',
}

function RoleBadge({ role }: { role: UserRole }) {
    return (
        <span
            className={cn(
                'inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium',
                ROLE_BADGE_STYLES[role] ?? ROLE_BADGE_STYLES.USER
            )}
        >
            {role}
        </span>
    )
}

function UserCell({ user }: { user: IUserListItem }) {
    const initials = getNameInitials(user.firstName ?? '', user.lastName ?? '')

    return (
        <div className="flex items-center gap-3">
            {user.profilePicture ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={user.profilePicture}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="h-9 w-9 shrink-0 rounded-full object-cover"
                />
            ) : (
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold uppercase text-slate-600">
                    {initials || '—'}
                </span>
            )}
            <div className="min-w-0">
                <p className="truncate font-medium text-gray-900">
                    {user.firstName} {user.lastName}
                </p>
                <p className="truncate text-xs text-gray-500">{user.email}</p>
                {user.referralCode && (
                    <p className="truncate text-xs text-gray-400">
                        Referral: {user.referralCode}
                    </p>
                )}
            </div>
        </div>
    )
}

function SkeletonRows() {
    return (
        <>
            {Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="border-t border-gray-100">
                    <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                            <div className="h-9 w-9 shrink-0 animate-pulse rounded-full bg-slate-100" />
                            <div className="space-y-2">
                                <div className="h-3 w-32 animate-pulse rounded bg-slate-100" />
                                <div className="h-3 w-44 animate-pulse rounded bg-slate-100" />
                            </div>
                        </div>
                    </td>
                    <td className="px-4 py-3">
                        <div className="h-5 w-16 animate-pulse rounded-full bg-slate-100" />
                    </td>
                    <td className="hidden px-4 py-3 md:table-cell">
                        <div className="h-3 w-16 animate-pulse rounded bg-slate-100" />
                    </td>
                    <td className="hidden px-4 py-3 lg:table-cell">
                        <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
                    </td>
                </tr>
            ))}
        </>
    )
}

export default function UserTable({ users, isLoading }: UserTableProps) {
    if (!isLoading && users.length === 0) {
        return (
            <div className="rounded-xl border border-gray-200 bg-white py-16 text-center">
                <p className="text-sm text-gray-500">No users found</p>
            </div>
        )
    }

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                    <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
                        <tr>
                            <th scope="col" className="px-4 py-3">
                                User
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Role
                            </th>
                            <th scope="col" className="hidden px-4 py-3 md:table-cell">
                                Gender
                            </th>
                            <th scope="col" className="hidden px-4 py-3 lg:table-cell">
                                Last login
                            </th>
                            <th scope="col" className="hidden px-4 py-3 lg:table-cell">
                                Created
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {isLoading ? (
                            <SkeletonRows />
                        ) : (
                            users.map((user) => (
                                <tr key={user._id} className="transition-colors hover:bg-gray-50">
                                    <td className="px-4 py-3">
                                        <UserCell user={user} />
                                    </td>
                                    <td className="px-4 py-3">
                                        <RoleBadge role={user.role} />
                                    </td>
                                    <td className="hidden px-4 py-3 capitalize text-gray-600 md:table-cell">
                                        {user.gender?.toLowerCase() ?? '—'}
                                    </td>
                                    <td className="hidden px-4 py-3 text-gray-600 lg:table-cell">
                                        {user.lastLogin ? formatDate(user.lastLogin) : '—'}
                                    </td>
                                    <td className="hidden px-4 py-3 text-gray-600 lg:table-cell">
                                        {formatDate(user.createdAt)}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
