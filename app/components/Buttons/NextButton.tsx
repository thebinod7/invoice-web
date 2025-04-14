import React from "react";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

interface INextButtonProps {
  isDisabled?: boolean;
  handleNextClick: () => void;
  label?: string;
}

export default function NextButton({
  isDisabled = false,
  handleNextClick,
  label = "Next",
}: INextButtonProps) {
  return (
    <div className="mb-6 text-center">
      <button
        onClick={handleNextClick}
        disabled={isDisabled}
        className={clsx(
          `${
            isDisabled && "cursor-not-allowed opacity-50"
          } px-4 py-2 font-bold text-white bg-greyish rounded-full`
        )}
        type="button"
      >
        {label}
        <ArrowRight size={16} className="inline-block ml-2" />
      </button>
    </div>
  );
}
