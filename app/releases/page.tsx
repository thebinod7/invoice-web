'use client';

import {
  Calendar,
  FormInputIcon,
  Home,
  Image,
  Newspaper,
  Search,
  ShieldAlert,
  Sparkles,
  View,
} from 'lucide-react';
import { APP_NAME } from '../constants';

interface FeatureRelease {
  id: string;
  title: string;
  description: string;
  date: string;
  version: string;
  icon: any;
  isNew: boolean;
}

const featureReleases: FeatureRelease[] = [
  {
    id: '13',
    title: 'New Invoice Generation Form',
    description:
      'We have introduced a new invoice generation form that simplifies the process of creating and managing invoices.',
    date: '2025-07-19',
    version: 'v1.2.2',
    icon: FormInputIcon,
    isNew: true,
  },
  {
    id: '14',
    title: 'Feedback Form',
    description:
      'We have added a feedback form to gather your thoughts and suggestions for future improvements.',
    date: '2025-07-05',
    version: 'v1.2.1',
    icon: Newspaper,
    isNew: true,
  },
  {
    id: '15',
    title: 'Added Blog Articles',
    description:
      'We have added a new section for blog articles to keep you updated with the latest news and insights.',
    date: '2025-07-05',
    version: 'v1.2.0',
    icon: Newspaper,
    isNew: false,
  },
  {
    id: '16',
    title: 'Landing Page Improvements',
    description:
      'Improved the landing page with better design and performance optimizations.',
    date: '2025-06-07',
    version: 'v1.1.3',
    icon: Home,
    isNew: false,
  },
  {
    id: '17',
    title: 'Validation and Error Handling',
    description:
      'We have added comprehensive validation and error handling to ensure data integrity and improve user experience.',
    date: '2025-05-14',
    version: 'v1.1.2',
    icon: ShieldAlert,
    isNew: false,
  },
  {
    id: '18',
    title: 'UI/UX Improvements',
    description:
      'We have revamped the user interface for a more intuitive experience, and improved navigation.',
    date: '2025-05-07',
    version: 'v1.1.1',
    icon: View,
    isNew: false,
  },
  {
    id: '19',
    title: 'Support company logo',
    description: 'You can now upload company logo for better branding.',
    date: '2025-04-14',
    version: 'v1.1.0',
    icon: Image,
    isNew: false,
  },
  {
    id: '20',
    title: 'Launch',
    description: `Inception of ${APP_NAME}`,
    date: '2025-04-07',
    version: 'v1.0.0',
    icon: Sparkles,
    isNew: false,
  },
];

export default function FeatureReleases() {
  const filteredReleases = featureReleases.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {"What's New"}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the latest features, improvements, and updates that make
              your experience better than ever.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Timeline */}
        {filteredReleases.length > 0 ? (
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 to-emerald-300"></div>

            {/* Feature Releases */}
            <div className="space-y-8">
              {filteredReleases.map((release, index) => {
                const IconComponent = release.icon;

                return (
                  <div key={release.id} className="relative">
                    {/* Timeline Dot */}
                    <div className="absolute left-6 w-4 h-4 bg-white border-4 border-emerald-500 rounded-full shadow-lg z-10"></div>

                    {/* Release Card */}
                    <div className="ml-16">
                      <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <div className="p-6">
                          {/* Header with Icon, Date and New Badge */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-emerald-100 rounded-lg">
                                <IconComponent className="w-6 h-6 text-emerald-600" />
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="flex items-center text-sm text-gray-500">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {formatDate(release.date)}
                                </div>
                                {release.isNew && (
                                  <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded-full">
                                    NEW
                                  </span>
                                )}
                              </div>
                            </div>
                            <span className="text-sm font-medium text-emerald-600">
                              {release.version}
                            </span>
                          </div>

                          {/* Title and Description */}
                          <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            {release.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {release.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* No Results State */
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No releases found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search terms or category filter to find what
              you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
