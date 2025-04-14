import React from "react";
import { ArrowLeft } from "lucide-react";
import clsx from "clsx";

interface IPrevButtonProps {
  isDisabled?: boolean;
  handlePrevClick: () => void;
  label?: string;
}

export default function PrevButton({
  isDisabled = false,
  handlePrevClick,
  label = "Prev",
}: IPrevButtonProps) {
  return (
    <div className="mb-6 text-center">
      <button
        onClick={handlePrevClick}
        disabled={isDisabled}
        className={clsx(
          `px-4 py-2 ${
            isDisabled && "hover:cursor-not-allowed opacity-50"
          } font-bold text-white bg-greyish rounded-full`
        )}
        type="button"
      >
        <ArrowLeft size={16} className="inline-block mr-2" />
        {label}
      </button>
    </div>
  );
}
