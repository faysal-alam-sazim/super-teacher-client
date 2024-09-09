import React from "react";

import { Box, Button, Text } from "@mantine/core";
import { FaPlus } from "react-icons/fa";

import { ERole } from "@/shared/typedefs";

import classes from "./NoClassroom.module.css";

interface INoClassroomProps {
  role: ERole | null;
  open: () => void;
}

const NoClassroom = ({ role, open }: INoClassroomProps) => {
  if (role === ERole.TEACHER) {
    return (
      <Box className={classes["content-position"]}>
        <Button bg={"#011733"} leftIcon={<FaPlus />} onClick={open}>
          Create a classroom
        </Button>
      </Box>
    );
  }
  return (
    <Text c={"green"} size={"lg"} fw={"bold"} className={classes["content-position"]}>
      Not enrolled in any classroom
    </Text>
  );
};

export default NoClassroom;
