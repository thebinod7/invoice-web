'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
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
  );
};

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Is this invoice generator free to use?',
      answer:
        'Yes, our invoice generator is completely free to use. There is no cost associated with creating, downloading, or sending invoices through our platform.',
    },
    {
      question: 'Do I need to create an account to use the invoice generator?',
      answer:
        'No, account creation is not needed. You can start generating professional invoices immediately without signing up or providing any personal information.',
    },
    {
      question: 'Are there any hidden fees?',
      answer:
        'No, there are absolutely no hidden fees. Our invoice generator is 100% free with no premium features locked behind paywalls or subscription models.',
    },
    {
      question: 'What currencies are supported?',
      answer:
        'We support all currencies that are available in our select option dropdown. This includes major currencies like USD, EUR, GBP, JPY, and many others from around the world.',
    },
    {
      question: 'Does the invoice generator include tax calculation?',
      answer:
        'Yes, our invoice generator includes tax calculation functionality. You can easily add different tax rates to your invoices, and the system will automatically calculate the tax amounts and totals.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-2">
        Frequently Asked Questions
      </h1>
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
          <a href="/" className="text-blue-600 hover:underline">
            Contact us
          </a>
        </p>
      </div>
    </div>
  );
}
