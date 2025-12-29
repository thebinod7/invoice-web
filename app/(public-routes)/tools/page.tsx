import { TOOLS_LIST } from '@/app/constants';
import { Clock, DollarSign, Globe, ReceiptIcon, Search } from 'lucide-react';
import Link from 'next/link';

const TOOLS = [
  {
    id: 1,
    name: 'Timezone Converter',
    description: 'Convert time between different timezones instantly',
    icon: Clock,
    category: 'Time',
    color: 'emerald',
    link: TOOLS_LIST.TIMEZONE,
  },
  {
    id: 2,
    name: 'Currency Converter',
    description: 'Currency exchange rates and conversions made easy',
    icon: DollarSign,
    category: 'Finance',
    color: 'emerald',
    link: TOOLS_LIST.CURRENCY,
  },
  {
    id: 3,
    name: 'Invoice Generator',
    description: 'Create professional invoices in seconds',
    icon: ReceiptIcon,
    category: 'Finance',
    color: 'emerald',
    link: TOOLS_LIST.INVOICE,
  },
];

export default function page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-8 h-8 text-emerald-600" />
            <h1 className="text-3xl font-bold text-gray-900">ToolHub</h1>
          </div>
          <p className="text-gray-600">
            Essential tools for everyday conversions and calculations
          </p>
        </div>
      </header>

      {/* Tools Grid */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {TOOLS.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <div
                  key={tool.id}
                  className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-emerald-600 hover:shadow-lg hover:-translate-y-1"
                >
                  {/* Background accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-50 rounded-full -mr-10 -mt-10 group-hover:bg-emerald-100 transition-colors" />

                  {/* Icon */}
                  <div className="relative mb-4">
                    <div className="inline-flex p-3 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors">
                      <IconComponent className="w-6 h-6 text-emerald-600" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      <Link href={{ pathname: tool.link }}>{tool.name}</Link>
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {tool.description}
                    </p>

                    {/* Category Badge */}
                    <div className="flex items-center justify-between">
                      <span className="inline-block px-3 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-full">
                        {tool.category}
                      </span>
                      {tool.link && (
                        <Link
                          href={{ pathname: tool.link }}
                          className="text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors"
                        >
                          Open →
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No tools found
            </h3>
            <p className="text-gray-600">Try adjusting your search query</p>
          </div>
        )}
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 border-t border-gray-200">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                {TOOLS.length}
              </div>
              <p className="text-gray-600">Tools Available</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                100%
              </div>
              <p className="text-gray-600">Free to Use</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                24/7
              </div>
              <p className="text-gray-600">Always Available</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
