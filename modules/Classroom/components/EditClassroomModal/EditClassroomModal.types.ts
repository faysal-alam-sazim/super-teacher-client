import { TClassroom } from "@/shared/redux/rtk-apis/classrooms/classrooms.types";

export type TEditClassroomModalProps = {
  opened: boolean;
  close: () => void;
  classroom: TClassroom;
};

export type TEditClassroomFormData = {
  title: string;
  subject: string;
  classTime: string;
  days: Array<string>;
};
