import React from "react";

import { Anchor, Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import ChooseRole from "@/modules/HomePage/components/ChooseRole/ChooseRole";
import ForgetPassword from "@/modules/ResetPassword/containers/ForgetPassword/ForgetPassword";

import LoginForm from "../components/LoginForm";
import { useLoginContainerStyles } from "./LoginContainer.styles";

const LoginContainer = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { classes } = useLoginContainerStyles();

  const [
    forgetPasswordModalOpenend,
    { open: openForgetPasswordModal, close: closeForgetPasswordModal },
  ] = useDisclosure(false);

  return (
    <>
      <Flex justify={"center"} align={"center"} mih={"100vh"} direction={"column"}>
        <LoginForm />
        <Text className={classes.text} onClick={openForgetPasswordModal}>
          Forgot Password?
        </Text>

        <Text fw={400} c="green" ta="center" size="md" mt="xl">
          Don&apos;t have an account?{" "}
          <Anchor c="white" onClick={open}>
            Register
          </Anchor>
        </Text>
      </Flex>
      <ForgetPassword opened={forgetPasswordModalOpenend} close={closeForgetPasswordModal} />
      <ChooseRole opened={opened} close={close} />
    </>
  );
};

export default LoginContainer;
