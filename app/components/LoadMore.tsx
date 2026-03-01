'use client'

import { ChevronDown, Loader2 } from 'lucide-react'

export function LoadMore({
    handleLoadMoreClick,
    isLoading,
    shownCount = 0,
    totalCount = 0,
}: {
    handleLoadMoreClick: () => void
    isLoading: boolean
    shownCount?: number
    totalCount?: number
}) {
    return (
        <div className="flex items-center justify-between py-4 px-4">
            <p className="text-neutral-500 text-sm">
                Showing {shownCount} of {totalCount}
            </p>
            <button
                onClick={handleLoadMoreClick}
                disabled={isLoading || shownCount >= totalCount}
                className="inline-flex text-sm  items-center gap-2 px-4 py-2 border border-neutral-200 text-neutral-900 rounded-lg hover:border-neutral-300 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Loading...
                    </>
                ) : (
                    <>
                        Load More <ChevronDown className="w-4 h-4" />
                    </>
                )}
            </button>
        </div>
    )
}
