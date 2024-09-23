export type TExam = {
  id: number;
  title: string;
  instruction: string;
  date: Date;
  classroom?: number;
};

export type TCreateExamDto = {
  title: string;
  instruction: string;
  date: Date;
};

export type TEditExamDto = {
  title?: string;
  instruction?: string;
  date?: Date;
};
