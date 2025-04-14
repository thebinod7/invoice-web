import React from "react";

export default function SpanLabel({ label = "N/A" }: { label?: string }) {
  return (
    <div>
      <span className="text-lg text-center">{label}</span>
    </div>
  );
}
