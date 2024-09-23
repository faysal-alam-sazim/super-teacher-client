export type TAddAssignmentModalProps = {
  opened: boolean;
  close: () => void;
  classroomId: number;
};

export type TAddAssignmentFromData = {
  title: string;
  description: string;
  dueDate: Date;
  uploadFile: File;
};
