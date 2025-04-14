import { create } from "zustand";
import {
  GENDER_ENUM,
  IContactDetials,
  IPersonalDetails,
  IUploadedFiles,
} from "../types";

interface IVisa {
  from: string;
  to: string;
  type: string;
}

interface AppStore {
  personalDetails: IPersonalDetails;
  setPersonalDetails: (item: any) => void;
  contactDetails: IContactDetials;
  setContactDetails: (item: any) => void;
  uploadedFiles: IUploadedFiles;
  setUploadedFiles: (item: any) => void;
  visaFormData: IVisa;
  setVisaFormData: (item: IVisa) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  personalDetails: {
    firstName: "",
    lastName: "",
    gender: GENDER_ENUM.UNKNOWN,
    phone: "",
    email: "",
    dob: "",
    birthPlace: "",
    passportNo: "",
    passportIssueDate: "",
    passportExpiryDate: "",
    passportIssuePlace: "",
    occupation: "",
    education: "",
  },
  setPersonalDetails: (item) =>
    set((state) => ({
      personalDetails: { ...state.personalDetails, ...item },
    })),
  contactDetails: {
    fatherName: "",
    motherName: "",
    emergencyContact: "",
    stayContactNo: "",
    stayAddress: "",
  },
  setContactDetails: (item) =>
    set((state) => ({
      contactDetails: { ...state.contactDetails, ...item },
    })),
  uploadedFiles: {
    passportImgUrl: "",
    photoUrl: "",
    supportingDocsUrl: [],
  },
  setUploadedFiles: (item) =>
    set((state) => ({
      uploadedFiles: { ...state.uploadedFiles, ...item },
    })),
  visaFormData: {
    from: "",
    to: "",
    type: "",
  },
  setVisaFormData: (item) =>
    set((state) => ({
      visaFormData: { ...state.visaFormData, ...item },
    })),
}));
