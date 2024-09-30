import { EGender, EHighestEducationLevel, ERole } from "@/shared/typedefs";

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
  id?: number;
  highestEducationLevel: EHighestEducationLevel;
  majorSubject: string;
  subjectsToTeach: string[];
  user?: TUser;
};

export type TUser = {
  id: number;
  firstName: string;
  lastName: string;
  gender: EGender;
  email: string;
  role: ERole;
  teacher?: TTeacher;
  student?: TStudent;
};

export type TUpdateUserDto = {
  firstName?: string;
  lastName?: string;
  gender?: EGender;
  teacherInput?: TTeacher;
  studentInput?: TStudent;
};
