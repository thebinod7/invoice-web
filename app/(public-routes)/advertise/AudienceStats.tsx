import { CheckCircle, Eye, Target, Users } from 'lucide-react';
import React from 'react';

const STATS = {
  ACTIVE_USERS: 290,
  IMPRESSIONS: '3K',
  PAGE_VIEWS: '3K',
};

export default function AudienceStats() {
  return (
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
            <div className="text-sm text-gray-600">Monthly Impressions</div>
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
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span className="text-gray-700">
              Display ad on <span className="font-bold">thanks</span> page and
              all <span className="font-bold">blog posts</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
