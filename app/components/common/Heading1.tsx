import React from "react";

export default function Heading1({ label }: { label: string }) {
  return (
    <h1 className="text-2xl mb-5">
      <strong>{label || "Heading"}</strong>
    </h1>
  );
}
