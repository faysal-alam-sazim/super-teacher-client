import { Button } from "@mantine/core";

import { TAssignment } from "@/shared/redux/rtk-apis/assignments/assignments.types";

export const getSubmissionButton = (
  submittedAssignments: TAssignment[] | undefined,
  assignment: TAssignment,
  buttonAction: () => void,
) => {
  const isSubmitted = submittedAssignments?.some((submitted) => submitted.id === assignment.id);

  return isSubmitted ? (
    <Button variant="outline" disabled>
      Submitted
    </Button>
  ) : (
    <Button color="green" onClick={buttonAction}>
      Submit
    </Button>
  );
};
