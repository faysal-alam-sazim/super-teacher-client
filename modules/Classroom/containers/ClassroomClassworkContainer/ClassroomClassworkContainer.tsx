import { Box } from "@mantine/core";

import { useAppSelector } from "@/shared/redux/hooks";
import { authenticatedUserSelector } from "@/shared/redux/reducers/user.reducer";
import { ERole } from "@/shared/typedefs";

import ClassworkCreateButton from "../../components/ClassworkCreateButton/ClassworkCreateButton";
import { useClassworkContainerStyles } from "./ClassroomClassworkContainer.styles";

const ClassroomClassworkContainer = () => {
  const { claim } = useAppSelector(authenticatedUserSelector);
  const { classes } = useClassworkContainerStyles();

  return (
    <Box className={classes.container}>
      {claim === ERole.TEACHER ? <ClassworkCreateButton /> : null}
    </Box>
  );
};

export default ClassroomClassworkContainer;
