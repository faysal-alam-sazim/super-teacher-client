export type TAssignment = {
  id: number;
  title: string;
  description: string;
  fileUrl: string;
  dueDate: Date;
  classroom?: number;
};

export type TAddAssignmentInfoDto = {
  title: string;
  description: string;
  dueDate: Date;
};

export type TEditAssignmentInfoDto = {
  title?: string;
  description?: string;
  dueDate?: Date;
};
