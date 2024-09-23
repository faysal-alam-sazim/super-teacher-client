import { useRef, useState } from "react";

import { Button, Flex, Modal, Textarea, TextInput, Title } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { Controller, useForm } from "react-hook-form";

import useEditAssignmentFrom from "../../hooks/useEditAssignmentFrom";
import { editAssignmentSchemaResolver } from "./EditAssignmentForm.schema";
import { useEditAssignmentModalStyles } from "./EditAssignmentModal.styles";
import { TEditAssignmentFromData, TEditAssignmentModalProps } from "./EditAssignmentModal.types";

const EditAssignmnetModal = ({
  opened,
  close,
  classroomId,
  assignment,
}: TEditAssignmentModalProps) => {
  const { classes } = useEditAssignmentModalStyles();
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const prevFileName = assignment.fileUrl.split("project-dev-bucket/")[1];

  const { onSubmit, isLoading } = useEditAssignmentFrom(classroomId);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TEditAssignmentFromData>({
    resolver: editAssignmentSchemaResolver,
    mode: "onSubmit",
  });

  const handleOnSubmit = (data: TEditAssignmentFromData) => {
    onSubmit(data, assignment.id);
    if (!isLoading) {
      close();
    }
  };

  const handleCancelButton = () => {
    reset();
    close();
  };

  return (
    <Modal opened={opened} onClose={close} centered>
      <Title className={classes.titleText} order={4}>
        Update Assignment
      </Title>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Flex direction={"column"} gap={30} mt={12}>
          <Controller
            name="title"
            defaultValue={assignment.title}
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                label="Title"
                placeholder="Enter a title"
                className={classes.input}
                error={errors.title?.message}
              />
            )}
          />

          <Controller
            name="description"
            defaultValue={assignment.description}
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                label="Description"
                placeholder="Enter a description"
                className={classes.input}
                error={errors.description?.message}
              />
            )}
          />

          <Controller
            name="dueDate"
            defaultValue={new Date(assignment.dueDate)}
            control={control}
            render={({ field }) => (
              <DateInput
                {...field}
                label="Date"
                placeholder="Select a date"
                className={classes.input}
                error={errors.dueDate?.message}
              />
            )}
          />

          <Controller
            name="uploadFile"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="file"
                  ref={fileInputRef}
                  className={classes.fileInput}
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    setFileName(file ? file.name : "");
                    field.onChange(file);
                  }}
                />
                <TextInput
                  value={fileName || prevFileName}
                  label="Upload file"
                  placeholder="Upload file"
                  readOnly
                  onClick={() => fileInputRef.current?.click()}
                  className={classes.input}
                />
              </>
            )}
          />

          <Flex justify={"end"} align={"center"} gap={12} mb={10}>
            <Button bg={"green"} onClick={handleCancelButton}>
              Cancel
            </Button>
            <Button loading={isLoading} bg={"green"} type="submit">
              Update
            </Button>
          </Flex>
        </Flex>
      </form>
    </Modal>
  );
};

export default EditAssignmnetModal;
