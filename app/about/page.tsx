import AdBanner from '../components/AdBanner';
import { APP, GOOGLE_AD } from '../constants';

export default function AboutUs() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 md:p-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            About Us
          </h1>

          <div className="space-y-8">
            <section>
              <p className="text-gray-600">
                Welcome to our free invoice generator – a simple, fast, and
                hassle-free way to create professional invoices. Whether you're
                a freelancer, small business owner, or just someone who needs a
                quick invoice, we've built this tool to save you time and
                effort.
              </p>
            </section>

            <section>
              <p className="text-gray-600 mt-3">
                You don't need to sign up or create an account to use our
                service. Just visit the site, fill in your details, and download
                your invoice within minutes. No hidden fees, no catches – just
                straightforward invoicing when you need it.
              </p>
              <p className="text-gray-600 mt-3">
                Our invoice generator supports custom logos, personalized text,
                multiple currencies, and adjustable tax and discount options.
                It’s designed to be flexible so it works for a wide range of
                business needs and preferences.
              </p>
              <p className="text-gray-600 mt-3">
                We're passionate about making invoicing easier and more
                accessible for everyone. If you have feedback or suggestions,
                we’re always open to improving. Thanks for using our tool!
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Future Enhancements
              </h2>
              <p className="text-gray-600">
                We're constantly working behind the scenes to improve our tool
                and add new features that make invoicing even more seamless.
                From design enhancements to smarter functionality, our goal is
                to evolve based on your needs and feedback. This is just the
                beginning—and with your support, we aim to make this the most
                user-friendly and reliable invoice generator out there.
              </p>
            </section>

            {/* Google Ads Section */}
            <div className="mt-8">
              <AdBanner adSlotId={GOOGLE_AD.BLOG_PAGE_AD_SLOT} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
