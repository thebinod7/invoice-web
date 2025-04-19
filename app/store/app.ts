import { create } from 'zustand';

interface AppStore {
  personalDetails: {};
  setPersonalDetails: (item: any) => void;
  contactDetails: {};
  setContactDetails: (item: any) => void;
  uploadedFiles: {};
  setUploadedFiles: (item: any) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  personalDetails: {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    dob: '',
    birthPlace: '',
    passportNo: '',
    passportIssueDate: '',
    passportExpiryDate: '',
    passportIssuePlace: '',
    occupation: '',
    education: '',
  },
  setPersonalDetails: (item) =>
    set((state) => ({
      personalDetails: { ...state.personalDetails, ...item },
    })),
  contactDetails: {
    fatherName: '',
    motherName: '',
    emergencyContact: '',
    stayContactNo: '',
    stayAddress: '',
  },
  setContactDetails: (item) =>
    set((state) => ({
      contactDetails: { ...state.contactDetails, ...item },
    })),
  uploadedFiles: {
    passportImgUrl: '',
    photoUrl: '',
    supportingDocsUrl: [],
  },
  setUploadedFiles: (item) =>
    set((state) => ({
      uploadedFiles: { ...state.uploadedFiles, ...item },
    })),
}));
