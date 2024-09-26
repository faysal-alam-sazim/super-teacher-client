import { ActionIcon, Box, Button, Flex, Menu, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import { BsThreeDots } from "react-icons/bs";
import { FaFilePdf } from "react-icons/fa";
import { LuFileEdit } from "react-icons/lu";

import { useAppSelector } from "@/shared/redux/hooks";
import { authenticatedUserSelector } from "@/shared/redux/reducers/user.reducer";
import { EDateFormat, ERole } from "@/shared/typedefs";

import EditAssignmnetModal from "../EditAssignemntModal/EditAssignmentModal";
import { useAssignmentCardStyles } from "./AssignmentCard.styles";
import { TAssignmentCardProps } from "./AssignmentCard.types";

const AssignmentCard = ({ assignment, classroomId }: TAssignmentCardProps) => {
  const [editOpened, { open: openEdit, close: closeEditModal }] = useDisclosure(false);
  const { classes } = useAssignmentCardStyles(assignment.dueDate);
  const { claim } = useAppSelector(authenticatedUserSelector);

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
        {claim === ERole.TEACHER ? (
          <Menu shadow="xl" offset={-1} withArrow arrowPosition="center" position="bottom-end">
            <Menu.Target>
              <ActionIcon variant="transparent">
                <BsThreeDots color="black" />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={openEdit}>Edit</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : null}
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
      <EditAssignmnetModal
        opened={editOpened}
        close={closeEditModal}
        classroomId={classroomId}
        assignment={assignment}
      />
    </Box>
  );
};

export default AssignmentCard;
