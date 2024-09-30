import { TUser } from "@/shared/redux/rtk-apis/users/users.types";
import { EGender, EHighestEducationLevel } from "@/shared/typedefs";

export type TEditTeacherProfileProps = {
  userProfile?: TUser;
  toggleEditProfileOpened: () => void;
};

export type TEditTeacherFormData = {
  firstName: string;
  lastName: string;
  gender: EGender;
  majorSubject: string;
  highestEducationLevel: EHighestEducationLevel;
  subjectsToTeach: Array<string>;
  email: string;
};
