import { EDegree, EEducationLevel, EGender, EMedium, ERole } from "./enums";

export interface IExample {
  id: string;
}

export interface IStudentDto {
  address: string;
  phoneNumber: string;
  educationLevel: EEducationLevel;
  medium?: EMedium;
  class?: string;
  degree?: EDegree;
  degreeName?: string;
  semesterYear?: string;
}

export interface IUserDto {
  id?: number;
  firstName: string;
  lastName: string;
  gender: EGender;
  email: string;
  password: string;
  role: ERole;
}

export interface ICreateStudentDto extends IUserDto {
  studentInput: IStudentDto;
}
