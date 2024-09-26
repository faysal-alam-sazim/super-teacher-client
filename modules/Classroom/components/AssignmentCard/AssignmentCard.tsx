import { Box, Button, Flex, Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import { FaFilePdf } from "react-icons/fa";
import { LuFileEdit } from "react-icons/lu";

import { EDateFormat } from "@/shared/typedefs";

import { useAssignmentCardStyles } from "./AssignmentCard.styles";
import { TAssignmentCardProps } from "./AssignmentCard.types";

const AssignmentCard = ({ assignment }: TAssignmentCardProps) => {
  const { classes } = useAssignmentCardStyles(assignment.dueDate);

  const handleOpenFile = () => {
    window.open(assignment.fileUrl, "_blank");
  };

  return (
    <Box className={classes.card}>
      <Flex justify={"space-between"}>
        <Flex align={"center"} gap={8}>
          <Box className={classes.icon}>{<LuFileEdit />}</Box>
          <Title order={5}>{assignment.title}</Title>
        </Flex>
      </Flex>
      <Text size={"sm"}>{assignment.description}</Text>
      <Box className={classes.cardEnd}>
        <Button
          className={classes.downloadButton}
          rightIcon={<FaFilePdf />}
          onClick={handleOpenFile}
        >
          Download
        </Button>
        <Text className={classes.dateText}>
          <strong> Due Date:</strong> {dayjs(assignment.dueDate).format(EDateFormat.SHORT)}
        </Text>
      </Box>
    </Box>
  );
};

export default AssignmentCard;
