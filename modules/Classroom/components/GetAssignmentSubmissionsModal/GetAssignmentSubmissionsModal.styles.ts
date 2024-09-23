import { createStyles } from "@mantine/core";

export const useSubmissionsStyle = createStyles((theme) => ({
  titleText: {
    textTransform: "uppercase",
    color: theme.colors.green[6],
  },

  submissionsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginTop: 20,
    marginBottom: 24,
  },

  badge: {
    background: theme.colors.red[4],
    color: theme.colors.dark,
  },

  submission: {
    width: "100%",
    padding: 12,
    background: theme.colors.gray[2],
    borderRadius: 4,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));
