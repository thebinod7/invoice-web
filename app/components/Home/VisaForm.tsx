"use client";

import {
  APP_PATHS,
  APPLYING_FROM_COUNTRIES,
  APPLYING_TO_COUNTRIES,
} from "@/app/constants";
import { useAuthContext } from "@/app/context/useAuthContext";
import { useVisaByCountryQuery } from "@/app/hooks/backend/visa";
import { useAppStore } from "@/app/store/app";
import { SelectItem } from "@/app/types";
import { useRouter } from "next/navigation";
import { SingleValue } from "react-select";
import { toast } from "sonner";
import BtnPrimary from "../Buttons/BtnPrimary";
import ReactSelect from "../ReactSelect";
import SpanLabel from "./SpanLabel";

export default function VisaForm() {
  const { setIsModalOpen, isLoggedIn } = useAuthContext();
  const { visaFormData, setVisaFormData } = useAppStore((state) => state);
  const router = useRouter();

  const { isLoading, data: visaDetails } = useVisaByCountryQuery(
    visaFormData.to
  );
  const availableVisas = visaDetails?.data?.result?.rows;
  const visaTypes = availableVisas?.map((visa: any) => ({
    label: visa.name,
    value: visa.uuid,
  }));

  const handleApplyVisa = () => {
    if (!visaFormData.from || !visaFormData.to || !visaFormData.type) {
      return toast.error("Please fill all the fields", {
        className: "bg-red-500",
      });
    }
    if (visaFormData.from === visaFormData.to) {
      return toast.error("From and To cannot be the same", {
        className: "bg-red-500",
      });
    }

    const { from, to, type } = visaFormData;
    if (isLoggedIn) {
      router.push(
        `${APP_PATHS.APPLICATION_FORM}?from=${from}&to=${to}&type=${type}`
      );
    } else {
      router.push(`${APP_PATHS.LOGIN}?from=${from}&to=${to}&type=${type}`);
    }
  };

  const handleFromChange = (data: SingleValue<SelectItem>) => {
    setVisaFormData({ ...visaFormData, from: data?.value ?? "" });
  };

  const handleToChange = (data: SingleValue<SelectItem>) => {
    setVisaFormData({ ...visaFormData, to: data?.value ?? "" });
  };

  const handleTypeChange = (data: SingleValue<SelectItem>) => {
    setVisaFormData({ ...visaFormData, type: data?.value ?? "" });
  };

  return (
    <div
      id="visa-form"
      className="border-y-2 rounded-lg border-x-2 shadow-lg p-5"
    >
      <div className="flex lg:flex-row flex-col md:items-center justify-around gap-4">
        <SpanLabel label="I'm applying from" />

        <div className="flex-1">
          <ReactSelect
            handleSelectChange={handleFromChange}
            instanceId="applying-from"
            options={APPLYING_FROM_COUNTRIES}
            placeholder="--Select Country--"
          />
        </div>

        <SpanLabel label="I'm going to" />

        <div className="flex-1">
          <ReactSelect
            handleSelectChange={handleToChange}
            instanceId="applying-to"
            options={APPLYING_TO_COUNTRIES}
            placeholder="--Select Country--"
          />
        </div>

        <SpanLabel label="Choose visa type" />

        <div className="flex-1">
          <ReactSelect
            handleSelectChange={handleTypeChange}
            instanceId="visa-type"
            options={visaTypes || []}
            placeholder={isLoading ? "Fetching..." : "--Select Type--"}
          />
        </div>
      </div>

      <div className="flex mt-5 md:mt-10 lg:flex-row flex-col md:items-center justify-end gap-4">
        <div className="rounded-md text-center bg-indigo-600 px-10 py-2 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <BtnPrimary handleBtnClick={handleApplyVisa} />
        </div>
      </div>
    </div>
  );
}
