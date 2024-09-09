export type TClassroomApiResponse = {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  subject: string;
  days: Array<string>;
  classTime: Date;
};
