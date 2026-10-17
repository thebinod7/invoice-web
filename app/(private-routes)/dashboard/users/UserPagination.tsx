'use client'

import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface UserPaginationProps {
    currentPage: number
    lastPage: number
    total: number
    perPage: number
    isLoading?: boolean
    onPageChange: (page: number) => void
}

const ELLIPSIS = 'ellipsis'

function getPageItems(currentPage: number, lastPage: number): (number | typeof ELLIPSIS)[] {
    if (lastPage <= 7) {
        return Array.from({ length: lastPage }, (_, index) => index + 1)
    }

    const items: (number | typeof ELLIPSIS)[] = [1]
    const start = Math.max(2, currentPage - 1)
    const end = Math.min(lastPage - 1, currentPage + 1)

    if (start > 2) items.push(ELLIPSIS)
    for (let page = start; page <= end; page++) items.push(page)
    if (end < lastPage - 1) items.push(ELLIPSIS)

    items.push(lastPage)
    return items
}

export default function UserPagination({
    currentPage,
    lastPage,
    total,
    perPage,
    isLoading = false,
    onPageChange,
}: UserPaginationProps) {
    if (lastPage <= 1) return null

    const from = (currentPage - 1) * perPage + 1
    const to = Math.min(currentPage * perPage, total)

    return (
        <nav
            aria-label="Users pagination"
            className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row"
        >
            <p className="text-sm text-gray-600">
                Showing <span className="font-medium text-gray-900">{from}</span>–
                <span className="font-medium text-gray-900">{to}</span> of{' '}
                <span className="font-medium text-gray-900">{total}</span>
            </p>

            <div className="flex items-center gap-1">
                <button
                    type="button"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={isLoading || currentPage <= 1}
                    aria-label="Previous page"
                    className="inline-flex h-9 items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">Prev</span>
                </button>

                {getPageItems(currentPage, lastPage).map((item, index) =>
                    item === ELLIPSIS ? (
                        <span
                            key={`${ELLIPSIS}-${index}`}
                            className="px-2 text-sm text-gray-400"
                            aria-hidden="true"
                        >
                            …
                        </span>
                    ) : (
                        <button
                            key={item}
                            type="button"
                            onClick={() => onPageChange(item)}
                            disabled={isLoading}
                            aria-current={item === currentPage ? 'page' : undefined}
                            className={cn(
                                'inline-flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-sm transition-colors disabled:cursor-not-allowed',
                                item === currentPage
                                    ? 'border-emerald-600 bg-emerald-600 font-medium text-white'
                                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                            )}
                        >
                            {item}
                        </button>
                    )
                )}

                <button
                    type="button"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={isLoading || currentPage >= lastPage}
                    aria-label="Next page"
                    className="inline-flex h-9 items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>
        </nav>
    )
}
