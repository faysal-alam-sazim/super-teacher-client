import { TStudent, TTeacher } from "../users/users.types";

export type TClassroom = {
  id: number;
  title: string;
  subject: string;
  classTime: Date;
  days: string[];
  meetLink?: string;
  teacher?: TTeacher;
};

export type TEnrollInfo = {
  studentId: number;
};

export type TEnrollMentInfo = {
  id: number;
  classroomId: TClassroom;
  studentId: TStudent;
};
