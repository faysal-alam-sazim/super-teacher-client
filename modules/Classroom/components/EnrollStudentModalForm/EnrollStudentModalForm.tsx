import React, { useState } from "react";

import { Button, Flex, Modal, Title, Select } from "@mantine/core";

import useEnrollmentApiCall from "../../hooks/useEnrollmentApiCall";
import useGetStudentsToEnroll from "../../hooks/useGetStudentsToEnroll";
import { TEnrollStudentModalFormProps } from "./EnrollStudentForm.types";

const EnrollStudentModalForm = ({ opened, close, classroomId }: TEnrollStudentModalFormProps) => {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  const { students } = useGetStudentsToEnroll(classroomId);
  const { addStudent } = useEnrollmentApiCall();

  const handleSubmit = () => {
    if (selectedStudent) {
      addStudent(Number(classroomId), Number(selectedStudent));
      close();
    }
  };

  return (
    <Modal opened={opened} onClose={close} centered>
      <Title sx={{ color: "green" }} tt="uppercase" size="lg" mb={24}>
        Enroll a Student
      </Title>
      <Select
        name="student"
        label="Type a name"
        placeholder="Pick student"
        data={students}
        value={selectedStudent}
        onChange={setSelectedStudent}
        styles={{ label: { color: "green" } }}
        dropdownPosition="bottom"
        withinPortal
        required
      />

      <Flex justify="end" align="center" gap={12} mt={48}>
        <Button variant="outline" onClick={close}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="filled"
          sx={{ backgroundColor: "green" }}
          onClick={handleSubmit}
        >
          Create
        </Button>
      </Flex>
    </Modal>
  );
};

export default EnrollStudentModalForm;
