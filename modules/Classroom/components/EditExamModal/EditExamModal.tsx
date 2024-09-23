import { Button, Flex, Modal, Textarea, TextInput, Title } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { Controller, useForm } from "react-hook-form";

import useEditExamForm from "../../hooks/useEditExamForm";
import { editExamSchemaResolver } from "./EditExamForm.schema";
import { useEditExamModalStyles } from "./EditExamModal.styles";
import { TEditExamFormData, TEditExamModalProps } from "./EditExamModal.types";

const EditExamModal = ({ opened, close, classroomId, exam }: TEditExamModalProps) => {
  const { classes } = useEditExamModalStyles();
  const { onSubmit, isLoading } = useEditExamForm(classroomId);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TEditExamFormData>({
    resolver: editExamSchemaResolver,
    mode: "onSubmit",
  });

  const handleOnSubmit = (data: TEditExamFormData) => {
    onSubmit(data, exam.id);
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
              defaultValue={exam.title}
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
              defaultValue={exam.instruction}
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
              defaultValue={new Date(exam.date)}
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
                Update
              </Button>
            </Flex>
          </Flex>
        </form>
      </Modal>
    </>
  );
};

export default EditExamModal;
