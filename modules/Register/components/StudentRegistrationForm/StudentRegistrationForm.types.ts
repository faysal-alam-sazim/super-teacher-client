import { EDegree, EEducationLevel, EGender, EMedium } from "@/shared/typedefs";

export type TStudentRegistrationFormData = {
  firstName: string;
  lastName: string;
  gender: EGender;
  address: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  educationLevel: EEducationLevel;
  medium?: EMedium;
  class?: string;
  degree?: EDegree;
  degreeName?: string;
  semesterYear?: string;
};
