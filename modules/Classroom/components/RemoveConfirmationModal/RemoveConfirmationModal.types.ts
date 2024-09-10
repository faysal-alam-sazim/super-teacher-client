import { TStudent } from "@/shared/redux/rtk-apis/users/users.types";

export type TRemoveConfirmationModalProps = {
  opened: boolean;
  close: () => void;
  classroomId: number;
  student: TStudent | null;
  setStudentToRemove: (value: TStudent | null) => void;
};
