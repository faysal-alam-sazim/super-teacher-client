import React, { useRef, useState } from "react";

import { Button, Flex, Modal, Textarea, TextInput, Title } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";

import useAddResourcesForm from "../../hooks/useAddResourcesForm";
import { addResourceSchemaResolver } from "./AddResourceForm.schema";
import { useAddResourceModal } from "./AddResourceModal.styles";
import { TAddResourceFormData, TAddResourceModalProps } from "./AddResourceModal.types";

const AddResourceModal = ({ opened, close, classroomId }: TAddResourceModalProps) => {
  const { classes } = useAddResourceModal();
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { onSubmit, isLoading } = useAddResourcesForm(classroomId);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TAddResourceFormData>({
    resolver: addResourceSchemaResolver,
    mode: "onSubmit",
  });

  const handleOnSubmit = (data: TAddResourceFormData) => {
    onSubmit(data);
    if (!isLoading) {
      close();
    }
  };

  return (
    <Modal opened={opened} onClose={close} centered>
      <Title className={classes.titleText} order={4}>
        Upload Material
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
            <Button loading={isLoading} bg={"green"} onClick={() => reset()}>
              Cancel
            </Button>
            <Button bg={"green"} type="submit">
              Upload
            </Button>
          </Flex>
        </Flex>
      </form>
    </Modal>
  );
};

export default AddResourceModal;
