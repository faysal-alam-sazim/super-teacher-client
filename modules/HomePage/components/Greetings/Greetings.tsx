import React from "react";

import { Box, Button, Flex, Text, Title } from "@mantine/core";

import { TGreetingsProps } from "./Greetings.types";

const Greetings = ({ open }: TGreetingsProps) => (
  <Flex justify={"center"} align={"center"} h={"100vh"}>
    <Box w={"70%"} h={"20%"} ta={"center"}>
      <Title tt={"uppercase"} mb={"sm"}>
        Welcome to Superteacher
      </Title>
      <Text mb={"40px"}>Where learning and teaching come together!</Text>
      <Flex justify={"center"} align={"center"} gap={"md"}>
        <Button onClick={open} variant="outline" color="green">
          Register
        </Button>
        <Button variant="outline" color="green">
          Login
        </Button>
      </Flex>
    </Box>
  </Flex>
);

export default Greetings;
