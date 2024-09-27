import { Text } from "@mantine/core";

import LoadingComponent from "@/shared/components/LoadingComponent";
import { useGetAssignmentsQuery } from "@/shared/redux/rtk-apis/assignments/assignments.api";

import AssignmentCard from "../../components/AssignmentCard/AssignmentCard";
import { TAssignmentsCardContainerProps } from "./AssignmentsCardContainer.types";

const AssignmentsCardContainer = ({ classroomId }: TAssignmentsCardContainerProps) => {
  const { data: fetchedAssignments, isLoading: isAssignmentsLoading } = useGetAssignmentsQuery(
    classroomId,
    { skip: !classroomId },
  );

  if (isAssignmentsLoading) {
    return <LoadingComponent visible />;
  }

  if (fetchedAssignments?.length === 0) {
    return <Text>No assignments uploaded</Text>;
  }

  return (
    <>
      {fetchedAssignments?.map((assignment) => (
        <AssignmentCard key={assignment.id} assignment={assignment} classroomId={classroomId} />
      ))}
    </>
  );
};

export default AssignmentsCardContainer;
