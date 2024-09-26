import { createStyles } from "@mantine/core";
import dayjs from "dayjs";

export const useAssignmentCardStyles = createStyles((theme, dueDate: Date) => {
  const dueDateObject = dayjs(dueDate);
  const isPastDueDate = dueDateObject.isBefore(dayjs());

  return {
    card: {
      background: theme.colors.gray[0],
      color: theme.colors.dark,
      padding: 16,
      borderRadius: 8,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100%",
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

    cardEnd: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      marginTop: "auto",
    },

    downloadButton: {
      background: theme.colors.dark[8],
      "&:hover": {
        background: theme.colors.dark[4],
      },
    },

    dateText: {
      color: isPastDueDate ? theme.colors.red[9] : theme.colors.dark,
      marginTop: theme.spacing.xs,
    },
  };
});
