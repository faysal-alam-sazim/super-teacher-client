import React from "react";

import { Text, Title } from "@mantine/core";

import { useAppSelector } from "@/shared/redux/hooks";
import { authenticatedUserSelector } from "@/shared/redux/reducers/user.reducer";

import { ITeacherProps } from "./Teacher.types";

const Teacher = ({ teacher }: ITeacherProps) => {
  const { email } = useAppSelector(authenticatedUserSelector);

  return (
    <>
      <Title
        order={3}
        sx={{ borderBottom: "1px solid", borderBottomColor: "gray" }}
        mt={24}
        mb={12}
        pb={8}
      >
        Teacher
      </Title>
      <Text fz={"sm"}>
        {teacher?.user?.firstName + " " + teacher?.user?.lastName}{" "}
        <span>{email === teacher?.user?.email ? "(you)" : null}</span>
      </Text>
    </>
  );
};

export default Teacher;
