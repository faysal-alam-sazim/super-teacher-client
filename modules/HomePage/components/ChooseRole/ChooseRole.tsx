import { Box, Flex, Modal, Text, Title } from "@mantine/core";
import { LuGraduationCap } from "react-icons/lu";
import { TbBooks } from "react-icons/tb";

import classes from "./ChooseRole.module.css";
import { TChooseRoleProps } from "./ChooseRole.types";

const ChooseRole = ({ opened, close }: TChooseRoleProps) => (
  <>
    <Modal opened={opened} onClose={close} centered>
      <Title ta={"center"} mb={"lg"}>
        Choose your role
      </Title>
      <Flex gap={4}>
        <Box className={classes["role"]}>
          <TbBooks />
          <Text fw={"bold"}>Student</Text>
        </Box>
        <Box className={classes["role"]}>
          <LuGraduationCap />
          <Text fw={"bold"}>Teacher</Text>
        </Box>
      </Flex>
    </Modal>
  </>
);

export default ChooseRole;
