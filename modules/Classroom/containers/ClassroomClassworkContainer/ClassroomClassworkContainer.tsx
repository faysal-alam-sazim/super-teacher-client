import { Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useAppSelector } from "@/shared/redux/hooks";
import { authenticatedUserSelector } from "@/shared/redux/reducers/user.reducer";
import { ERole } from "@/shared/typedefs";

import ClassworkCreateButton from "../../components/ClassworkCreateButton/ClassworkCreateButton";
import CreateExamModal from "../../components/CreateExamModal/CreateExamModal";
import { useClassworkContainerStyles } from "./ClassroomClassworkContainer.styles";
import { TClassroomClassworkContainerProps } from "./ClassroomClassworkContainer.types";

const ClassroomClassworkContainer = ({ classroom }: TClassroomClassworkContainerProps) => {
  const { claim } = useAppSelector(authenticatedUserSelector);
  const { classes } = useClassworkContainerStyles();
  const [examModalOpened, { open: openExamModal, close: closeExamModal }] = useDisclosure(false);

  return (
    <Box className={classes.container}>
      {claim === ERole.TEACHER ? <ClassworkCreateButton openExamModal={openExamModal} /> : null}
      <CreateExamModal opened={examModalOpened} close={closeExamModal} classroomId={classroom.id} />
    </Box>
  );
};

export default ClassroomClassworkContainer;
