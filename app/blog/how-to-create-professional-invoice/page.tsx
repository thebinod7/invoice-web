import { BLOG_ARTICLES } from '@/app/constants/db';
import { Calendar, Clock, Tag, TagIcon, User } from 'lucide-react';

const article = BLOG_ARTICLES.find(
  (f) => f.slug === 'how-to-create-professional-invoice'
);

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
                Creating a professional invoice can feel stressful, especially
                if you are not good at design or accounting. But don’t worry!
                With the right tools, you can make a beautiful, professional
                invoice in just five minutes — no design skills needed.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                In this article, we will show you step by step how to create an
                invoice quickly using a free online invoice generator, and why
                it’s the best choice for freelancers, small business owners, and
                anyone who wants to get paid fast.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                Why a professional invoice matters{' '}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                A professional-looking invoice is important because it:
              </p>
              <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6">
                <li>Makes your business look more trustworthy.</li>
                <li>Reduces payment delays.</li>
                <li>Gives clear details to your client.</li>
                <li>Strengthens your brand.</li>
              </ol>

              <p className="text-gray-700 leading-relaxed mb-6">
                If your invoice looks messy or has mistakes, it can leave a bad
                impression and even slow down payment.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                Step 1: Choose a free online invoice generator{' '}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Instead of using Word documents or Excel sheets, choose a free
                invoice generator online. These tools offer ready-made
                templates, automatic calculations, and a clean design.A good
                invoice generator saves time and ensures your invoice looks
                professional every time.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                Step 2: Add your business details
              </h2>

              <p className="text-gray-700 leading-relaxed mb-6">
                First, enter your business information, such as:
              </p>

              <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6">
                <li>Your name or business name.</li>
                <li>Address and contact number.</li>
                <li>Email address.</li>
                <li>Your logo (if you have one).</li>
              </ol>

              <p className="text-gray-700 leading-relaxed mb-6">
                Adding your logo and business name makes your invoice look
                official and helps promote your brand.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Step 3: Add client details{' '}
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Next, add your client’s information. This usually includes:
            </p>

            <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6">
              <li>Client's name or company name.</li>
              <li>Client’s address and email.</li>
            </ol>

            <p className="text-gray-700 leading-relaxed mb-6">
              Having correct client details helps avoid confusion and makes sure
              your invoice gets to the right person.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Step 4: List your services or products
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Now, clearly describe what you are charging for. Add:
            </p>

            <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6">
              <li>Name of the service or product.</li>
              <li>Quantity or number of hours.</li>
              <li>Rate or price per item.</li>
              <li>Total amount for each item.</li>
            </ol>

            <p className="text-gray-700 leading-relaxed mb-6">
              Using an online invoice generator, you don’t have to worry about
              layout or design. Just type in the details, and it automatically
              formats everything neatly.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Step 5: Set payment terms{' '}
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Always include payment terms on your invoice. For example:
            </p>

            <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6">
              <li>Payment due in 7, 14, or 30 days.</li>
              <li>Accepted payment methods (bank transfer, PayPal, etc.).</li>
            </ol>

            <p className="text-gray-700 leading-relaxed mb-6">
              Clear payment terms help avoid misunderstandings and encourage
              clients to pay you on time.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Step 6: Review and download
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Before sending, review your invoice to make sure everything is
              correct. Check the following:
            </p>

            <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6">
              <li>Spelling and grammar.</li>
              <li>Dates and invoice number.</li>
              <li>Correct totals and taxes.</li>
            </ol>

            <p className="text-gray-700 leading-relaxed mb-6">
              Once you are happy, you can download it as a PDF or send it to
              your client.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Conclusion{' '}
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Creating a professional invoice doesn’t have to be difficult or
              time-consuming. With a free online invoice generator, you can make
              and send a clean, branded invoice in just five minutes — no design
              or technical skills needed.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Start using a free invoice generator today and make invoicing the
              easiest part of your business!
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
