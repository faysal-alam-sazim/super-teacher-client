import { useRef, useState } from "react";

import { Button, Flex, Modal, TextInput, Title } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";

import useAddAssignmentSubmissionForm from "../../hooks/useAddAssignmentSubmissionForm";
import { useSubmitAssignmentStyles } from "./AddAssignmentSubmission.styles";
import { submitAssignmentSchemaResolver } from "./AddAssignmentSubmissionForm.schema";
import {
  TAssignmentSubmissionFormData,
  TAssignmentSubmissionsModalProps,
} from "./AddAssignmentSubmissionModal.types";

const AddAssignmentSubmissionModal = ({
  opened,
  close,
  classroomId,
  assignmentId,
}: TAssignmentSubmissionsModalProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TAssignmentSubmissionFormData>({
    resolver: submitAssignmentSchemaResolver,
    mode: "onSubmit",
  });

  const { classes } = useSubmitAssignmentStyles();

  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { onSubmit, isLoading } = useAddAssignmentSubmissionForm(classroomId);

  const handleOnSubmit = (data: TAssignmentSubmissionFormData) => {
    onSubmit(data, assignmentId);
    if (!isLoading) {
      close();
    }
  };

  return (
    <Modal opened={opened} onClose={close} centered>
      <Title className={classes.titleText} order={4}>
        Submit Assignment
      </Title>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
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
                error={errors.uploadFile?.message}
              />
            </>
          )}
        />
        <Flex justify={"end"} align={"center"} gap={12} mb={10}>
          <Button bg={"green"} onClick={() => reset()}>
            Cancel
          </Button>
          <Button loading={isLoading} bg={"green"} type="submit">
            Submit
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export default AddAssignmentSubmissionModal;
