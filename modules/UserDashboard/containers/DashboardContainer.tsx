import React from "react";

import { useDisclosure } from "@mantine/hooks";

import NavigationBar from "@/modules/components/Navbar/NavigationBar";

import ClassroomContainer from "./ClassroomContainer/ClassroomContainer";
import ClassroomCreatingModal from "../components/ClassroomCreatingModal/ClassroomCreatingModal";

const DashboardContainer = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <NavigationBar open={open} />
      <ClassroomContainer open={open} />
      <ClassroomCreatingModal opened={opened} close={close} />
    </>
  );
};

export default DashboardContainer;
