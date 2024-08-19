import { createStyles } from "@mantine/core";

export const useSubmitButtonStyle = createStyles((theme) => ({
  submitButton: {
    background: "none",
    backgroundColor: theme.colors.green[5],

    "&:hover": {
      backgroundColor: theme.colors.gray[6],
    },
  },
}));
