import { ERole } from "@/shared/typedefs";

import { ERole } from "@/shared/typedefs";

export type TUserProfile = {
  id: number;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
};

export type TStudent = {
  id: number;
  address: string;
  phoneNumber: string;
  educationLevel: string;
  medium: string;
  degree: string;
  class: string;
  degreeName: string;
  semesterYear: string;
  user: TUser;
};

export type TTeacher = {
  id: number;
  highestEducationLevel: string;
  majorSubject: string;
  subjectsToTeach: string[];
  user?: TUser;
};

export type TUser = {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  role: ERole;
  teacher?: TTeacher;
  student?: TStudent;
};
