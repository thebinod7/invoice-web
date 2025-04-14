import clsx from "clsx";
import React from "react";
import SpinnerX from "./Spinner";

export default function LoadingBtn({ label }: { label: string }) {
  return (
    <div className="relative mb-6 text-center opacity-50">
      <button
        disabled={true}
        className={clsx(
          `px-4 py-2 ${"hover:cursor-not-allowed"} font-bold text-white bg-greyish rounded-full`
        )}
        type="button"
      >
        <i className="absolute z-10 top-0 left-2 w-full h-full flex justify-start items-center">
          <SpinnerX variant={2} />
        </i>
        <span className="ml-4">{label}</span>
      </button>
    </div>
  );
}
