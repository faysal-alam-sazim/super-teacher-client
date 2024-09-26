import { Button } from "@mantine/core";

import { TAssignment } from "@/shared/redux/rtk-apis/assignments/assignments.types";

export const getSubmissionButton = (
  assignment: TAssignment,
  userId: number,
  buttonAction: () => void,
) => {
  const isSubmitted = assignment.submissions?.some(
    (submission) => submission.student.user.id === userId,
  );

  return (
    <Button color="green" disabled={isSubmitted} onClick={buttonAction}>
      {isSubmitted ? "Submitted" : "Submit"}
    </Button>
  );
};
