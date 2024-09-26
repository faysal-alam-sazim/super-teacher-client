import { ActionIcon, Box, Button, Flex, Menu, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { BsThreeDots } from "react-icons/bs";
import { FaBook, FaFilePdf } from "react-icons/fa";

import { useAppSelector } from "@/shared/redux/hooks";
import { authenticatedUserSelector } from "@/shared/redux/reducers/user.reducer";
import { ERole } from "@/shared/typedefs";

import DeleteConfirmationModal from "@/shared/components/DeleteConfirmationModal";
import { NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS } from "@/shared/constants/app.constants";
import { useDeleteResourceMutation } from "@/shared/redux/rtk-apis/resources/resources.api";
import { parseApiErrorMessage } from "@/shared/utils/errors";

import EditResourceModal from "../EditResourceModal/EditResourceModal";
import { useResourceCardStyles } from "./ResourceMaterialCard.styles";
import { TResourceMaterialCardType } from "./ResourceMaterialCard.types";

const ResourceMaterialCard = ({ resource, classroomId }: TResourceMaterialCardType) => {
  const [editOpened, { open: openEdit, close: closeEditModal }] = useDisclosure(false);
  const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);

  const { classes } = useResourceCardStyles();
  const { claim } = useAppSelector(authenticatedUserSelector);
  const [deleteResource] = useDeleteResourceMutation();

  const handleOpenFile = () => {
    // TODO: trigger file download
    window.open(resource.fileUrl, "_blank");
  };

  const handleDelete = async () => {
    try {
      await deleteResource({ classroomId, resourceId: resource.id }).unwrap();
      closeDelete();
      showNotification({
        title: "Success",
        message: "Resource Deleted Successfully!",
        autoClose: NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS,
        color: "green",
      });
    } catch (error) {
      const errorMessage = parseApiErrorMessage(error);

      showNotification({
        title: "Error",
        message: errorMessage,
        autoClose: NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS,
        color: "red",
      });
    }
  };

  return (
    <Box className={classes.card}>
      <Flex justify={"space-between"}>
        <Flex align={"center"} gap={8}>
          <Box className={classes.icon}>{<FaBook />}</Box>
          <Title order={5}>{resource.title}</Title>
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
              <Menu.Item color="red" onClick={openDelete}>
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : null}
      </Flex>
      <Text size={"sm"}>{resource.description}</Text>
      <Flex justify={"end"}>
        <Button
          className={classes.downloadButton}
          rightIcon={<FaFilePdf />}
          onClick={handleOpenFile}
        >
          Download
        </Button>
      </Flex>
      <EditResourceModal
        opened={editOpened}
        close={closeEditModal}
        classroomId={classroomId}
        resource={resource}
      />
      <DeleteConfirmationModal
        opened={deleteOpened}
        close={closeDelete}
        onDeleteAction={handleDelete}
      />
    </Box>
  );
};

export default ResourceMaterialCard;
