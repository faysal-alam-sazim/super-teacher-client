import { Button, Flex, TextInput } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";

import { ERenderFieldType } from "../../containers/ForgetPassword/ForgetPassword.enums";
import { useForgetPasswordStyles } from "../../containers/ForgetPassword/ForgetPassword.styles";
import useVerifyEmailForm from "./VerifyEmailForm.hooks";
import { verifyEmailFormSchemaResolver } from "./VerifyEmailForm.schema";
import { TVerifyEmailForm, TVerifyEmailFormProps } from "./VerifyEmailForm.types";

const VerifyEmailForm = ({ close, setRenderingType, setEmail }: TVerifyEmailFormProps) => {
  const {
    control,
    setValue,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<TVerifyEmailForm>({
    mode: "onSubmit",
    resolver: verifyEmailFormSchemaResolver,
  });

  const { classes } = useForgetPasswordStyles();
  const { onSubmit, isLoading } = useVerifyEmailForm();

  const handleOnSubmit = (data: TVerifyEmailForm) => {
    onSubmit(data);
    if (!isLoading) {
      setEmail(data.email);
      setRenderingType(ERenderFieldType.OTP);
    }
  };

  const handleCancelButton = () => {
    setValue("email", "");
    setEmail("");
    reset();
    close();
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            label="Email"
            placeholder="Enter your email"
            error={errors.email?.message}
            withAsterisk
            className={classes.input}
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

export default VerifyEmailForm;
