'use client';

import type React from 'react';
import { useState } from 'react';
import {
  Users,
  Eye,
  TrendingUp,
  Target,
  CheckCircle,
  Upload,
} from 'lucide-react';
import TopBannerAd from '../components/Paid/TopBannerAd';
import { toast } from 'sonner';

const MAX_TAGLINE_LENGTH = 80;
const MAX_NAME_LENGTH = 40;
const MAX_FILE_SIZE = 5;
const MAX_FILE_SIZE_IN_BYTES = 2 * 1024 * 1024;

const AD_PRICE = {
  SEVEN_DAYS: 14.99,
};

const STATS = {
  ACTIVE_USERS: 290,
  IMPRESSIONS: '2K',
  PAGE_VIEWS: '2.5K',
};

// TODO: Add top 5 demographics:
// 0 United States => 54.42
// 1 India => 12.70
// 2 China => 10.96
// 3 United Kingdom => 9.74
// 4 Australia => 7.19
// 5 Canada => 6.63

export default function AdvertisePage() {
  const [formData, setFormData] = useState({
    productName: '',
    tagline: '',
    websiteUrl: '',
    image: null as File | null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'productName' && value.length > MAX_NAME_LENGTH) return;
    if (name === 'tagline' && value.length > MAX_TAGLINE_LENGTH) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files?.[0] || null;
    if (file?.size > MAX_FILE_SIZE_IN_BYTES) {
      return toast.error(`File size must be less than ${MAX_FILE_SIZE} MB.`);
    }

    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handlePayment = () => {
    console.log('Processing payment...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-balance">
            Advertise with Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-balance">
            Reach high-intent freelancers and small business owners at the
            perfect moment - right after they complete their invoicing.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Benefits & Stats */}
          <div className="space-y-6">
            {/* Premium Ad Placement Preview */}
            <h2>
              <span className="text-2xl font-semibold text-gray-900">
                Premium Ad Preview
              </span>
            </h2>
            <TopBannerAd
              name={formData.productName}
              tagline={formData.tagline}
              websiteUrl={formData.websiteUrl}
            />

            {/* Audience Stats */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Target className="w-5 h-5 text-emerald-600" />
                  Perfect Timing & Audience
                </h3>
                <p className="text-gray-600 mt-1">
                  Reach users when they're most engaged with business tools
                </p>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-emerald-50 rounded-lg">
                    <Users className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">
                      {STATS.ACTIVE_USERS}+
                    </div>
                    <div className="text-sm text-gray-600">Weekly Users</div>
                  </div>
                  <div className="text-center p-4 bg-emerald-50 rounded-lg">
                    <Eye className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">
                      {STATS.IMPRESSIONS}+
                    </div>
                    <div className="text-sm text-gray-600">
                      Monthly Impressions
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-gray-700">
                      High-intent B2B audience (freelancers, small businesses)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-gray-700">
                      Users who just completed invoicing - perfect timing
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-gray-700">
                      {STATS.PAGE_VIEWS}+ monthly page views with engaged users
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-xl shadow-lg border border-emerald-200">
              <div className="p-8 text-center">
                <div className="mb-4">
                  <div className="text-4xl font-bold text-gray-900">
                    ${AD_PRICE.SEVEN_DAYS}
                  </div>
                  <div className="text-gray-600">for 7 days</div>
                </div>
                <div className="flex items-center justify-center gap-2 text-emerald-600 mb-6">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-medium">
                    Premium placement guaranteed
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Application Form */}
          <div className="bg-white rounded-xl shadow-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Submit Your Advertisement
              </h3>
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="productName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Product Name *
                  </label>
                  <input
                    id="productName"
                    name="productName"
                    type="text"
                    value={formData.productName}
                    onChange={handleInputChange}
                    placeholder="Enter your product or service name"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  <span className="text-xs">
                    {formData.productName.length}/{MAX_NAME_LENGTH} characters
                  </span>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="tagline"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tagline *
                  </label>
                  <textarea
                    id="tagline"
                    name="tagline"
                    value={formData.tagline}
                    onChange={handleInputChange}
                    placeholder="A compelling tagline that describes your value proposition"
                    rows={3}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                  />
                  <span className="text-xs">
                    {formData.tagline.length}/{MAX_TAGLINE_LENGTH} characters
                  </span>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="websiteUrl"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Website URL *
                  </label>
                  <input
                    id="websiteUrl"
                    name="websiteUrl"
                    type="url"
                    value={formData.websiteUrl}
                    onChange={handleInputChange}
                    placeholder="https://yourwebsite.com"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Product Image *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors">
                    <input
                      id="image"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      required
                    />
                    <label htmlFor="image" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <div className="text-sm text-gray-600">
                        {formData.image
                          ? formData.image.name
                          : 'Click to upload your product image'}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        PNG, JPG up to 5MB (recommended: square image)
                      </div>
                    </label>
                  </div>
                </div>

                <div className="pt-4 space-y-4">
                  <button
                    type="submit"
                    onClick={handlePayment}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-md transition-colors focus:outline-none"
                  >
                    Proceed to Payment - ${AD_PRICE.SEVEN_DAYS}
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  Your ad will be reviewed within 24 hours.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
