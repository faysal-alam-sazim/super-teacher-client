export type TClassroom = {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  subject: string;
  days: Array<string>;
  classTime: Date;
};

export type TClassroomApiResponse = {
  statusCode: number;
  message: string | string[];
  data: TClassroom[];
};
