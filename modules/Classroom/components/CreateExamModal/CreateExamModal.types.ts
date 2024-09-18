export type TCreateExamModalProps = {
  opened: boolean;
  close: () => void;
  classroomId: number;
};

export type TCreateExamFormData = {
  title: string;
  instruction: string;
  dueDate: Date;
};
