export type TGetAssignmentSubmissionsProps = {
  assignmentId: number;
  assignmentDueDate: Date;
  classroomId: number;
  opened: boolean;
  close: () => void;
};
