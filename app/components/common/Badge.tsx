import { SUBMISSION_STATUS } from "@/app/constants";
import React from "react";

interface IBadgeProps {
  status: string;
}

export default function Badge({ status }: IBadgeProps) {
  return (
    <>
      {status === SUBMISSION_STATUS.PENDING && (
        <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-gray-500">
          {status}
        </span>
      )}

      {status === SUBMISSION_STATUS.DISMISSED && (
        <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-red-400">
          {status}
        </span>
      )}

      {status === SUBMISSION_STATUS.VISA_GRANTED && (
        <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-green-400">
          {status}
        </span>
      )}

      {status === SUBMISSION_STATUS.IN_REVIEW && (
        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-yellow-300">
          {status}
        </span>
      )}
    </>
  );
}
