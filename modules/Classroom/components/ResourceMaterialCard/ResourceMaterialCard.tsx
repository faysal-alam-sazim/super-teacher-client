import { ActionIcon, Box, Button, Flex, Menu, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { BsThreeDots } from "react-icons/bs";
import { FaBook, FaFilePdf } from "react-icons/fa";

import { useAppSelector } from "@/shared/redux/hooks";
import { authenticatedUserSelector } from "@/shared/redux/reducers/user.reducer";
import { ERole } from "@/shared/typedefs";

import EditResourceModal from "../EditResourceModal/EditResourceModal";
import { useResourceCardStyles } from "./ResourceMaterialCard.styles";
import { TResourceMaterialCardType } from "./ResourceMaterialCard.types";

const ResourceMaterialCard = ({ resource, classroomId }: TResourceMaterialCardType) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { classes } = useResourceCardStyles();
  const { claim } = useAppSelector(authenticatedUserSelector);

  const handleOpenFile = () => {
    // TODO: trigger file download
    window.open(resource.fileUrl, "_blank");
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
              <Menu.Item onClick={open}>Edit</Menu.Item>
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
        opened={opened}
        close={close}
        classroomId={classroomId}
        resource={resource}
      />
    </Box>
  );
};

export default ResourceMaterialCard;
