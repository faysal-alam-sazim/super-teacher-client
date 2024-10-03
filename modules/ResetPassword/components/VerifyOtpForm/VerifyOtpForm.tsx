import { Button, Flex, TextInput } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";

import { ERenderFieldType } from "../../containers/ForgetPassword/ForgetPassword.enums";
import { useForgetPasswordStyles } from "../../containers/ForgetPassword/ForgetPassword.styles";
import { verifyOtpSchemaResolver } from "./VerifyOtpForm.schema";
import { TVerifyOtpForm, TVerifyOtpFormProps } from "./VerifyOtpForm.types";

const VerifyOtpForm = ({ setRenderingType }: TVerifyOtpFormProps) => {
  const {
    control,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<TVerifyOtpForm>({
    mode: "onSubmit",
    resolver: verifyOtpSchemaResolver,
  });

  const { classes } = useForgetPasswordStyles();

  const handleOnSubmit = (data: TVerifyOtpForm) => {
    // Add api call method
    console.log(data);
    setRenderingType(ERenderFieldType.PASSWORD);
  };

  const handleBackButton = () => {
    setValue("otp", "");
    setRenderingType(ERenderFieldType.EMAIL);
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <Controller
        name="otp"
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            label="OTP"
            placeholder="Enter the otp"
            error={errors.otp?.message}
            withAsterisk
            className={classes.input}
          />
        )}
      />
      <Flex justify={"end"} align={"center"} gap={12} mb={10}>
        <Button bg={"green"} onClick={handleBackButton}>
          Back
        </Button>
        <Button bg={"green"} type="submit">
          Submit
        </Button>
      </Flex>
    </form>
  );
};

export default VerifyOtpForm;
