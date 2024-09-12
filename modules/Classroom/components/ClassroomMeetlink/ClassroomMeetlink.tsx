import React from "react";

import { Anchor, Box, Button, Flex, Title } from "@mantine/core";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { TbEditCircle } from "react-icons/tb";

import { useAppSelector } from "@/shared/redux/hooks";
import { authenticatedUserSelector } from "@/shared/redux/reducers/user.reducer";
import { ERole } from "@/shared/typedefs";

import { useMeetlinkStyles } from "./ClassroomMeetlink.styles";
import { TClassroomMeetlinkProps } from "./ClassroomMeetlink.types";

const ClassroomMeetlink = ({ meetlink }: TClassroomMeetlinkProps) => {
  const { claim } = useAppSelector(authenticatedUserSelector);
  const { classes } = useMeetlinkStyles();

  if (meetlink) {
    return (
      <Box className={classes.boxDetails}>
        <Title order={4}>Meet link</Title>
        <Flex justify={"center"} align={"center"} gap={12} mt={6}>
          <Anchor href="https://www.google.com" size="sm">
            www.google.com
          </Anchor>
          {claim === ERole.TEACHER ? (
            <>
              <TbEditCircle />
              <FaTrashAlt className={classes.icon} />
            </>
          ) : null}
        </Flex>
      </Box>
    );
  }
  if (claim === ERole.TEACHER) {
    return (
      <Button w={"100%"} variant="outline" mb={10} c={"green"} color="green" leftIcon={<FaPlus />}>
        Add meet link
      </Button>
    );
  }

  return null;
};

export default ClassroomMeetlink;
