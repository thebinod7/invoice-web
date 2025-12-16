import AdBanner from '@/app/components/AdBanner';
import { HorizontalAdBanner } from '@/app/components/Paid/HorizontalAdbanner';
import {
  APP_CATEGORY,
  DEFAULT_OG_IMAGE_URL,
  GOOGLE_AD,
  SEO_KEYWORDS,
  WEBSITE_URL,
} from '@/app/constants';
import { BLOG_ARTICLES } from '@/app/constants/db';
import { Calendar, Clock, Tag, TagIcon, User } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

const article = BLOG_ARTICLES.find(
  (f) => f.slug === 'create-invoice-for-international-clients-pdf-guide'
);

export const generateMetadata = async (): Promise<Metadata> => {
  const metaTitle = article?.title;
  const metaDescription = article?.excerpt;
  return {
    title: metaTitle,
    description: metaDescription,
    keywords: SEO_KEYWORDS,
    category: APP_CATEGORY,
    openGraph: {
      type: 'website',
      url: `${WEBSITE_URL}/blog/${article?.slug}`,
      title: metaTitle,
      description: metaDescription,
      images: [
        {
          url: DEFAULT_OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [
        {
          url: DEFAULT_OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
  };
};

export default function BlogArticlePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-2">
        {/* Article Header */}
        <article className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Article Content */}
          <div className="p-6 md:p-8">
            <HorizontalAdBanner />

            {/* Category Badge */}
            <div className="mb-4 p-2 rounded-md bg-blue-100 text-blue-800 hover:bg-blue-200">
              <div className="flex items-center gap-2 text-sm">
                <TagIcon /> {article?.category}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {article?.title}
            </h1>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>By {article?.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{article?.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{article?.readTime}</span>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                If you are running a business or freelancing, chances are you
                will work with clients from different countries. One of the most
                important parts of getting paid is sending a professional
                invoice. But many small business owners and freelancers feel
                lost when it comes to creating an{' '}
                <span className="font-bold">
                  invoice for international clients.
                </span>
              </p>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Don’t worry! this guide will explain step by step how you can
                make a{' '}
                <span className="font-bold">
                  PDF invoice for overseas clients
                </span>
                , what to include, and how to make the process easy using a free
                invoice generator.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                Why You Need a Professional Invoice for International Clients
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                An invoice is more than just a payment request. For
                international clients, it also works as a legal record of the
                transaction. A clear, professional invoice in PDF format makes
                your business look trustworthy and helps avoid payment delays.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Here are some reasons why a good invoice matters:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li>
                  <span className="font-bold">Clarity:</span> Clients from
                  different countries may follow different rules. A simple
                  invoice avoids confusion.
                </li>
                <li>
                  <span className="font-bold">Proof of work:</span> It is your
                  official record of services or products delivered.
                </li>
                <li>
                  <span className="font-bold">Faster payment:</span> A
                  well-structured invoice increases the chance of getting paid
                  on time.
                </li>
                <li>
                  <span className="font-bold">Professional image:</span> A
                  branded, neatly designed PDF invoice makes you look reliable.
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                Key Things to Include in an International Invoice
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                When creating an invoice for international clients, make sure
                you include all the necessary details. Here’s a checklist:
              </p>
              <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6">
                <li>
                  <span className="font-bold">Your business details:</span>{' '}
                  Name, Address, Email, Website (If any)
                </li>
                <li>
                  <span className="font-bold">Client’s details:</span> Client’s
                  full name or company name. Country and tax details (if
                  applicable)
                </li>
                <li>
                  <span className="font-bold">Invoice number:</span> A unique
                  number for tracking payments.
                </li>
                <li>
                  <span className="font-bold"> Invoice date and due date:</span>{' '}
                  The date you send the invoice and the due date for payment.
                </li>
                <li>
                  <span className="font-bold">
                    Description of work or product:
                  </span>
                  {''}
                  List of services/products delivered. Quantity, rate, and total
                  amount.
                </li>
                <li>
                  <span className="font-bold">Currency:</span>
                  {''} Mention the currency (USD, EUR, GBP, etc.) to avoid
                  confusion.
                </li>
                <li>
                  <span className="font-bold">
                    Taxes or VAT (if applicable):
                  </span>
                  {''}Add details depending on your country’s tax laws.
                </li>
                <li>
                  <span className="font-bold">Terms and notes:</span>
                  {
                    'Example: “Late payments may include a 5% fee” or “Thank you for your business.”'
                  }
                </li>
              </ol>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                Why Use PDF Format for Invoices?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Sending invoices in PDF format is the best choice because:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li>It looks professional and clean.</li>
                <li>The layout stays the same on all devices.</li>
                <li>It can’t be easily edited by others.</li>
                <li>Easy to download, print, or attach in emails.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-6">
                Most international clients prefer{' '}
                <span className="font-bold">PDF invoices</span> because they are
                reliable and easy to process.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              How to Create Invoice for International Clients (Step-by-Step)
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              You don’t need to be a designer or accountant to create a
              professional invoice. Here’s how you can do it:
            </p>

            <h2 className="text-xl font-bold text-gray-900 mb-4 mt-8">
              Step 1: Use a Free Invoice Generator
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Instead of spending hours on Word or Excel, you can use a{' '}
              <Link
                target="_blank"
                className="underline"
                rel="noopener noreferrer"
                href={'/create-invoice'}
              >
                free invoice generator online
              </Link>
              . It saves time and gives you a ready-to-download PDF invoice
              instantly.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mb-4 mt-8">
              Step 2: Add Your Details{' '}
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Fill in your business name, contact information, and logo
              (optional).
            </p>

            <h2 className="text-xl font-bold text-gray-900 mb-4 mt-8">
              Step 3: Add Client Information{' '}
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Enter the client’s name, address, and country details.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mb-4 mt-8">
              Step 4: Enter Services or Products
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              List what you delivered, along with the quantity, rate, and total
              price.{' '}
            </p>

            <h2 className="text-xl font-bold text-gray-900 mb-4 mt-8">
              Step 5: Choose Currency{' '}
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              If you are billing an international client, always select the
              right currency. For example, USD for American clients, EUR for
              European clients, or GBP for UK clients.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mb-4 mt-8">
              Step 6: Set Payment Terms{' '}
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Clearly mention the due date and your preferred payment method
              (PayPal, Wise, or bank transfer).
            </p>

            <h2 className="text-xl font-bold text-gray-900 mb-4 mt-8">
              Step 7: Download as PDF{' '}
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Once everything looks good, simply download the invoice as a PDF
              file and send it to your client.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Make It Easy with a Free Invoice Generator{' '}
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              If you want to skip the stress of designing invoices, try using a
              free invoice generator. It is fast, simple, and professional. You
              just fill out a form, click a button, and download your invoice as
              PDF.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              This way, you don’t waste time formatting invoices or worrying
              about mistakes. You can focus more on your work and still send
              professional international invoices to your clients.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Final Thoughts{' '}
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Working with international clients is exciting, but getting paid
              on time depends on how professional your invoice looks. By
              including all the right details and sending it in PDF format, you
              build trust and improve your chances of smooth payments.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Instead of creating invoices manually, try using an{' '}
              <Link
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                href={'/create-invoice'}
              >
                online free invoice generator
              </Link>
              . In just a few minutes, you can make and download a ready-to-use
              PDF invoice for international clients.
            </p>

            {/* Article content End */}

            {/* Tags */}
            <div className="flex items-center gap-2 mb-8">
              <Tag className="w-4 h-4 text-gray-500" />
              <div className="flex flex-wrap gap-2">
                {article?.tags.map((tag, index) => (
                  <span key={index} className="text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Google Ads Section */}
            <div className="mt-8">
              <AdBanner adSlotId={GOOGLE_AD.BLOG_PAGE_SLOT} />
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
