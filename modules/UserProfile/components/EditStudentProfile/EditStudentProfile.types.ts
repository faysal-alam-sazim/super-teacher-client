import { TUser } from "@/shared/redux/rtk-apis/users/users.types";
import { EDegree, EEducationLevel, EGender, EMedium } from "@/shared/typedefs";

export type TEditStudentProfileProps = {
  userProfile?: TUser;
  toggleEditProfileOpenend: () => void;
};

export type TEditStudentProfileFormData = {
  email: string;
  firstName: string;
  lastName: string;
  gender: EGender;
  address: string;
  phoneNumber: string;
  educationLevel: EEducationLevel;
  medium?: EMedium | "";
  class?: string;
  degree?: EDegree | "";
  degreeName?: string;
  semesterYear?: string;
};
