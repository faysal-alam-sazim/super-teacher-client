import { createStyles } from "@mantine/core";

export const useDeleteConfirmationModalStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyItems: "center",
    alignItems: "center",
  },

  title: {
    textAlign: "center",
    textTransform: "uppercase",
    color: theme.colors.green[9],
    marginBottom: 12,
  },

  buttonsContianer: {
    display: "flex",
    justifyItems: "end",
    alignItems: "center",
    gap: 20,
    marginTop: 24,
    marginBottom: 12,
  },

  noButton: {
    background: theme.colors.red[9],
    "&:hover": {
      background: theme.colors.red[7],
    },
  },

  yesButton: {
    background: theme.colors.green[7],
    "&:hover": {
      background: theme.colors.green[5],
    },
  },
}));
