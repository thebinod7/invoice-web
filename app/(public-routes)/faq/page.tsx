'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { SOCIAL_LINKS } from '@/app/constants'

interface FAQItemProps {
    question: string
    answer: string
    isOpen: boolean
    toggleOpen: () => void
}

const FAQItem = ({ question, answer, isOpen, toggleOpen }: FAQItemProps) => {
    return (
        <div className="border-b border-gray-200 py-4">
            <button
                className="flex w-full justify-between items-center text-left font-medium text-gray-900"
                onClick={toggleOpen}
            >
                <span className="text-lg">{question}</span>
                {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
            </button>
            {isOpen && (
                <div className="mt-2 text-gray-600 pl-1">
                    <p>{answer}</p>
                </div>
            )}
        </div>
    )
}

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const faqs = [
        {
            question: 'Is Invomaker free to use?',
            answer: 'Yes! Invomaker is free to use. You can create, customize, and download professional invoices without any cost. We also offer a premium plan with additional features like invoice history, client management, and unlimited invoice emails.',
        },
        {
            question: 'Do I need to create an account to use Invomaker?',
            answer: 'No account is required to use our free invoice generator. You can start creating professional invoices immediately. However, creating a free account gives you access to your dashboard where you can save invoices, manage clients, and upgrade to premium for advanced features.',
        },
        {
            question: 'What features are included in the free version?',
            answer: 'The free version includes full access to our invoice generator with customizable templates, tax calculations, multiple currency support, discount options, and the ability to download your invoices as PDF. You can create unlimited invoices without any watermarks.',
        },
        {
            question: 'What are the benefits of the premium plan?',
            answer: 'Premium members get access to invoice history and storage, client management tools, unlimited invoice emails sent directly from the platform, larger logo upload sizes, priority support, and advanced analytics. Premium plans help you manage your invoicing workflow more efficiently.',
        },
        {
            question: 'What currencies are supported?',
            answer: 'We support all major currencies including USD, EUR, GBP, JPY, and many others from around the world. You can select your preferred currency from the dropdown when creating your invoice.',
        },
        {
            question: 'Does the invoice generator include tax calculation?',
            answer: 'Yes, our invoice generator includes automatic tax calculation functionality. You can easily add different tax rates to your invoices, and the system will automatically calculate the tax amounts and update totals in real-time.',
        },
    ]

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-center mb-2">Frequently Asked Questions</h1>
            <p className="text-gray-600 text-center mb-10">
                Find answers to common questions about our invoice generator
            </p>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                {faqs.map((faq, index) => (
                    <FAQItem
                        key={index}
                        question={faq.question}
                        answer={faq.answer}
                        isOpen={openIndex === index}
                        toggleOpen={() => toggleFAQ(index)}
                    />
                ))}
            </div>

            <div className="mt-8 text-center">
                <p className="text-gray-600">
                    Still have questions?{' '}
                    <a
                        href={SOCIAL_LINKS.FACEBOOK}
                        target="_blank"
                        className="text-blue-600 hover:underline"
                    >
                        Contact us
                    </a>
                </p>
            </div>
        </div>
    )
}
