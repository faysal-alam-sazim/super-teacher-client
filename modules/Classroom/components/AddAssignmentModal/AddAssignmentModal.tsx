import { useRef, useState } from "react";

import { Button, Flex, Modal, Textarea, TextInput, Title } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { Controller, useForm } from "react-hook-form";

import useAddAssignmentForm from "../../hooks/useAddAssignmentForm";
import { addAssignmentSchemaResolver } from "./AddAssignmentForm.schema";
import { useAddAssignmentModalStyles } from "./AddAssignmentModal.styles";
import { TAddAssignmentFromData, TAddAssignmentModalProps } from "./AddAssignmentModal.types";

const AddAssignmnetModal = ({ opened, close, classroomId }: TAddAssignmentModalProps) => {
  const { classes } = useAddAssignmentModalStyles();
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { onSubmit, isLoading } = useAddAssignmentForm(classroomId);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TAddAssignmentFromData>({
    resolver: addAssignmentSchemaResolver,
    mode: "onSubmit",
  });

  const handleOnSubmit = (data: TAddAssignmentFromData) => {
    onSubmit(data);
    if (!isLoading) {
      close();
    }
  };

  return (
    <Modal opened={opened} onClose={close} centered>
      <Title className={classes.titleText} order={4}>
        Create Assignment
      </Title>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Flex direction={"column"} gap={30} mt={12}>
          <Controller
            name="title"
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
                  value={fileName}
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
            <Button bg={"green"} onClick={() => reset()}>
              Cancel
            </Button>
            <Button loading={isLoading} bg={"green"} type="submit">
              Create
            </Button>
          </Flex>
        </Flex>
      </form>
    </Modal>
  );
};

export default AddAssignmnetModal;
