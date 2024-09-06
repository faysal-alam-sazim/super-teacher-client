import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { Tabs, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";

import NavigationBar from "@/modules/components/Navbar/NavigationBar";
import ClassroomCreatingModal from "@/modules/UserDashboard/components/ClassroomCreatingModal/ClassroomCreatingModal";
import { NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS } from "@/shared/constants/app.constants";
import {
  useGetClassroomByIdQuery,
  useGetEnrolledStudentsQuery,
} from "@/shared/redux/rtk-apis/classrooms/classrooms.api";
import { TClassroom } from "@/shared/redux/rtk-apis/classrooms/classrooms.types";
import { TStudent } from "@/shared/redux/rtk-apis/users/users.types";

import Students from "../../components/Students/Students";
import Teacher from "../../components/Teacher/Teacher";

const ClassroomDetailsContainer = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();

  const [classroom, setClassroom] = useState<TClassroom | undefined>();
  const [enrolledStudents, setEnrolledStudents] = useState<TStudent[] | undefined>([]);

  const classroomId = router.query["id"];

  const { data: fetchedClassroom, isError: isClassroomFetchError } = useGetClassroomByIdQuery(
    classroomId as string,
  );
  const { data: fetchedEnrolledStudents, isError: isEnrolledStudentFetchError } =
    useGetEnrolledStudentsQuery(classroomId as string);

  useEffect(() => {
    if (isClassroomFetchError || isEnrolledStudentFetchError) {
      showNotification({
        title: "Error",
        message: "Error Fetching Data!",
        autoClose: NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS,
        color: "red",
      });
    } else {
      setClassroom(fetchedClassroom);
      setEnrolledStudents(fetchedEnrolledStudents);
    }
  }, [
    fetchedClassroom,
    fetchedEnrolledStudents,
    isClassroomFetchError,
    isEnrolledStudentFetchError,
  ]);

  return (
    <>
      <NavigationBar open={open} />
      <ClassroomCreatingModal opened={opened} close={close} />
      <Tabs defaultValue={"stream"} mx={"auto"} maw={"90%"} mt={12}>
        <Tabs.List grow>
          <Tabs.Tab
            value="stream"
            color="green"
            sx={{ ":hover": { backgroundColor: "transparent" } }}
          >
            <Title order={6} color="white">
              Stream
            </Title>
          </Tabs.Tab>
          <Tabs.Tab
            value="classwork"
            color="green"
            sx={{ ":hover": { backgroundColor: "transparent" } }}
          >
            <Title order={6} color="white">
              Classwork
            </Title>
          </Tabs.Tab>
          <Tabs.Tab
            value="people"
            color="green"
            sx={{ ":hover": { backgroundColor: "transparent" } }}
          >
            <Title order={6} color="white">
              People
            </Title>
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="people">
          <Teacher teacher={classroom?.teacher} />
          <Students students={enrolledStudents} />
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

export default ClassroomDetailsContainer;
