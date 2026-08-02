import { STARTER_PRICE } from '../constants/plan'
import Link from 'next/link'

export default function ZohoInvoiceComparisonTable() {
    const features = [
        {
            feature: 'Invoice Creation Speed',
            yourProduct: '✅ Seconds',
            zoho: '⚠️ Multiple setup steps',
        },
        {
            feature: 'Send Invoice',
            yourProduct: '✅ Built-in',
            zoho: '✅ Built-in',
        },
        {
            feature: 'One-Click Payment Reminders',
            yourProduct: '✅ One click',
            zoho: '⚠️ More workflow-heavy',
        },
        {
            feature: 'Payment Status Tracking',
            yourProduct: '✅ Simple tracking',
            zoho: '✅ Available',
        },
        {
            feature: 'Dashboard Stats',
            yourProduct: '✅ Focused insights',
            zoho: '✅ Advanced reports',
        },
        {
            feature: 'Learning Curve',
            yourProduct: '✅ Minimal',
            zoho: '⚠️ More complex',
        },
        {
            feature: 'Setup Time',
            yourProduct: '✅ Under 2 minutes',
            zoho: '⚠️ Requires configuration',
        },
        {
            feature: 'Best For',
            yourProduct: 'Freelancers & Small Businesses',
            zoho: 'Accounting-focused Businesses',
        },
        {
            feature: 'Accounting Features',
            yourProduct: '❌ No bloat',
            zoho: '✅ Extensive',
        },
        {
            feature: 'Inventory Management',
            yourProduct: '❌',
            zoho: '✅',
        },
        {
            feature: 'Monthly Price',
            yourProduct: `$${STARTER_PRICE.monthly}/month`,
            zoho: 'Higher / Ecosystem-based',
        },
    ]

    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className="mx-auto max-w-3xl text-center">
                    <h1 className="rounded-full border border-emerald-500 px-3 py-2 text-xs font-medium uppercase tracking-wider">
                        Quick Comparison with Zoho Invoice
                    </h1>

                    <h2 className="mt-6 text-4xl font-bold tracking-tight text-black sm:text-5xl">
                        Why pay for complexity?
                    </h2>

                    <p className="mt-4 text-lg text-gray-600">
                        Create, send, and track invoices in seconds with AI. Everything you need.
                        Nothing you don't.
                    </p>
                </div>

                {/* Desktop Table */}
                <div className="mt-12 hidden overflow-hidden rounded-2xl border border-emerald-500 md:block">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-emerald-500 bg-emerald-500 text-white">
                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Feature
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Invomaker
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Zoho Invoice
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {features.map((item, index) => (
                                <tr
                                    key={item.feature}
                                    className={
                                        index !== features.length - 1
                                            ? 'border-b border-gray-200'
                                            : ''
                                    }
                                >
                                    <td className="px-6 py-4 font-medium text-black">
                                        {item.feature}
                                    </td>

                                    <td className="px-6 py-4 bg-gray-50 font-medium text-black">
                                        {item.yourProduct}
                                    </td>

                                    <td className="px-6 py-4 text-gray-700">{item.zoho}</td>
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
                                        {item.yourProduct}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs uppercase tracking-wide text-gray-500">
                                        Zoho Invoice
                                    </p>
                                    <p className="mt-1 text-gray-700">{item.zoho}</p>
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
        </section>
    );
}
