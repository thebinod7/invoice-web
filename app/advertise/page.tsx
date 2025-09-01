'use client';

import { useMutation } from '@tanstack/react-query';
import { Upload } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { toast } from 'sonner';
import SpinnerX from '../components/Buttons/Spinner';
import TopBannerAd from '../components/Paid/TopBannerAd';
import { AD_PRICE } from '../constants';
import { sanitizeError } from '../helpers';
import { postRequest } from '../helpers/request';
import AdHeader from './AdHeader';
import AdPricing from './AdPricing';
import AudienceStats from './AudienceStats';
import { API_ROUTES } from '../constants/api-routes';

const MAX_TAGLINE_LENGTH = 80;
const MAX_NAME_LENGTH = 40;
const MAX_FILE_SIZE = 5;
const MAX_FILE_SIZE_IN_BYTES = 2 * 1024 * 1024;

// TODO: Add top 5 demographics:
// 0 United States => 54.42
// 1 India => 12.70
// 2 China => 10.96
// 3 United Kingdom => 9.74
// 4 Australia => 7.19
// 5 Canada => 6.63

const IMAGE_UPLOAD_URL =
  'https://api.breakfreekit.com/api/v1/app/upload-single';

export default function AdvertisePage() {
  const [formData, setFormData] = useState({
    productName: '',
    tagline: '',
    websiteUrl: '',
    imageUrl: '',
    clientEmail: '',
  });

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

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

    const formData: any = new FormData();
    formData.append('file', file);
    return uploadImageMutation.mutate(formData);
  };

  const uploadImageMutation = useMutation({
    mutationFn: (payload: any) => {
      return postRequest(IMAGE_UPLOAD_URL, payload);
    },
    onError: (error) => {
      toast.error(sanitizeError(error));
    },
    onSuccess: (data) => {
      const result: any = data?.data?.result;
      setUploadedImage(result.Location);
    },
  });

  const sendPurchaseDetailsMutation = useMutation({
    mutationFn: (payload: any) => {
      return postRequest(`${API_ROUTES.APP}/ad-purchase`, payload);
    },
    onError: (error) => {
      toast.error(sanitizeError(error));
    },
    onSuccess: (data) => {
      const result: any = data?.data?.result;
      window.location.href = result.paymentUrl;
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedImage) return toast.error('Please upload an image.');
    formData.imageUrl = uploadedImage;
    return sendPurchaseDetailsMutation.mutateAsync(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <AdHeader />

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
              productName={formData.productName}
              tagline={formData.tagline}
              websiteUrl={formData.websiteUrl}
            />

            <AudienceStats />
            <AdPricing />
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
                    htmlFor="clientEmail"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address *
                  </label>
                  <input
                    id="clientEmail"
                    name="clientEmail"
                    type="email"
                    value={formData.clientEmail}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

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
                    />
                    <label htmlFor="image" className="cursor-pointer">
                      {uploadImageMutation.isPending ? (
                        <div className="flex items-center gap-2 justify-center">
                          <SpinnerX variant={3.5} /> {''}
                          <p className="text-sm">Please wait...</p>
                        </div>
                      ) : (
                        <div>
                          {uploadedImage ? (
                            <img
                              src={uploadedImage}
                              alt="Uploaded"
                              className="w-20 h-20 object-cover rounded-lg mx-auto mb-2"
                            />
                          ) : (
                            <>
                              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <div className="text-sm text-gray-600">
                                Click to upload your product image
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                PNG, JPG up to 5MB (recommended: square image)
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="pt-4 space-y-4">
                  <button
                    type="submit"
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-md transition-colors focus:outline-none"
                  >
                    Proceed to Payment - $
                    {(AD_PRICE.SEVEN_DAYS * 0.9).toFixed(2)}
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
