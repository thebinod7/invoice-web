'use client'

import SearchBar from './Searchbar'
import StatusFilter from './StatusFilter'

interface FiltersSectionProps {
    search: string
    onSearchChange: (value: string) => void
    status: string
    onStatusChange: (value: string) => void
}

export default function FiltersSection({
    search,
    onSearchChange,
    status,
    onStatusChange,
}: FiltersSectionProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-2 md:gap-3 mb-4 md:mb-6">
            <SearchBar value={search} onChange={onSearchChange} />
            <StatusFilter value={status} onChange={onStatusChange} />
        </div>
    )
}
