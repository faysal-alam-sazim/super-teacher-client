import React from "react";

import { useRouter } from "next/router";

import { Box, Button, Flex, Menu, Text } from "@mantine/core";
import { FaPlus } from "react-icons/fa";

import { useAppSelector } from "@/shared/redux/hooks";
import { authenticatedUserSelector } from "@/shared/redux/reducers/user.reducer";
import { ERole } from "@/shared/typedefs";

import classes from "./NavigationBar.module.css";
import { INavigationBarProps } from "./NavigationBar.types";

const NavigationBar = ({ open }: INavigationBarProps) => {
  const user = useAppSelector(authenticatedUserSelector);
  const router = useRouter();

  return (
    <Box h={"9vh"} bg={"#011733"} className={classes["navlinks"]}>
      <Text onClick={() => router.push("/dashboard")} sx={{ cursor: "pointer" }}>
        Superteacher
      </Text>
      <Flex justify={"center"} align={"center"} gap={15}>
        <Text className={classes["dashboard"]} onClick={() => router.push("/dashboard")}>
          Dashboard
        </Text>
        {user?.claim === ERole.TEACHER ? (
          <FaPlus style={{ cursor: "pointer" }} onClick={open} />
        ) : null}

        <Menu shadow="xl" offset={-1} withArrow arrowPosition="center" position="bottom-end">
          <Menu.Target>
            <Button variant="outline" c={"white"} sx={{ borderColor: "white" }}>
              {user?.firstName}
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => router.push("/users/profile")}>Profile</Menu.Item>
            <Menu.Item>Logout</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>
    </Box>
  );
};

export default NavigationBar;
