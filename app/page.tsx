import {
  DollarSign,
  Edit3,
  Eye,
  FileText,
  Palette,
  Share2,
  Smartphone,
  Sparkles,
  Zap,
} from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  APP,
  DEFAULT_METADATA,
  DEFAULT_OG_IMAGE_URL,
  SEO_KEYWORDS,
} from './constants';

export const generateMetadata = async (): Promise<Metadata> => {
  const title = APP.TITLE;
  const description = APP.DESCRIPTION;
  return {
    ...DEFAULT_METADATA,
    title,
    description,
    keywords: SEO_KEYWORDS,
    openGraph: {
      type: 'website',
      url: process?.env?.NEXT_PUBLIC_APP_URL,
      title,
      description,
      images: [
        {
          url: DEFAULT_OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        {
          url: DEFAULT_OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}

      <div className="mx-0 sm:mx-5 md:mx-8 lg:mx-20 xl:mx-24 2xl:mx-28">
        <section className="py-10 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 mb-4">
                  100% Free |<span className="ml-1">No Sign-Up Required</span>
                </span>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Create Professional Invoices for{' '}
                  <span className="text-emerald-600">Free</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  No sign-up needed. Generate and download beautiful,
                  ready-to-send invoices in seconds.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    href="/create-invoice"
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    Create an Invoice
                    <FileText className="ml-2 h-5 w-5" />
                  </Link>
                  <a
                    href="#seo"
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Why Us?
                    <Sparkles className="ml-2 h-5 w-5" />
                  </a>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-100 rounded-2xl p-8 shadow-2xl">
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-emerald-600 rounded"></div>
                        <span className="font-semibold text-gray-900">
                          Your Company
                        </span>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Invoice #001
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="pt-3">
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Web Design Services</span>
                          <span>$1,000.00</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Tax (25%)</span>
                          <span>$250.00</span>
                        </div>
                      </div>

                      <div className="flex justify-between border-t">
                        <span className="text-gray-600">Due Amount</span>
                        <span className="font-semibold">$1,250.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Everything You Need to Create Perfect Invoices
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our free invoice generator includes all the features you need to
                create professional invoices that get you paid faster.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Simple and Fast
                </h3>
                <p className="text-gray-600">
                  Create professional invoices in under 60 seconds with our
                  intuitive interface.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  100% Free
                </h3>
                <p className="text-gray-600">
                  No hidden costs, no paywalls, no subscriptions. Create
                  unlimited invoices for free.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Palette className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Customizable
                </h3>
                <p className="text-gray-600">
                  Add your logo, include taxes, discounts, and payment terms.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Mobile Friendly
                </h3>
                <p className="text-gray-600">
                  Create and download invoices on any device, anywhere, anytime.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Create professional invoices in three simple steps. No
                registration required.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Edit3 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  1. Fill Your Details
                </h3>
                <p className="text-gray-600">
                  Enter your business information, client details, invoice
                  items, and your logo.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  2. Preview and Customize
                </h3>
                <p className="text-gray-600">
                  Review your invoice in real-time. Make adjustments to tax,
                  discounts, and content until it's perfect.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Share2 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  3. Download or Share
                </h3>
                <p className="text-gray-600">
                  Download your invoice as a PDF and share it with your client
                  via email.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        {/* <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Professionals
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "This tool saved me hours every week. The invoices look
                professional and my clients love how easy it is to understand
                the breakdown."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-semibold">SJ</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">Freelance Designer</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Perfect for my small business. No monthly fees, no complicated
                setup. Just create and send invoices when I need them."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-semibold">MR</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Mike Rodriguez</p>
                  <p className="text-sm text-gray-500">Consultant</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "The customization options are great. I can add my branding and
                make each invoice look exactly how I want it."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-semibold">AL</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Anna Lee</p>
                  <p className="text-sm text-gray-500">
                    Marketing Agency Owner
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

        {/* SEO Section */}
        <section id="seo" className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
                The Best Free Invoice Generator Online
              </h2>
              <div className="text-lg text-gray-600 space-y-4 text-left">
                <p>
                  Our <strong>free invoice generator</strong> is the perfect
                  solution for freelancers, small business owners, and
                  entrepreneurs who need to create professional invoices quickly
                  and easily. As a comprehensive{' '}
                  <strong>PDF invoice maker</strong>, our tool allows you to
                  generate unlimited invoices without any cost or registration
                  requirements.
                </p>
                <p>
                  Whether you're looking for an{' '}
                  <strong>invoice creator online</strong> or a reliable{' '}
                  <strong>invoice generator free</strong> solution, our platform
                  provides all the features you need. Create customized invoices
                  with your logo, add multiple line items, calculate taxes
                  automatically, and download professional PDF invoices that you
                  can send to clients immediately.
                </p>
                <p>
                  Join thousands of professionals who trust our{' '}
                  <strong>free invoice maker</strong> to handle their billing
                  needs. Start creating professional invoices today with our
                  easy-to-use <strong>online invoice generator</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Create Your First Invoice?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who use our free invoice generator
            to get paid faster.
          </p>
          <Link
            href="/create-invoice"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-emerald-600 bg-white hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600"
          >
            Start Creating Invoices
            <FileText className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
