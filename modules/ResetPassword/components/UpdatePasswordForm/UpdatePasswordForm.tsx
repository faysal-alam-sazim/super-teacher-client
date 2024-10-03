import { Button, Flex, PasswordInput } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";

import { ERenderFieldType } from "../../containers/ForgetPassword/ForgetPassword.enums";
import { useForgetPasswordStyles } from "../../containers/ForgetPassword/ForgetPassword.styles";
import useUpdatePasswordForm from "./UpdatePasswordForm.hooks";
import { updatePasswordFormSchemaResolver } from "./UpdatePasswordForm.schema";
import { TUpdatePasswordFormData, TUpdatePasswordFormProps } from "./UpdatePasswordForm.types";

const UpdatePasswordForm = ({ close, setRenderingType, email, otp }: TUpdatePasswordFormProps) => {
  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<TUpdatePasswordFormData>({
    mode: "onSubmit",
    resolver: updatePasswordFormSchemaResolver,
  });

  const { classes } = useForgetPasswordStyles();

  const { onSubmit, isLoading } = useUpdatePasswordForm();

  const handleOnSubmit = (data: TUpdatePasswordFormData) => {
    onSubmit(data, email, otp);
    if (!isLoading) {
      close();
      setRenderingType(ERenderFieldType.EMAIL);
    }
  };

  const handleCancelButton = () => {
    reset();
    close();
    setRenderingType(ERenderFieldType.EMAIL);
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <Controller
        name="newPassword"
        control={control}
        render={({ field }) => (
          <PasswordInput
            {...field}
            label="New Password"
            placeholder="Enter your password"
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
            label="Confirm Password"
            placeholder="Confirm password"
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
  );
};

export default UpdatePasswordForm;
