import React from "react";

import { Button, Flex, Modal, MultiSelect, Select, TextInput, Title } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { Controller, useForm } from "react-hook-form";

import { SUBJECTS } from "@/modules/Register/components/TeacherRegistrationForm/TeacherRegistrationForm.constants";

import useClassroomCreation from "../../hooks/useClassroomCreation";
import { createClassroomFormResolver } from "./ClassroomCreatingForm.schema";
import {
  ICreateClassroomModalProps,
  TCreateClassroomFormData,
} from "./ClassroomCreatingModal.types";

const ClassroomCreatingModal = ({ opened, close }: ICreateClassroomModalProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TCreateClassroomFormData>({
    resolver: createClassroomFormResolver,
    mode: "onSubmit",
  });

  const { onSubmit, isLoading } = useClassroomCreation();

  const handleCancelBtn = () => {
    reset();
    close();
  };

  const handleSubmitBtn = async (data: TCreateClassroomFormData) => {
    await onSubmit(data);
    if (!isLoading) {
      close();
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={close} centered>
        <Title c={"green"} tt={"uppercase"} size={"lg"} mb={12}>
          Create a classroom
        </Title>
        <form onSubmit={handleSubmit(handleSubmitBtn)}>
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
                  required
                  error={errors.title?.message}
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
                  required
                  error={errors.subject?.message}
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
                  styles={{ label: { color: "green" } }}
                  required
                  error={errors.classTime?.message}
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
                  required
                  error={errors.days?.message}
                />
              )}
            />
            <Flex justify={"end"} align={"center"} gap={12} mb={10}>
              <Button bg={"green"} onClick={handleCancelBtn}>
                Cancel
              </Button>
              <Button bg={"green"} type="submit" loading={isLoading}>
                Create
              </Button>
            </Flex>
          </Flex>
        </form>
      </Modal>
    </>
  );
};

export default ClassroomCreatingModal;
