import { z } from "zod";

export const PersonalDetailsSchema = z.object({
  firstName: z.string().min(2, "First Name is required"),
  lastName: z.string().min(2, "Last Name is required"),
  gender: z.enum(["MALE", "FEMALE", "OTHER", "UNKNOWN"]),
  phone: z.string().min(10, "Mobile number is required"),
  email: z.string().email("Invalid email"),
  dob: z.string().date("Invalid date"),
  birthPlace: z.string().min(2, "Birth place is required"),
  passportNo: z.string().min(8, "Passport number is required"),
  passportIssueDate: z.string().date("Invalid date"),
  passportExpiryDate: z.string().date("Invalid date"),
  passportIssuePlace: z.string().min(2, "Passport issue place is required"),
  occupation: z.string().min(2, "Occupation is required"),
  education: z.string().min(2, "Education is required"),
});

export const ContactDetailsSchema = z.object({
  fatherName: z.string().min(2, "First Name is required"),
  motherName: z.string().min(2, "Last Name is required"),
  emergencyContact: z.string().min(10, "Mobile number is required"),
  stayContactNo: z.string().min(10, "Stay contact number is required"),
  stayAddress: z.string().min(2, "Stay address is required"),
});
