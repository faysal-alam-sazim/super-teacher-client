import { Button, Flex, TextInput } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";

import { ERenderFieldType } from "../../containers/ForgetPassword/ForgetPassword.enums";
import { useForgetPasswordStyles } from "../../containers/ForgetPassword/ForgetPassword.styles";
import { verifyEmailFormSchemaResolver } from "./VerifyEmailForm.schema";
import { TVerifyEmailForm, TVerifyEmailFormProps } from "./VerifyEmailForm.types";

const VerifyEmailForm = ({ close, setRenderingType }: TVerifyEmailFormProps) => {
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

  const handleOnSubmit = (data: TVerifyEmailForm) => {
    // Add api call method
    console.log(data);
    setRenderingType(ERenderFieldType.OTP);
  };

  const handleCancelButton = () => {
    setValue("email", "");
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
        <Button bg={"green"} type="submit">
          Submit
        </Button>
      </Flex>
    </form>
  );
};

export default VerifyEmailForm;
