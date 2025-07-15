import {
  APP_CATEGORY,
  DEFAULT_OG_IMAGE_URL,
  SEO_KEYWORDS,
  WEBSITE_URL,
} from '@/app/constants';
import { BLOG_ARTICLES } from '@/app/constants/db';
import { Calendar, Clock, Tag, TagIcon, User } from 'lucide-react';
import { Metadata } from 'next';

const article = BLOG_ARTICLES.find(
  (f) => f.slug === 'free-invoice-generator-tool'
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
                In today’s fast-paced business world, creating professional and
                accurate invoices quickly is crucial for freelancers, small
                businesses, and entrepreneurs. A free invoice generator tool is
                the perfect solution to simplify your billing process, save
                time, and ensure you get paid faster. In this article, we’ll
                explore the benefits of using a free invoice generator, its top
                features, and why you should start using one today.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                What is a Free Invoice Generator Tool?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                A free invoice generator is an online tool that allows you to
                create customized, professional invoices without any cost. You
                don’t need advanced design skills or expensive software — all
                you need is an internet connection. These tools are designed to
                be user-friendly, fast, and efficient, making them ideal for
                freelancers, consultants, and small business owners.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                Key Benefits of Using a Free Invoice Generator
              </h2>
              <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6">
                <li>Save Time and Effort</li>
                <li>Look More Professional</li>
                <li>Improve Cash Flow</li>
                <li>Accessible Anytime, Anywhere</li>
              </ol>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                Who Can Benefit from a Free Invoice Generator?{' '}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li>
                  Freelancers: Designers, writers, developers, and other
                  creatives who need to bill clients regularly.
                </li>
                <li>
                  Small business owners: Retailers, consultants, and service
                  providers looking to streamline their billing process.
                </li>
                <li>
                  Entrepreneurs and startups: Quickly generate professional
                  invoices to establish credibility with new clients.
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Why Choose Our Free Invoice Generator Tool?{' '}
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Our free invoice generator stands out because it is easy to use,
              100% free, and doesn’t require registration. You can create,
              customize, and download unlimited invoices without any hidden
              charges. Plus, it offers secure data handling to protect your
              business information.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Start Creating Your Invoices Today
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Don’t waste more time on manual invoicing. A free invoice
              generator tool can revolutionize the way you handle billing,
              improve your cash flow, and make your business look more
              professional. Try our easy-to-use, free invoice generator today
              and see the difference it makes.
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
