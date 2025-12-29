import { APP_PATHS } from '@/app/constants';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function CTA() {
  return (
    <>
      <div className="space-y-4 mt-2">
        <Link
          href={APP_PATHS.CREATE_INVOICE}
          className="w-full font-normal py-2 px-6 duration-200 flex items-center justify-center space-x-2 shadow-sm text-md text-emerald-600 bg-white hover:bg-gray-100 rounded-lg transition-colors focus:outline-none"
        >
          <Plus className="w-5 h-5" />
          <span>Genereate another invoice</span>
        </Link>
      </div>
    </>
  );
}
