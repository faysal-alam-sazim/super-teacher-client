import React, { useRef, useState } from "react";

import { Button, Flex, Modal, Textarea, TextInput, Title } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";

import useEditResourceForm from "../../hooks/useEditResourceForm";
import { editResourceSchemaResolver } from "./EditResourceForm.schema";
import { useEditResourceModalStyles } from "./EditResourceModal.styles";
import { TEditResourceFormData, TEditResourceModalProps } from "./EditResourceModal.types";

const EditResourceModal = ({ opened, close, classroomId, resource }: TEditResourceModalProps) => {
  const { classes } = useEditResourceModalStyles();
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { onSubmit, isLoading } = useEditResourceForm(classroomId);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TEditResourceFormData>({
    resolver: editResourceSchemaResolver,
    mode: "onSubmit",
    resetOptions: {
      keepDefaultValues: false,
    },
  });

  const handleOnSubmit = (data: TEditResourceFormData) => {
    onSubmit(data, resource.id);
    if (!isLoading) {
      close();
    }
  };

  const prevFileName = resource.fileUrl.split("project-dev-bucket/")[1];

  const handleCancelButton = () => {
    reset();
    close();
  };

  return (
    <Modal opened={opened} onClose={close} centered>
      <Title className={classes.titleText} order={4}>
        Update Material
      </Title>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Flex direction={"column"} gap={30} mt={12}>
          <Controller
            name="title"
            defaultValue={resource.title}
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
            defaultValue={resource.description}
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

export default EditResourceModal;
