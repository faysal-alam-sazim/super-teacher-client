import { createStyles } from "@mantine/core";

export const useResourcesStyles = createStyles((theme) => ({
  heading: {
    marginTop: 20,
    borderBottom: "1px solid",
    paddingBottom: 12,
    borderBottomColor: theme.colors.gray[6],
  },

  icon: {
    cursor: "pointer",
  },

  cardsContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: 12,
    marginTop: 12,
    marginBottom: 24,
  },
}));
