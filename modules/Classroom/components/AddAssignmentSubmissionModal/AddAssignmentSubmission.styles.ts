import { createStyles } from "@mantine/core";

export const useSubmitAssignmentStyles = createStyles((theme) => ({
  titleText: {
    textTransform: "uppercase",
    color: theme.colors.green[6],
    marginBottom: 16,
  },
  input: {
    label: {
      color: theme.colors.green[6],
    },
    marginBottom: 16,
  },
  fileInput: {
    display: "none",
  },
}));
