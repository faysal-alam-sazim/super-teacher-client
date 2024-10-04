import { createStyles } from "@mantine/core";

export const useUserProfileContainerStyles = createStyles((theme) => ({
  title: {
    color: theme.colors.green[7],
    marginTop: 32,
    marginBottom: 32,
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    gap: 16,
  },

  button: {
    color: theme.colors.green[7],
    borderColor: theme.colors.green[9],
  },
}));
