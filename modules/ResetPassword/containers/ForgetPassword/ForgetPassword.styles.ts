import { createStyles } from "@mantine/core";

export const useForgetPasswordStyles = createStyles((theme) => ({
  titleText: {
    textTransform: "uppercase",
    color: theme.colors.green[6],
    marginBottom: 20,
  },
  input: {
    label: {
      color: theme.colors.green[6],
    },
    marginBottom: 16,
  },
}));
