import { EGender, EHighestEducationLevel } from "@/shared/typedefs";

export type TTeacherRegistrationFormData = {
  uniqueCode: string;
  firstName: string;
  lastName: string;
  gender: EGender;
  majorSubject: string;
  highestEducationLevel: EHighestEducationLevel;
  subjectsToTeach: Array<string>;
  email: string;
  password: string;
  confirmPassword: string;
};
