import React from "react";

import { Flex, Text, Title } from "@mantine/core";
import { FaRegPlusSquare, FaRegTrashAlt } from "react-icons/fa";

import { useAppSelector } from "@/shared/redux/hooks";
import { authenticatedUserSelector } from "@/shared/redux/reducers/user.reducer";

import { IStudentsProps } from "./Students.types";

const Students = ({ students }: IStudentsProps) => {
  const { email } = useAppSelector(authenticatedUserSelector);

  return (
    <>
      <Flex
        justify={"space-between"}
        align={"center"}
        sx={{ borderBottom: "1px solid", borderBottomColor: "gray" }}
        mt={24}
        mb={12}
        pb={8}
      >
        <Title order={3}>Students</Title>
        <FaRegPlusSquare color="green" />
      </Flex>
      {students?.map((student) => (
        <Flex key={student.id} justify={"space-between"}>
          <Text fz={"sm"}>
            {student.user?.firstName + " " + student.user?.lastName}{" "}
            <span>{email === student.user?.email ? "(you)" : null}</span>
          </Text>
          <Flex justify={"center"} align={"center"}>
            <Text fz={"sm"} mr={12}>
              {student.user?.email}{" "}
            </Text>
            <FaRegTrashAlt color="purple" />
          </Flex>
        </Flex>
      ))}
    </>
  );
};

export default Students;
