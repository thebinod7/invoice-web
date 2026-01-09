import AdBanner from '@/app/components/AdBanner';
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
  (f) => f.slug === 'how-to-create-invoice-for-freelancers'
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
                If you're a freelancer, designer, developer, writer, marketer,
                consultant, or creator, then sending invoices is a core part of
                getting paid. But many freelancers still struggle with:
              </p>

              <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6">
                <li>What to include in a professional invoice</li>
                <li>How to format it</li>
                <li>What payment terms to use</li>
                <li>How long the invoice should be</li>
                <li>Why clients delay payments</li>
              </ul>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                The good news? Creating a freelancer invoice is simple when you
                follow a clean structure. In this guide, you’ll learn:
              </p>

              <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6">
                <li>What every freelance invoice must include</li>
                <li>How to create one step-by-step</li>
                <li>How to avoid late payments</li>
                <li>Tools to generate invoices instantly (free, no signup)</li>
              </ul>

              {/* Google Ads Section */}
              <div className="mt-8">
                <AdBanner />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                1. Why Freelancers Need Proper Invoices
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Many freelancers make the mistake of sending unstructured bills
                or informal payment messages. But a proper invoice helps you:
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6">
                <li>Look professional</li>
                <li>Get paid faster</li>
                <li>Avoid disputes</li>
                <li>Set clear expectations</li>
                <li>Keep records for accounting</li>
                <li>Maintain trust with clients</li>
              </ul>

              <p className="text-gray-700 leading-relaxed mb-6">
                A clear invoice can reduce payment delays by up to 40%,
                according to freelance studies.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                2. What Should a Freelancer Invoice Include?{' '}
              </h2>

              <strong>2.1 Your Information:</strong>
              <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6">
                <li>Name or business name</li>
                <li>Address</li>
                <li>Email</li>
                <li>Phone</li>
                <li>Logo (optional but highly recommended)</li>
              </ul>

              <strong>2.2 Client Information:</strong>
              <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6">
                <li>Client/Company name</li>
                <li>Client Address</li>
                <li>Contact Person</li>
                <li>Email</li>
              </ul>

              <strong>2.3 Invoice Details:</strong>
              <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6">
                <li>Invoice Number</li>
                <li>Invoice Date</li>
                <li>Due Date</li>
                <li>Payment Terms</li>
                <li>Project Title or Description</li>
              </ul>

              <strong>2.4 Service Details:</strong>
              <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6">
                <li>Service Description</li>
                <li>Hours/Quantity</li>
                <li>Rate</li>
                <li>Total amount per item</li>
              </ul>

              <strong>2.5 Financial Breakdown:</strong>
              <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6">
                <li>Subtotal</li>
                <li>Tax</li>
                <li>Discount</li>
                <li>Grand Total</li>
              </ul>

              <strong>2.6 Payment Instructions:</strong>
              <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6">
                <li>Bank Details</li>
                <li>Paypal/Stripe Link</li>
                <li>SWIFT/IBAN</li>
              </ul>

              <strong>2.7 Payment Instructions:</strong>
              <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6">
                <li>“Thank you for your business.”</li>
                <li>“Payment expected by the due date.”</li>
                <li>“Late payments may incur a fee.”</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                3. Why Online Invoice Generators Are Perfect for Freelancers
              </h2>

              <p className="text-gray-700 leading-relaxed mb-6">
                Compared to Word or Excel, online invoice makers are:
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6">
                <li>Faster - Create invoice in 1 minute.</li>
                <li>Cleaner design - Professional layout automatically.</li>
                <li>
                  Zero formatting issues - No broken tables or misaligned
                  sections.
                </li>
                <li>
                  Better for international clients - Supports multiple
                  currencies.
                </li>
                <li>Automatic totals - No math errors.</li>
                <li>No Signup - Great for quick one-time invoices.</li>
              </ul>

              <p className="text-gray-700 leading-relaxed mb-6">
                This is why most freelancers now use online generators instead
                of Word/PDF templates.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                4. Create Your Freelancer Invoice Now (Free)
              </h2>

              <p className="text-gray-700 leading-relaxed mb-6">
                If you want the fastest and cleanest invoice creation:
              </p>
              <Link className="text-blue-500" href="/create-invoice">
                Create Invoice Online — 100% Free (No Signup)
              </Link>
              <p className="text-gray-700 leading-relaxed mb-6">
                Perfect for freelancers who want:{' '}
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6">
                <li>Clean design</li>
                <li>Instant PDF</li>
                <li>Auto-calculation</li>
                <li>Multi-currency</li>
                <li>Professional branding</li>
              </ul>
            </div>

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
