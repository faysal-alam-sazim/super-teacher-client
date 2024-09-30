export type TAssignmentSubmissionsModalProps = {
  opened: boolean;
  close: () => void;
  assignmentId: number;
};

export type TAssignmentSubmissionFormData = {
  uploadFile: File;
};
