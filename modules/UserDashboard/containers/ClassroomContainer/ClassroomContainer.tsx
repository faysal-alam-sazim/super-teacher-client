import { Box, Button, Text } from "@mantine/core";
import { FaPlus } from "react-icons/fa";

import { useAppSelector } from "@/shared/redux/hooks";
import { authenticatedUserSelector } from "@/shared/redux/reducers/user.reducer";
import { ERole } from "@/shared/typedefs";

import classes from "./ClassroomContainer.module.css";
import { IClassroomContainerProps } from "./ClassroomContainer.types";

const ClassroomContainer = ({ open }: IClassroomContainerProps) => {
  const user = useAppSelector(authenticatedUserSelector);
  return (
    <Box mih={"91vh"} pos={"relative"}>
      {user?.claim === ERole.TEACHER ? (
        <Button
          bg={"#011733"}
          leftIcon={<FaPlus />}
          className={classes["content-position"]}
          onClick={open}
        >
          Create a classroom
        </Button>
      ) : (
        <Text c={"green"} size={"lg"} fw={"bold"} className={classes["content-position"]}>
          Not enrolled in any classroom
        </Text>
      )}
    </Box>
  );
};

export default ClassroomContainer;
