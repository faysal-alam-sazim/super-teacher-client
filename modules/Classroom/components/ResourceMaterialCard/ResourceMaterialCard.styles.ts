import { createStyles } from "@mantine/core";

export const useResourceCardStyles = createStyles((theme) => ({
  card: {
    background: theme.colors.gray[0],
    color: theme.colors.dark,
    padding: 16,
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },

  icon: {
    background: theme.colors.gray[3],
    padding: 6,
    width: 24,
    height: 24,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  },

  downloadButton: {
    background: theme.colors.dark[8],
    "&:hover": {
      background: theme.colors.dark[4],
    },
  },
}));
