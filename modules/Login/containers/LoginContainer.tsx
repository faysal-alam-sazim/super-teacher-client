import React from "react";

import { Anchor, Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import ChooseRole from "@/modules/HomePage/components/ChooseRole/ChooseRole";

import LoginForm from "../components/LoginForm";

const LoginContainer = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Flex justify={"center"} align={"center"} mih={"100vh"} direction={"column"}>
        <LoginForm />
        <Text fw={400} ta="center" my="xs" size="md" c="green">
          Forgot Password?
        </Text>

        <Text fw={400} c="green" ta="center" size="md" mt="xl">
          Don&apos;t have an account?{" "}
          <Anchor c="white" onClick={open}>
            Register
          </Anchor>
        </Text>
      </Flex>

      <ChooseRole opened={opened} close={close} />
    </>
  );
};

export default LoginContainer;
