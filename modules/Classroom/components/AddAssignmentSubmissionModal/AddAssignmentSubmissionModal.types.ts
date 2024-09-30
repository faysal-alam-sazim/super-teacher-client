export type TAssignmentSubmissionsModalProps = {
  opened: boolean;
  close: () => void;
  classroomId: number;
  assignmentId: number;
};

export type TAssignmentSubmissionFormData = {
  uploadFile: File;
};
