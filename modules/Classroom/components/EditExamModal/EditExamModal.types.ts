import { TExam } from "@/shared/redux/rtk-apis/exams/exams.types";

export type TEditExamModalProps = {
  opened: boolean;
  close: () => void;
  classroomId: number;
  exam: TExam;
};

export type TEditExamFormData = {
  title?: string;
  instruction?: string;
  dueDate?: Date;
};
