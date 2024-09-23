export type TSubmission = {
  id: number;
  submittedAt: Date;
  fileUrl: string;
  student: {
    id: number;
    user: {
      firstName: string;
      lastName: string;
    };
  };
  classroom: number;
};
