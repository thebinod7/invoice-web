import {
  APP,
  DEFAULT_METADATA,
  DEFAULT_OG_IMAGE_URL,
  SEO_KEYWORDS,
} from '@/app/constants';
import { BLOG_ARTICLES } from '@/app/constants/db';
import { Calendar, Clock, Tag, TagIcon, User } from 'lucide-react';
import { Metadata } from 'next';

const article = BLOG_ARTICLES.find(
  (f) => f.slug === 'mistakes-to-avoid-when-creating-invoice'
);

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    ...DEFAULT_METADATA,
    title: article?.title,
    description: article?.excerpt,
    keywords: SEO_KEYWORDS,
    openGraph: {
      type: 'website',
      url: process?.env?.NEXT_PUBLIC_APP_URL,
      title: article?.title,
      description: article?.excerpt,
      images: [
        {
          url: DEFAULT_OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: article?.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article?.title,
      description: article?.excerpt,
      images: [
        {
          url: DEFAULT_OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: article?.title,
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
                Creating invoices might seem easy, but small mistakes can cause
                big problems. Many small business owners, freelancers, and
                startups lose time and even money because of invoice errors. In
                this article, we will show you the most common mistakes people
                make when creating invoices — and how using a free online
                invoice generator can help you avoid them.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                1️⃣ Forgetting Important Details
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                One of the most common mistakes is leaving out important
                information. Many people forget to include:
              </p>
              <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6">
                <li>Invoice Number</li>
                <li>Issue Date / Due Date</li>
                <li>Payment terms</li>
                <li>Client contact details</li>
              </ol>

              <p className="text-gray-700 leading-relaxed mb-6">
                When these details are missing, your client might get confused
                or delay the payment. A free invoice generator makes sure all
                essential fields are included every time.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                2️⃣ Not Being Clear About Payment Terms{' '}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                If your invoice does not clearly mention payment terms, your
                client may not know when or how to pay you. For example, should
                they pay within 7 days, 15 days, or 30 days? Should they pay via
                bank transfer or PayPal?
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                With a free invoice generator, you can easily set clear payment
                terms. This helps avoid misunderstandings and speeds up payment.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                3️⃣ Using Unprofessional Designs{' '}
              </h2>

              <p className="text-gray-700 leading-relaxed mb-6">
                Some people use plain Word documents or messy Excel sheets for
                invoices. While they work, they do not look professional. A
                poorly designed invoice can leave a bad impression and make your
                business look less reliable.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                A free online invoice maker usually offers clean, professional
                templates. These make your invoice look polished and
                trustworthy, which helps strengthen your brand image.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              4️⃣ Making Calculation Errors
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Manual calculations are risky. Even a small mistake in adding
              totals, taxes, or discounts can create problems. Your client may
              dispute the invoice or delay payment until errors are fixed. A
              free invoice generator does all calculations for you
              automatically. This saves time and ensures the final amount is
              always correct.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              5️⃣ Not Including Your Business Branding{' '}
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Your invoice should reflect your brand. Many people forget to add
              their logo or business name in a professional way. A branded
              invoice looks more serious and helps clients remember your
              business. Most free invoice generators let you upload your logo,
              set brand colors, and include all your business details in a few
              clicks.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              How a Free Invoice Generator Can Help{' '}
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              A free online invoice generator solves most of these problems in
              one tool. Here are some of the benefits:
            </p>

            <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6">
              <li>
                <span className="font-bold">Easy to use:</span> You can create
                invoices in minutes, even without design or accounting skills.
              </li>
              <li>
                <span className="font-bold">Professional look:</span> Clean
                templates make your invoices look high-quality and trustworthy.
              </li>
              <li>
                <span className="font-bold">Error-free:</span> Automatic
                calculations reduce the chance of mistakes.
              </li>
              <li>
                <span className="font-bold">Faster payments:</span> Clear and
                professional invoices help you get paid on time.
              </li>
              <li>
                <span className="font-bold">Brand-friendly: </span> Add your
                logo and details to match your business identity.
              </li>
              <li>
                <span className="font-bold">Better tracking:</span> Keep all
                invoices in one place and track payments easily.
              </li>
            </ol>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Conclusion{' '}
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Avoiding invoice mistakes is important if you want to get paid
              faster and look professional. By using a free invoice generator,
              you can save time, avoid errors, and focus more on growing your
              business.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              If you haven’t tried an online invoice maker yet, now is the
              perfect time to start. Your clients will thank you — and so will
              your bank account!
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
          </div>
        </article>
      </main>
    </div>
  );
}
