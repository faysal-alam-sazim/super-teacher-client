import { useState } from "react";

import { Modal, Title } from "@mantine/core";

import UpdatePasswordForm from "../../components/UpdatePasswordForm/UpdatePasswordForm";
import VerifyEmailForm from "../../components/VerifyEmailForm/VerifyEmailForm";
import VerifyOtpForm from "../../components/VerifyOtpForm/VerifyOtpForm";
import { ERenderFieldType } from "./ForgetPassword.enums";
import { useForgetPasswordStyles } from "./ForgetPassword.styles";
import { TForgetPasswordProps } from "./ForgetPassword.types";

const ForgetPassword = ({ opened, close }: TForgetPasswordProps) => {
  const { classes } = useForgetPasswordStyles();
  const [renderingField, setRenderingType] = useState(ERenderFieldType.EMAIL);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  return (
    <Modal opened={opened} onClose={close} centered>
      <Title className={classes.titleText} order={4}>
        Forget Password
      </Title>
      {renderingField === ERenderFieldType.EMAIL ? (
        <VerifyEmailForm close={close} setRenderingType={setRenderingType} setEmail={setEmail} />
      ) : null}
      {renderingField === ERenderFieldType.OTP ? (
        <VerifyOtpForm setRenderingType={setRenderingType} setOtp={setOtp} email={email} />
      ) : null}
      {renderingField === ERenderFieldType.PASSWORD ? (
        <UpdatePasswordForm
          close={close}
          setRenderingType={setRenderingType}
          email={email}
          otp={otp}
        />
      ) : null}
    </Modal>
  );
};

export default ForgetPassword;
