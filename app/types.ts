export enum GENDER_ENUM {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
  UNKNOWN = "UNKNOWN",
}
export interface IFileUploaded {
  preview: string | null;
  file: File | null;
}

export interface SelectItem {
  value: string;
  label: string;
}

export interface IUploadedFiles {
  passportImgUrl: string;
  photoUrl: string;
  supportingDocsUrl: string[];
}

export interface IPersonalDetails {
  firstName: string;
  lastName: string;
  gender: GENDER_ENUM;
  phone: string;
  email: string;
  dob: string;
  birthPlace: string;
  passportNo: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  passportIssuePlace: string;
  occupation: string;
  education: string;
}

export interface IContactDetials {
  fatherName: string;
  motherName: string;
  emergencyContact: string;
  stayAddress: string;
  stayContactNo: string;
}
