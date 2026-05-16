'use client';

import { useState, useMemo } from 'react';
import { Search, Calendar, User, Tag, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { BLOG_ARTICLES, CATEGORIES } from '@/app/constants/db';

export default function page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Filter articles based on search term and category
  const filteredArticles = useMemo(() => {
    return BLOG_ARTICLES.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === 'All' || article.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-0 sm:mx-5 md:mx-8 lg:mx-20 xl:mx-24 2xl:mx-28">
        {/* Header */}
        <header className="border-b border-gray-100 py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl space-y-3 text-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Blog
              </p>
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
                Our Blog
              </h1>
              <p className="text-sm leading-relaxed text-gray-600">
                Discover insights, tutorials, and the latest trends in invoice
                generation.
              </p>
            </div>
          </div>
        </header>

        {/* Filters Section */}
        <section className="border-b border-gray-100 bg-gray-50/80 py-8 lg:py-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Search Input */}
              <div className="relative max-w-md flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search
                    className="h-4 w-4 text-gray-400"
                    strokeWidth={2}
                    aria-hidden
                  />
                </div>
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              {/* Category Filter */}
              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:ring-offset-1"
                >
                  <Tag className="h-4 w-4 text-gray-500" strokeWidth={2} />
                  {selectedCategory}
                  <ChevronDown className="h-4 w-4 text-gray-400" strokeWidth={2} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-sm">
                    {CATEGORIES.map((category) => (
                      <button
                        type="button"
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsDropdownOpen(false);
                        }}
                        className={`block w-full px-3 py-2 text-left text-sm transition-colors ${selectedCategory === category
                            ? 'bg-emerald-50 text-emerald-800'
                            : 'text-gray-700 hover:bg-gray-50'
                          }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Results Count */}
            <p className="mt-4 text-sm text-gray-500">
              Showing {filteredArticles.length} of {BLOG_ARTICLES.length}{' '}
              articles
            </p>
          </div>
        </section>

        {/* Articles Grid */}
        <main className="py-10 lg:py-14">
          <div className="container mx-auto px-4">
            {filteredArticles.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 py-16 text-center">
                <Search
                  className="mx-auto mb-4 h-10 w-10 text-gray-300"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <h3 className="mb-2 text-sm font-semibold text-gray-900">
                  No articles found
                </h3>
                <p className="mx-auto max-w-sm text-sm leading-relaxed text-gray-600">
                  Try adjusting your search terms or category filter.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-6">
                {filteredArticles.map((article) => (
                  <article
                    key={article.id}
                    className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-colors hover:border-gray-300"
                  >
                    {/* Article Image */}
                    <div className="aspect-video overflow-hidden bg-gray-100">
                      <img
                        src={article.image || '/placeholder.svg'}
                        alt={article.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Article Content */}
                    <div className="flex flex-1 flex-col p-5">
                      {/* Category Badge */}
                      <div className="mb-3">
                        <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                          {article.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="mb-2 text-base font-semibold leading-snug tracking-tight text-gray-900 line-clamp-2">
                        <Link
                          href={`/blog/${article.slug}`}
                          className="transition-colors hover:text-emerald-600"
                        >
                          {article.title}
                        </Link>
                      </h2>

                      {/* Excerpt */}
                      <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600 line-clamp-3">
                        {article.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="mb-4 flex flex-wrap gap-1.5">
                        {article.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Article Meta */}
                      <div className="flex items-center justify-between gap-3 border-t border-gray-100 pt-4 text-xs text-gray-500">
                        <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-1">
                          <div className="flex items-center gap-1">
                            <User className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                            <span className="truncate">{article.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar
                              className="h-3.5 w-3.5 shrink-0"
                              strokeWidth={2}
                            />
                            <span>{article.date}</span>
                          </div>
                        </div>
                        <span className="shrink-0 font-medium text-gray-700">
                          {article.readTime}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
