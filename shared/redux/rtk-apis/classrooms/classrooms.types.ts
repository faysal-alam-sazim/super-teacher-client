import { TTeacher } from "../users/users.types";

export type TClassroom = {
  id: number;
  title: string;
  subject: string;
  classTime: Date;
  days: string[];
  teacher?: TTeacher;
};
