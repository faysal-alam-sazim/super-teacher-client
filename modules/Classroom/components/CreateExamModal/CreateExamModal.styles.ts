import { createStyles } from "@mantine/core";

export const useExamModalStyles = createStyles((theme) => ({
  titleText: {
    textTransform: "uppercase",
    color: theme.colors.green[6],
  },
  input: {
    label: {
      color: theme.colors.green[6],
    },
  },
}));
