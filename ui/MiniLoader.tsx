import { LoaderCircle } from 'lucide-react';
import React from 'react';

export default function MiniLoader() {
  return (
    <div className="flex items-center justify-center">
      <LoaderCircle className="h-6 w-6 text-slate-400 animate-spin" />
    </div>
  );
}
