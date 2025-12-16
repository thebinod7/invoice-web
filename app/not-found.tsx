import { Home, SearchX } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 px-6">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-indigo-100 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto text-center">
        {/* Icon */}
        <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-lg shadow-slate-200/50">
          <SearchX className="w-12 h-12 text-slate-400" strokeWidth={1.5} />
        </div>

        {/* 404 Number */}
        <h1 className="mb-6 text-[140px] md:text-[180px] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-slate-700 to-slate-600">
          404
        </h1>

        {/* Heading */}
        <h2 className="mb-4 text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mb-10 text-base md:text-lg text-slate-600 max-w-md mx-auto leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* CTA Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors duration-200 shadow-lg shadow-slate-900/20 hover:shadow-xl hover:shadow-slate-900/30"
        >
          <Home className="w-4 h-4" strokeWidth={2} />
          Back to Home
        </Link>
      </div>
    </section>
  );
}
