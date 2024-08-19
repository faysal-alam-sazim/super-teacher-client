import React from "react";

import { Button } from "@mantine/core";

import { useSubmitButtonStyle } from "./SubmitButton.style";

const SubmitButton = () => {
  const { classes } = useSubmitButtonStyle();
  return (
    <Button type="submit" className={classes.submitButton}>
      Submit
    </Button>
  );
};

export default SubmitButton;
