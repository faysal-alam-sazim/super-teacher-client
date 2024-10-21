import { useState } from "react";

import { Flex, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FaRegPlusSquare, FaRegTrashAlt } from "react-icons/fa";

import { useAppSelector } from "@/shared/redux/hooks";
import { authenticatedUserSelector } from "@/shared/redux/reducers/user.reducer";
import { TStudent } from "@/shared/redux/rtk-apis/users/users.types";
import { ERole } from "@/shared/typedefs";

import EnrollStudentModalForm from "../EnrollStudentModalForm/EnrollStudentModalForm";
import RemoveConfirmationModal from "../RemoveConfirmationModal/RemoveConfirmationModal";
import { IStudentsProps } from "./Students.types";

const Students = ({ students, classroomId }: IStudentsProps) => {
  const { email, claim } = useAppSelector(authenticatedUserSelector);

  const [enrollOpened, { open: openEnrollModal, close: closeEnrollModal }] = useDisclosure(false);
  const [removeOpened, { open: openRemoveModal, close: closeRemoveModal }] = useDisclosure(false);
  const [studentToRemove, setStudentToRemove] = useState<TStudent | null>(null);

  const handleRemoveStudent = (student: TStudent) => {
    setStudentToRemove(student);
    openRemoveModal();
  };

  return (
    <>
      <Flex
        justify={"space-between"}
        align={"center"}
        sx={{ borderBottom: "1px solid", borderBottomColor: "gray" }}
        mt={24}
        mb={12}
        pb={8}
      >
        <Title order={3}>Students</Title>
        {claim === ERole.TEACHER ? (
          <FaRegPlusSquare color="green" onClick={openEnrollModal} style={{ cursor: "pointer" }} />
        ) : null}
      </Flex>
      {students?.length === 0 ? <Text fz={"sm"}>No student is enrolled</Text> : null}
      {students?.map((student) => (
        <Flex key={student.id} justify={"space-between"}>
          <Text fz={"sm"}>
            {student.user?.firstName + " " + student.user?.lastName}{" "}
            <span>{email === student.user?.email ? "(you)" : null}</span>
          </Text>
          <Flex justify={"center"} align={"center"}>
            <Text fz={"sm"} mr={12}>
              {student.user?.email}{" "}
            </Text>
            {claim === ERole.TEACHER ? (
              <FaRegTrashAlt
                color="purple"
                onClick={() => handleRemoveStudent(student)}
                style={{ cursor: "pointer" }}
              />
            ) : null}
          </Flex>
          <RemoveConfirmationModal
            opened={removeOpened}
            close={closeRemoveModal}
            classroomId={Number(classroomId)}
            student={studentToRemove}
            setStudentToRemove={setStudentToRemove}
          />
        </Flex>
      ))}
      <EnrollStudentModalForm
        close={closeEnrollModal}
        opened={enrollOpened}
        classroomId={classroomId}
      />
    </>
  );
};

export default Students;
