import { AlertTriangle, Check, X } from 'lucide-react'
import { STARTER_PRICE } from '../constants/plan'

type Status = 'good' | 'warn' | 'bad' | null

type FeatureCell = {
    status: Status
    text?: string
}

type FeatureRow = {
    feature: string
    yourProduct: FeatureCell
    zoho: FeatureCell
}

function Cell({ status, text }: FeatureCell) {
    const Icon =
        status === 'good' ? Check : status === 'warn' ? AlertTriangle : status === 'bad' ? X : null
    const iconClass =
        status === 'good'
            ? 'text-emerald-600'
            : status === 'warn'
              ? 'text-amber-500'
              : status === 'bad'
                ? 'text-gray-400'
                : ''

    return (
        <span className="inline-flex items-center gap-1.5">
            {Icon ? <Icon className={`h-4 w-4 shrink-0 ${iconClass}`} aria-hidden /> : null}
            {text ? <span>{text}</span> : null}
        </span>
    )
}

export default function ZohoInvoiceComparisonTable() {
    const features: FeatureRow[] = [
        {
            feature: 'Invoice Creation Speed',
            yourProduct: { status: 'good', text: 'Seconds' },
            zoho: { status: 'warn', text: 'Multiple setup steps' },
        },
        {
            feature: 'Send Invoice',
            yourProduct: { status: 'good', text: 'Built-in' },
            zoho: { status: 'good', text: 'Built-in' },
        },
        {
            feature: 'One-Click Payment Reminders',
            yourProduct: { status: 'good', text: 'One click' },
            zoho: { status: 'warn', text: 'More workflow-heavy' },
        },
        {
            feature: 'Payment Status Tracking',
            yourProduct: { status: 'good', text: 'Simple tracking' },
            zoho: { status: 'good', text: 'Available' },
        },
        {
            feature: 'Dashboard Stats',
            yourProduct: { status: 'good', text: 'Focused insights' },
            zoho: { status: 'good', text: 'Advanced reports' },
        },
        {
            feature: 'Learning Curve',
            yourProduct: { status: 'good', text: 'Minimal' },
            zoho: { status: 'warn', text: 'More complex' },
        },
        {
            feature: 'Setup Time',
            yourProduct: { status: 'good', text: 'Under 2 minutes' },
            zoho: { status: 'warn', text: 'Requires configuration' },
        },
        {
            feature: 'Best For',
            yourProduct: { status: null, text: 'Freelancers & Small Businesses' },
            zoho: { status: null, text: 'Accounting-focused Businesses' },
        },
        {
            feature: 'Accounting Features',
            yourProduct: { status: 'bad', text: 'No bloat' },
            zoho: { status: 'good', text: 'Extensive' },
        },
        {
            feature: 'Inventory Management',
            yourProduct: { status: 'bad' },
            zoho: { status: 'good' },
        },
        {
            feature: 'Monthly Price',
            yourProduct: { status: null, text: `$${STARTER_PRICE.monthly}/month` },
            zoho: { status: null, text: 'Higher / Ecosystem-based' },
        },
    ]

    return (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            {/* Heading */}
            <div className="mx-auto max-w-3xl text-center">
                <h2 className="rounded-full border border-emerald-500 px-3 py-2 text-xs font-medium uppercase tracking-wider">
                    Quick Comparison with Zoho Invoice
                </h2>

                <h2 className="mt-6 text-3xl font-bold tracking-tight text-black sm:text-4xl">
                    Why pay for complexity?
                </h2>

                <p className="mt-4 text-lg text-gray-600">
                    Create, send, and track invoices in seconds with AI. Everything you need. Nothing
                    you don&apos;t.
                </p>
            </div>

            {/* Desktop Table */}
            <div className="mt-12 hidden overflow-hidden rounded-2xl border border-emerald-500 md:block">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-emerald-500 bg-emerald-500 text-white">
                            <th className="px-6 py-4 text-left text-sm font-semibold">Feature</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Invomaker</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">
                                Zoho Invoice
                            </th>
                        </tr>
                    </thead>

                    <tbody className="text-sm">
                        {features.map((item, index) => (
                            <tr
                                key={item.feature}
                                className={
                                    index !== features.length - 1 ? 'border-b border-gray-200' : ''
                                }
                            >
                                <td className="px-6 py-4 font-medium text-black">{item.feature}</td>

                                <td className="bg-gray-50 px-6 py-4 font-medium text-black">
                                    <Cell {...item.yourProduct} />
                                </td>

                                <td className="px-6 py-4 text-gray-700">
                                    <Cell {...item.zoho} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="mt-10 space-y-4 md:hidden">
                {features.map((item) => (
                    <div key={item.feature} className="rounded-xl border border-black p-5">
                        <h3 className="font-semibold text-black">{item.feature}</h3>

                        <div className="mt-4 space-y-3">
                            <div>
                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                    Invomaker
                                </p>
                                <p className="mt-1 font-medium text-black">
                                    <Cell {...item.yourProduct} />
                                </p>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                    Zoho Invoice
                                </p>
                                <p className="mt-1 text-gray-700">
                                    <Cell {...item.zoho} />
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 text-center">
                <p className="text-sm text-gray-600">
                    Stop getting confused by complex invoicing tools. Start with what you need.
                </p>
            </div>
        </div>
    )
}
