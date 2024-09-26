import { TAssignment } from "@/shared/redux/rtk-apis/assignments/assignments.types";

export type TEditAssignmentModalProps = {
  opened: boolean;
  close: () => void;
  classroomId: number;
  assignment: TAssignment;
};

export type TEditAssignmentFromData = {
  title: string;
  description: string;
  dueDate: Date;
  uploadFile: File;
};
