import { Button, Flex, Modal, MultiSelect, Select, TextInput, Title } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";

import { SUBJECTS } from "@/modules/Register/components/TeacherRegistrationForm/TeacherRegistrationForm.constants";

import useEditClassroomForm from "../../hooks/useEditClassroomForm";
import { editClassroomSchemaResolver } from "./EditClassroomForm.schema";
import { TEditClassroomFormData, TEditClassroomModalProps } from "./EditClassroomModal.types";

const EditClassroomModal = ({ opened, close, classroom }: TEditClassroomModalProps) => {
  const { control, handleSubmit, reset } = useForm<TEditClassroomFormData>({
    resolver: editClassroomSchemaResolver,
    mode: "onSubmit",
    defaultValues: {
      title: classroom.title,
      subject: classroom.subject,
      classTime: dayjs(classroom.classTime).format("HH:mm"),
      days: classroom.days,
    },
  });

  const { onSubmit, isLoading } = useEditClassroomForm(classroom.id);

  const handleOnSubmit = (data: TEditClassroomFormData) => {
    onSubmit(data);

    if (!isLoading) {
      close();
    }
  };

  return (
    <Modal opened={opened} onClose={close}>
      <Title c={"green"} tt={"uppercase"} size={"lg"} mb={12}>
        Edit Classroom
      </Title>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Flex direction={"column"} gap={14}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                label="Title"
                placeholder="Enter classroom title"
                styles={{ label: { color: "green" } }}
              />
            )}
          />
          <Controller
            name="subject"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Subject"
                placeholder="Enter subject"
                data={SUBJECTS}
                styles={{ label: { color: "green" } }}
              />
            )}
          />
          <Controller
            name="classTime"
            control={control}
            render={({ field }) => (
              <TimeInput
                {...field}
                label="Class Time"
                placeholder="Select class time"
                value={field.value}
                styles={{ label: { color: "green" } }}
              />
            )}
          />
          <Controller
            name="days"
            control={control}
            render={({ field }) => (
              <MultiSelect
                {...field}
                label="Days"
                placeholder="Select days"
                styles={{ label: { color: "green" } }}
                data={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]}
              />
            )}
          />
          <Flex justify={"end"} align={"center"} gap={12} mb={10}>
            <Button bg={"green"} onClick={() => reset()}>
              Cancel
            </Button>
            <Button loading={isLoading} bg={"green"} type="submit">
              Save
            </Button>
          </Flex>
        </Flex>
      </form>
    </Modal>
  );
};

export default EditClassroomModal;
