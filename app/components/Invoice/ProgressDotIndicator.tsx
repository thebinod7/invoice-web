import React from 'react';

export default function ProgressDotIndicator() {
  return (
    <div className="flex justify-center mt-4 gap-1">
      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
    </div>
  );
}
