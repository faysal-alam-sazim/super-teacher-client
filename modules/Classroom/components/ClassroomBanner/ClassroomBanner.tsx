import { ActionIcon, Box, Flex, Image, Menu, SimpleGrid, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import { BsInfoSquare, BsThreeDots } from "react-icons/bs";

import { useAppSelector } from "@/shared/redux/hooks";
import { authenticatedUserSelector } from "@/shared/redux/reducers/user.reducer";
import { ERole } from "@/shared/typedefs";

import EditClassroomModal from "../EditClassroomModal/EditClassroomModal";
import { useBannerStyles } from "./ClassroomBanner.styles";
import { TClassroomBannerProps } from "./ClassroomBanner.types";

const ClassroomBanner = ({ classroom }: TClassroomBannerProps) => {
  const { classes } = useBannerStyles();

  const [
    editClassroomModalOpened,
    { open: openEditClassroomModal, close: closeEditClassroomModal },
  ] = useDisclosure(false);

  const { claim } = useAppSelector(authenticatedUserSelector);

  return (
    <Box className={classes.banner}>
      <Image src="/bg_classroom.png" alt="Classroom" height={260} radius={"md"} />
      <Box className={classes.dropdownButton}>
        {claim === ERole.TEACHER ? (
          <Menu shadow="xl" offset={-1} withArrow arrowPosition="center" position="bottom-end">
            <Menu.Target>
              <ActionIcon variant="transparent">
                <BsThreeDots color="white" />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={openEditClassroomModal}>Edit</Menu.Item>
              <Menu.Item color="red">Delete</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : null}
      </Box>

      <Box className={classes.bannerTitle}>
        <Flex justify={"space-between"} align={"center"}>
          <Title>{classroom.title}</Title>
          <Box className={classes.classDetails}>
            <Menu shadow="xl" offset={-1} withArrow arrowPosition="center" position="bottom-end">
              <Menu.Target>
                <ActionIcon variant="transparent">
                  <BsInfoSquare color="white" />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item>
                  <SimpleGrid p={"xs"}>
                    <Text size="sm">Subject: {classroom.subject}</Text>
                    <Text size="sm">
                      Class Time: {dayjs(classroom.classTime).format("hh:mm A")}
                    </Text>
                    <Text size="sm">Days: {classroom.days.join(", ")}</Text>
                  </SimpleGrid>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Box>
        </Flex>
      </Box>
      <EditClassroomModal
        opened={editClassroomModalOpened}
        close={closeEditClassroomModal}
        classroom={classroom}
      />
    </Box>
  );
};

export default ClassroomBanner;
