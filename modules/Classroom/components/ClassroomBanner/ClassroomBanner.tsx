import { ActionIcon, Box, Flex, Image, Menu, SimpleGrid, Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import { BsInfoSquare, BsThreeDots } from "react-icons/bs";

import { useBannerStyles } from "./ClassroomBanner.styles";
import { TClassroomBannerProps } from "./ClassroomBanner.types";

const ClassroomBanner = ({ title, subject, classTime, days }: TClassroomBannerProps) => {
  const { classes } = useBannerStyles();

  return (
    <Box className={classes.banner}>
      <Image src="/bg_classroom.png" alt="Classroom" height={260} radius={"md"} />
      <Box className={classes.dropdownButton}>
        <Menu shadow="xl" offset={-1} withArrow arrowPosition="center" position="bottom-end">
          <Menu.Target>
            <ActionIcon variant="transparent">
              <BsThreeDots color="white" />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item>Edit</Menu.Item>
            <Menu.Item color="red">Delete</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Box>

      <Box className={classes.bannerTitle}>
        <Flex justify={"space-between"} align={"center"}>
          <Title>{title}</Title>
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
                    <Text size="sm">Subject: {subject}</Text>
                    <Text size="sm">Class Time: {dayjs(classTime).format("hh:mm:ss A")}</Text>
                    <Text size="sm">Days: {days.join(", ")}</Text>
                  </SimpleGrid>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default ClassroomBanner;
