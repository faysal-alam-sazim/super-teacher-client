import React from "react";

import { Box, Button, Flex, Text } from "@mantine/core";
import { FaPlus } from "react-icons/fa";

import { useAppSelector } from "@/shared/redux/hooks";
import { authenticatedUserSelector } from "@/shared/redux/reducers/user.reducer";
import { ERole } from "@/shared/typedefs";

import classes from "./NavigationBar.module.css";

const NavigationBar = () => {
  const user = useAppSelector(authenticatedUserSelector);

  return (
    <Box h={"9vh"} bg={"#011733"} className={classes["navlinks"]}>
      <Text>Superteacher</Text>
      <Flex justify={"center"} align={"center"} gap={15}>
        <Text className={classes["dashboard"]}>Dashboard</Text>
        {user?.claim === ERole.TEACHER && <FaPlus />}
        <Button variant="outline" c={"white"} sx={{ borderColor: "white" }}>
          {user?.firstName}
        </Button>
      </Flex>
    </Box>
  );
};

export default NavigationBar;
