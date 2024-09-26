export type TSubmission = {
  id: number;
  submittedAt: Date;
  fileUrl: string;
  student: {
    id: number;
    user: {
      id: number;
      firstName: string;
      lastName: string;
    };
  };
  classroom: number;
};
