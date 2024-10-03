import { Button, Flex, Modal, PasswordInput, Title } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";

import useResetPasswordForm from "./ResetPasswordForm.hooks";
import { resetPasswordFormSchemaResolver } from "./ResetPasswordForm.schema";
import { useResetPasswordModalStyles } from "./ResetPasswordModal.styles";
import { TResetPasswordFormData, TResetPasswordModalProps } from "./ResetPasswordModal.types";

const ResetPasswordModal = ({ opened, close }: TResetPasswordModalProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TResetPasswordFormData>({
    resolver: resetPasswordFormSchemaResolver,
    mode: "onSubmit",
  });

  const { classes } = useResetPasswordModalStyles();

  const { onSubmit, isLoading } = useResetPasswordForm();

  const handleOnSubmit = (data: TResetPasswordFormData) => {
    onSubmit(data);
    if (!isLoading) {
      reset();
      close();
    }
  };

  const handleCancelButton = () => {
    reset();
    close();
  };

  return (
    <Modal opened={opened} onClose={close} centered>
      <Title order={4} className={classes.titleText}>
        Reset Password
      </Title>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Controller
          name="oldPassword"
          control={control}
          render={({ field }) => (
            <PasswordInput
              {...field}
              label="Old Password"
              placeholder="Enter your previous password"
              error={errors.oldPassword?.message}
              className={classes.input}
              withAsterisk
            />
          )}
        />

        <Controller
          name="newPassword"
          control={control}
          render={({ field }) => (
            <PasswordInput
              {...field}
              label="New Password"
              placeholder="Enter your new password"
              error={errors.newPassword?.message}
              className={classes.input}
              withAsterisk
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <PasswordInput
              {...field}
              label="Confirm New Password"
              placeholder="Confirm new password"
              error={errors.confirmPassword?.message}
              className={classes.input}
              withAsterisk
            />
          )}
        />

        <Flex justify={"end"} align={"center"} gap={12} mb={10}>
          <Button bg={"green"} onClick={handleCancelButton}>
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

export default ResetPasswordModal;
