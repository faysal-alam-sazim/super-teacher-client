export type TAddResourceModalProps = {
  opened: boolean;
  close: () => void;
  classroomId: number;
};

export type TAddResourceFormData = {
  title: string;
  description: string;
  uploadFile: File;
};
