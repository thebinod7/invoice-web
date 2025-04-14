import { DROPZONE } from "@/app/constants";
import React from "react";
import { CircleAlert } from "lucide-react";

export default function InvalidFileError({ fileErrors }: any) {
  const errCode = fileErrors[0]?.errors[0]?.code;
  let erroMsg = "Please select valid file type";
  if (errCode === DROPZONE.ERROR_CODE.MAX_SIZE) {
    erroMsg = "You can upload a maximum of 5MB file";
  }
  return (
    <div className="text-red-800 flex">
      <CircleAlert className="mt-0.5" size={20} />
      <span className="ml-1">{erroMsg}</span>
    </div>
  );
}
