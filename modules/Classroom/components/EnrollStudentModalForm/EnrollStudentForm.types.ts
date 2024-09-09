export type TEnrollStudentForm = {
  student: string;
};

export type TEnrollStudentModalFormProps = {
  opened: boolean;
  close: () => void;
  classroomId: string;
};
