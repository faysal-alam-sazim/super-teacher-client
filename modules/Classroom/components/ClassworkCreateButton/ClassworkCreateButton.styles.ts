import { createStyles } from "@mantine/core";

export const useCreateButtonStyles = createStyles((theme, opened: boolean) => ({
  buttonsContainer: {
    display: "flex",
    gap: 12,
    [theme.fn.smallerThan("md")]: {
      flexDirection: "column",
    },
    maxWidth: "fit-content",
  },
  createButton: {
    marginRight: 12,
    backgroundColor: opened ? "inherit" : theme.colors.green[6],
    color: opened ? theme.colors.green[6] : "white",
    border: "1px solid green",
    "&:hover": {
      backgroundColor: theme.colors.green[8],
    },
    [theme.fn.smallerThan("md")]: {
      marginRight: 0,
      marginBottom: 12,
    },
  },
  classworkButton: {
    display: opened ? "block" : "none",
    backgroundColor: theme.colors.green[6],
    "&:hover": {
      backgroundColor: theme.colors.green[8],
    },
  },
}));
