'use client'
import { Award } from 'lucide-react'
import React, { useState } from 'react'
import RefCard from './RefCard'

interface Referral {
    id: string
    name: string
    status: 'qualified' | 'pending' | 'claimed'
    dateReferred: string
}

const mockReferrals: Referral[] = [
    {
        id: '1',
        name: 'Sarah Johnson',
        status: 'qualified',
        dateReferred: 'Mar 1, 2025',
    },
    {
        id: '2',
        name: 'Michael Chen',
        status: 'pending',
        dateReferred: 'Feb 28, 2025',
    },
    {
        id: '3',
        name: 'Emily Rodriguez',
        status: 'claimed',
        dateReferred: 'Feb 25, 2025',
    },
]

export default function MyReferralsClient() {
    const [claimedRewards, setClaimedRewards] = useState<Set<string>>(new Set())

    const handleClaim = (id: string) => {
        setClaimedRewards((prev) => new Set([...prev, id]))
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="mx-auto px-4 md:px-6 py-6 md:py-10">
                {/* Header Section */}
                <div className="bg-white border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-3 mb-2">
                            <Award className="w-8 h-8 text-blue-600" />
                            <h1 className="text-xl font-bold text-gray-900">Your Referrals</h1>
                        </div>
                        <p className="text-gray-600 text-sm">
                            Track your referrals and claim your rewards
                        </p>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mockReferrals.map((referral) => (
                            <RefCard
                                key={referral.id}
                                {...referral}
                                status={
                                    claimedRewards.has(referral.id) ? 'claimed' : referral.status
                                }
                                onClaim={() => handleClaim(referral.id)}
                            />
                        ))}
                    </div>
                </div>

                {/* Empty state fallback */}
                {mockReferrals.length === 0 && (
                    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
                        <p className="text-gray-500 text-md">No referrals yet.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
