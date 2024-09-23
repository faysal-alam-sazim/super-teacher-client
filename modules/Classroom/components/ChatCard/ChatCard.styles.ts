import { createStyles } from "@mantine/core";

export const useChatStyles = createStyles((theme) => ({
  card: {
    padding: "12px",
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.sm,
    border: `1px solid ${theme.colors.gray[3]}`,
    marginTop: theme.spacing.lg,
  },
  time: {
    color: theme.colors.gray[6],
  },
}));
