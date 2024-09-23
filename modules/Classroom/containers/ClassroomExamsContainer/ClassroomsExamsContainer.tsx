import { Box, Title } from "@mantine/core";

import LoadingComponent from "@/shared/components/LoadingComponent";
import { useGetExamsQuery } from "@/shared/redux/rtk-apis/exams/exams.api";

import ExamCard from "../../components/ExamCard/ExamCard";
import { useExamsStyles } from "./ClassroomExamsContainer.styles";
import { TClassroomExamsContianerProps } from "./ClassroomExamsContainer.types";

const ClassroomsExamsContainer = ({ classroomId }: TClassroomExamsContianerProps) => {
  const { classes } = useExamsStyles();

  const { data: fetchedExams, isLoading: isExamsLoading } = useGetExamsQuery(classroomId, {
    skip: !classroomId,
  });

  if (fetchedExams?.length === 0) {
    return null;
  }

  return (
    <>
      <Title className={classes.heading} order={3}>
        Exams
      </Title>
      <Box>
        {isExamsLoading ? (
          <LoadingComponent visible />
        ) : (
          <Box className={classes.cardsContainer}>
            {fetchedExams?.map((exam) => (
              <ExamCard key={exam.id} exam={exam} classroomId={classroomId} />
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};

export default ClassroomsExamsContainer;
