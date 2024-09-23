import { Button, Flex, Modal, Textarea, TextInput, Title } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { Controller, useForm } from "react-hook-form";

import useCreateExamForm from "../../hooks/useCreateExamForm";
import { createExamSchemaResolver } from "./CreateExamForm.schema";
import { useExamModalStyles } from "./CreateExamModal.styles";
import { TCreateExamModalProps, TCreateExamFormData } from "./CreateExamModal.types";

const CreateExamModal = ({ opened, close, classroomId }: TCreateExamModalProps) => {
  const { classes } = useExamModalStyles();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TCreateExamFormData>({
    resolver: createExamSchemaResolver,
    mode: "onSubmit",
  });

  const { onSubmit, isLoading } = useCreateExamForm(classroomId);

  const handleOnSubmit = (data: TCreateExamFormData) => {
    onSubmit(data);
    if (!isLoading) {
      close();
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={close} centered>
        <Title className={classes.titleText} order={4}>
          Schedule Exam
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
              name="instruction"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Instructions"
                  placeholder="Enter instructions"
                  className={classes.input}
                  error={errors.instruction?.message}
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

            <Flex justify={"end"} align={"center"} gap={12} mb={10}>
              <Button bg={"green"} onClick={() => reset()}>
                Cancel
              </Button>
              <Button loading={isLoading} bg={"green"} type="submit">
                Schedule
              </Button>
            </Flex>
          </Flex>
        </form>
      </Modal>
    </>
  );
};

export default CreateExamModal;
