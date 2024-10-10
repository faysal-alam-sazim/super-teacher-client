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

  return (
    <Modal opened={opened} onClose={close} centered>
      <Title className={classes.titleText} order={4}>
        Forget Password
      </Title>
      {renderingField === ERenderFieldType.EMAIL ? (
        <VerifyEmailForm close={close} setRenderingType={setRenderingType} />
      ) : null}
      {renderingField === ERenderFieldType.OTP ? (
        <VerifyOtpForm setRenderingType={setRenderingType} />
      ) : null}
      {renderingField === ERenderFieldType.PASSWORD ? (
        <UpdatePasswordForm close={close} setRenderingType={setRenderingType} />
      ) : null}
    </Modal>
  );
};

export default ForgetPassword;
