'use client';
import { Eye, FileText, Sparkles, Users } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function HomeHero() {
  const [stats, setStats] = useState({
    pageViews: 0,
    visitors: 0,
    invoices: 0,
    loading: true,
  });

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toLocaleString();
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/analytics');
        const r = await res.json();
        const currentWeekStats = {
          pageViews: r.pageViews,
          visitors: r.visitors,
          invoices: r.invoices,
          loading: false,
        };

        setStats(currentWeekStats);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        setStats((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, []);

  return (
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
              No sign-up needed. Generate and download beautiful, ready-to-send
              invoices in seconds.
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
          <div className="relative" id="stats">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Monthly Stats
            </h3>

            {stats.loading ? (
              <div className="mb-4 space-y-2">
                <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 bg-gray-100 rounded animate-pulse w-16"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-emerald-100 rounded-md">
                      <FileText className="h-3 w-3 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Invoices</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {formatNumber(stats.invoices) + '+'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-blue-100 rounded-md">
                      <Users className="h-3 w-3 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Unique Visits</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {formatNumber(stats.visitors) + '+'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-purple-100 rounded-md">
                      <Eye className="h-3 w-3 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Views</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {formatNumber(stats.pageViews) + '+'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

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
  );
}
