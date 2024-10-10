import { Button, Flex, TextInput } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";

import { ERenderFieldType } from "../../containers/ForgetPassword/ForgetPassword.enums";
import { useForgetPasswordStyles } from "../../containers/ForgetPassword/ForgetPassword.styles";
import useVerifyOtpForm from "./VerifyOtpForm.hooks";
import { verifyOtpSchemaResolver } from "./VerifyOtpForm.schema";
import { TVerifyOtpForm, TVerifyOtpFormProps } from "./VerifyOtpForm.types";

const VerifyOtpForm = ({ setRenderingType, email, setOtp }: TVerifyOtpFormProps) => {
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

  const { onSubmit, isLoading } = useVerifyOtpForm();

  const handleOnSubmit = (data: TVerifyOtpForm) => {
    onSubmit(data, email);

    setOtp(data.otp);

    if (!isLoading) {
      setRenderingType(ERenderFieldType.PASSWORD);
    }
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
        <Button loading={isLoading} bg={"green"} type="submit">
          Submit
        </Button>
      </Flex>
    </form>
  );
};

export default VerifyOtpForm;
