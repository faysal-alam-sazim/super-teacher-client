import { createStyles } from "@mantine/core";

export const useEditAssignmentModalStyles = createStyles((theme) => ({
  titleText: {
    textTransform: "uppercase",
    color: theme.colors.green[6],
  },
  input: {
    label: {
      color: theme.colors.green[6],
    },
  },
  fileInput: {
    display: "none",
  },
}));
